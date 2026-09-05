import { describe, expect, it } from "vitest";
import type { z } from "zod";
import { contactSchema, inquirySchema, parseJsonBody } from "@/lib/mailer";

function omit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const clone = { ...obj };
  delete clone[key];
  return clone;
}

/**
 * Drives parseJsonBody against a fake Request, mirroring how the
 * Next.js route handlers call it.
 */
async function parse<S extends z.ZodTypeAny>(schema: S, payload: unknown) {
  const request = new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
  return parseJsonBody(request, schema);
}

describe("parseJsonBody", () => {
  it("rejects a malformed JSON body", async () => {
    const result = await parse(contactSchema, "{not json");
    expect(result.ok).toBe(false);
  });

  it("rejects a non-object body", async () => {
    expect((await parse(contactSchema, ["array"])).ok).toBe(false);
    expect((await parse(contactSchema, "string")).ok).toBe(false);
    expect((await parse(contactSchema, 42)).ok).toBe(false);
  });
});

describe("contactSchema (field slicing limits)", () => {
  const valid = { name: "Jane", email: "jane@example.com", message: "Hello" };

  it("accepts a valid contact payload", async () => {
    const result = await parse(contactSchema, valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual(valid);
    }
  });

  it("rejects each missing required field", async () => {
    for (const key of ["name", "email", "message"] as const) {
      expect((await parse(contactSchema, omit(valid, key))).ok).toBe(false);
    }
  });

  it("rejects name over 100 characters", async () => {
    const result = await parse(contactSchema, {
      ...valid,
      name: "x".repeat(101),
    });
    expect(result.ok).toBe(false);
  });

  it("accepts name at exactly 100 characters", async () => {
    const result = await parse(contactSchema, {
      ...valid,
      name: "x".repeat(100),
    });
    expect(result.ok).toBe(true);
  });

  it("rejects an invalid email", async () => {
    for (const email of ["not-an-email", "a@b", "@example.com", "a b@c.com"]) {
      expect((await parse(contactSchema, { ...valid, email })).ok).toBe(false);
    }
  });

  it("lowercases the email", async () => {
    const result = await parse(contactSchema, {
      ...valid,
      email: "Jane@Example.COM",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.email).toBe("jane@example.com");
  });

  it("rejects message over 5000 characters", async () => {
    const result = await parse(contactSchema, {
      ...valid,
      message: "x".repeat(5001),
    });
    expect(result.ok).toBe(false);
  });

  it("rejects unknown extra fields (strict schema)", async () => {
    const result = await parse(contactSchema, { ...valid, injected: "<x>" });
    expect(result.ok).toBe(false);
  });
});

describe("inquirySchema", () => {
  const valid = {
    name: "Jane",
    email: "jane@example.com",
    serviceCode: "FTL",
  };

  it("accepts a minimal inquiry payload", async () => {
    const result = await parse(inquirySchema, valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      // Optional fields default to empty strings.
      expect(result.data.phone).toBe("");
      expect(result.data.notes).toBe("");
      expect(result.data.serviceTitle).toBe("");
    }
  });

  it("accepts a full inquiry payload", async () => {
    const result = await parse(inquirySchema, {
      ...valid,
      phone: "+1 555 0100",
      notes: "Two pallets",
      serviceTitle: "Full Truckload",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects missing serviceCode", async () => {
    expect((await parse(inquirySchema, omit(valid, "serviceCode"))).ok).toBe(
      false,
    );
  });

  it("rejects phone over 30 characters", async () => {
    const result = await parse(inquirySchema, {
      ...valid,
      phone: "1".repeat(31),
    });
    expect(result.ok).toBe(false);
  });

  it("rejects notes over 5000 characters", async () => {
    const result = await parse(inquirySchema, {
      ...valid,
      notes: "x".repeat(5001),
    });
    expect(result.ok).toBe(false);
  });

  it("rejects a non-string serviceCode (previously untyped)", async () => {
    const result = await parse(inquirySchema, {
      ...valid,
      serviceCode: { malicious: true },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects an invalid email", async () => {
    expect((await parse(inquirySchema, { ...valid, email: "nope" })).ok).toBe(
      false,
    );
  });
});
