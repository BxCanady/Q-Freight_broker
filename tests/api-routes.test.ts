import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Route handler tests for missing/invalid payloads.
 *
 * The Resend SDK is mocked so no network calls happen; process.env
 * is left unconfigured so the 503 path is exercised, and configured
 * for the validation-passes path.
 */

process.env.RESEND_API_KEY = "test-key";
process.env.RESEND_TO_EMAIL = "ops@example.com";

vi.mock("resend", () => {
  const send = vi
    .fn()
    .mockResolvedValue({ data: { id: "test-id" }, error: null });
  return {
    Resend: class MockResend {
      emails = { send };
    },
  };
});

import { POST as contactPOST } from "@/app/api/send-contact/route";
import { POST as inquiryPOST } from "@/app/api/send-inquiry/route";

function jsonRequest(payload: unknown): Request {
  return new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

beforeEach(() => {
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_TO_EMAIL = "ops@example.com";
});

describe("send-contact route", () => {
  it("returns 400 for an empty body object", async () => {
    const res = await contactPOST(jsonRequest({}));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid/i);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await contactPOST(jsonRequest({ name: "Jane" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid email", async () => {
    const res = await contactPOST(
      jsonRequest({ name: "Jane", email: "bad", message: "Hi" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for a malformed JSON body", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{oops",
    });
    const res = await contactPOST(request);
    expect(res.status).toBe(400);
  });

  it("returns 400 for a non-object body", async () => {
    const res = await contactPOST(jsonRequest("just a string"));
    expect(res.status).toBe(400);
  });

  it("returns 503 when email delivery is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_TO_EMAIL;

    const res = await contactPOST(
      jsonRequest({ name: "Jane", email: "jane@example.com", message: "Hi" }),
    );
    expect(res.status).toBe(503);
  });

  it("sends the email for a valid payload", async () => {
    const res = await contactPOST(
      jsonRequest({ name: "Jane", email: "jane@example.com", message: "Hi" }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

describe("send-inquiry route", () => {
  const valid = {
    name: "Jane",
    email: "jane@example.com",
    serviceCode: "FTL",
  };

  it("returns 400 for an empty body object", async () => {
    const res = await inquiryPOST(jsonRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 when serviceCode is missing", async () => {
    const res = await inquiryPOST(
      jsonRequest({ name: "Jane", email: "jane@example.com" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid email", async () => {
    const res = await inquiryPOST(
      jsonRequest({ ...valid, email: "not-an-email" }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for a malformed JSON body", async () => {
    const request = new Request("http://localhost/api/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "not json at all",
    });
    const res = await inquiryPOST(request);
    expect(res.status).toBe(400);
  });

  it("returns 400 for a non-object body", async () => {
    const res = await inquiryPOST(jsonRequest(12345));
    expect(res.status).toBe(400);
  });

  it("returns 503 when email delivery is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_TO_EMAIL;

    const res = await inquiryPOST(jsonRequest(valid));
    expect(res.status).toBe(503);
  });

  it("sends the email for a valid payload", async () => {
    const res = await inquiryPOST(jsonRequest(valid));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
