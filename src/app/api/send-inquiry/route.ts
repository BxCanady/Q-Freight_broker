import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const notes = body.notes?.trim();
    const serviceCode = body.serviceCode;
    const serviceTitle = body.serviceTitle;

    if (!name || !email || !serviceCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.RESEND_TO_EMAIL;

    if (!apiKey || !recipient) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured. Add RESEND_API_KEY and RESEND_TO_EMAIL to .env.local, then restart the dev server.",
        },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rcs3pl.com";
    const logoUrl = `${siteUrl.replace(/\/$/, "")}/logo1.1.png`;

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "RCS Freight System <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email,
      subject: `⚡ New Inquiry [RCS]: ${serviceTitle} (${serviceCode})`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New RCS Freight Inquiry</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 30px 10px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                    
                    <!-- Header Bar -->
                    <tr>
                      <td style="background-color: #ea580c; padding: 24px 30px; text-align: left;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="vertical-align: middle;">
                              <img src="${logoUrl}" alt="Raheem Cargo Solutions LLC (RCS)" width="64" height="64" style="display: block; width: 64px; height: 64px; object-fit: contain; border-radius: 50%; background-color: #ffffff; border: 2px solid #ffedd5;" />
                            </td>
                            <td style="vertical-align: middle; padding-left: 16px;">
                              <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #ffedd5; display: block; margin-bottom: 2px;">
                                Raheem Cargo Solutions LLC (RCS)
                              </span>
                              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">
                                Dispatcher Request
                              </h1>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Service Badge Banner -->
                    <tr>
                      <td style="padding: 24px 30px 10px 30px;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 16px;">
                          <tr>
                            <td>
                              <span style="display: inline-block; background-color: rgba(234, 88, 12, 0.2); color: #fb923c; border: 1px solid rgba(234, 88, 12, 0.4); font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.1em;">
                                ${serviceCode}
                              </span>
                              <h2 style="margin: 8px 0 0 0; font-size: 18px; font-weight: 700; color: #ffffff;">${serviceTitle}</h2>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Customer Information Details -->
                    <tr>
                      <td style="padding: 10px 30px 20px 30px;">
                        <h3 style="margin: 16px 0 12px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          Contact Information
                        </h3>
                        
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;">
                          <tr>
                            <td style="padding: 6px 0; color: #94a3b8; width: 110px; font-weight: 600;">Name:</td>
                            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Email:</td>
                            <td style="padding: 6px 0;">
                              <a href="mailto:${email}" style="color: #fb923c; text-decoration: none; font-weight: 600;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Phone:</td>
                            <td style="padding: 6px 0;">
                              <a href="tel:${phone}" style="color: #fb923c; text-decoration: none; font-weight: 600;">${phone || "Not Provided"}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Route & Cargo Notes -->
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          Route & Cargo Specifications
                        </h3>
                        <div style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 16px; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-line;">
                          ${notes || "No additional cargo or route details provided."}
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
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
      `,
    });

    if (error) {
      console.error("Resend inquiry error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Internal API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
