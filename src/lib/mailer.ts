/**
 * Shared helpers for the Resend-powered email routes
 * (send-contact and send-inquiry).
 */

import { z } from "zod";

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Fields shared by both inquiry and contact forms. */
const baseFields = {
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().max(255).email(),
};

export const contactSchema = z
  .object({
    ...baseFields,
    message: z.string().trim().min(1).max(5000),
  })
  .strict();

export const inquirySchema = z
  .object({
    ...baseFields,
    phone: z.string().trim().max(30).optional().default(""),
    notes: z.string().trim().max(5000).optional().default(""),
    serviceCode: z.string().trim().min(1).max(100),
    serviceTitle: z.string().trim().max(200).optional().default(""),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;

/** Parses and validates a JSON request body against a schema. */
export async function parseJsonBody<S extends z.ZodTypeAny>(
  request: Request,
  schema: S,
): Promise<{ ok: true; data: z.infer<S> } | { ok: false }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { ok: false };
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    console.error(
      "[mailer] body validation failed:",
      JSON.stringify(result.error.issues),
    );
    return { ok: false };
  }
  return { ok: true, data: result.data };
}

export interface MailerConfig {
  apiKey: string;
  recipient: string;
}

/** Returns the Resend config, or null when the env vars are missing. */
export function resolveMailerConfig(): MailerConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !recipient) return null;
  return { apiKey, recipient };
}

export const MAILER_NOT_CONFIGURED_MESSAGE =
  "Email delivery is not configured. Add RESEND_API_KEY and RESEND_TO_EMAIL to .env.local, then restart the dev server.";

export const MAILER_FROM_FALLBACK =
  "RCS Freight System <onboarding@resend.dev>";

interface EmailShellOptions {
  /** <title> in the document head. */
  title: string;
  /** Markup for the orange header bar of the card. */
  headerHtml: string;
  /** Markup for the body sections inside the card. */
  contentHtml: string;
}

/** Shared outer HTML shell (page background + centered card + footer). */
export function buildEmailHtml({
  title,
  headerHtml,
  contentHtml,
}: EmailShellOptions): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 30px 10px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                ${headerHtml}
                ${contentHtml}
                <tr>
                  <td style="background-color: #0f172a; padding: 20px 30px; text-align: center; border-top: 1px solid #334155;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #cbd5e1;">
                      Raheem Cargo Solutions LLC (RCS)
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #64748b;">
                      Automated System Notification • <a href="https://rcs3pl.com" style="color: #64748b; text-decoration: underline;">rcs3pl.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
