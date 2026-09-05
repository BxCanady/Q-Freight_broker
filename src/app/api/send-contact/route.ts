import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildEmailHtml,
  contactSchema,
  escapeHtml,
  MAILER_FROM_FALLBACK,
  MAILER_NOT_CONFIGURED_MESSAGE,
  parseJsonBody,
  resolveMailerConfig,
} from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const parsed = await parseJsonBody(request, contactSchema);

    if (!parsed.ok) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 },
      );
    }

    const { name, email, message } = parsed.data;

    const mailerConfig = resolveMailerConfig();

    if (!mailerConfig) {
      return NextResponse.json(
        { error: MAILER_NOT_CONFIGURED_MESSAGE },
        { status: 503 },
      );
    }

    const resend = new Resend(mailerConfig.apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? MAILER_FROM_FALLBACK,
      to: [mailerConfig.recipient],
      replyTo: safeEmail,
      subject: `New General Inquiry [RCS] from ${name}`,
      html: buildEmailHtml({
        title: "New RCS General Inquiry",
        headerHtml: `
                    <tr>
                      <td style="background-color: #ea580c; padding: 24px 30px;">
                        <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #ffedd5; display: block; margin-bottom: 2px;">
                          Raheem Cargo Solutions LLC (RCS)
                        </span>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">
                          General Inquiry / Comment
                        </h1>
                      </td>
                    </tr>`,
        contentHtml: `
                    <tr>
                      <td style="padding: 24px 30px 10px 30px;">
                        <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          Contact Information
                        </h3>
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;">
                          <tr>
                            <td style="padding: 6px 0; color: #94a3b8; width: 110px; font-weight: 600;">Name:</td>
                            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${safeName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Email:</td>
                            <td style="padding: 6px 0;">
                              <a href="mailto:${safeEmail}" style="color: #fb923c; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <h3 style="margin: 16px 0 12px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          Message
                        </h3>
                        <div style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 16px; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-line;">
                          ${safeMessage}
                        </div>
                      </td>
                    </tr>`,
      }),
    });

    if (error) {
      console.error("Resend contact error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    console.error("Internal API error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
