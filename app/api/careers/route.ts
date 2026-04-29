import { NextResponse } from "next/server"
import { Resend } from "resend"

type CareersPayload = {
  name?: string
  email?: string
  role?: string
  links?: string
  message?: string
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = (await request.json()) as CareersPayload
    const { name, email, role, links, message } = body

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      )
    }

    const safeName = name?.trim() || "(no name)"
    const safeRole = role?.trim() || "(no role)"
    const safeLinks = links?.trim() || "(none)"
    const subject = `Come aboard: ${safeName} (${safeRole})`

    try {
      await resend.emails.send({
        from: "Anchor <onboarding@resend.dev>",
        to: ["adamtpang@gmail.com"],
        replyTo: email,
        subject,
        html: `
          <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #0a1f44;">
            <h2 style="margin: 0 0 16px 0;">Come aboard: new express-interest submission</h2>
            <table cellspacing="0" cellpadding="0" style="width: 100%; background: #f7f5ef; border-radius: 8px; padding: 16px; margin: 0 0 20px 0;">
              <tr><td style="padding: 6px 0;"><strong>Name:</strong></td><td style="padding: 6px 0;">${safeName}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Email:</strong></td><td style="padding: 6px 0;">${email}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Role / Skills:</strong></td><td style="padding: 6px 0;">${safeRole}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Links:</strong></td><td style="padding: 6px 0;">${safeLinks}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Submitted:</strong></td><td style="padding: 6px 0;">${new Date().toLocaleString()}</td></tr>
            </table>
            <h3 style="margin: 0 0 8px 0;">Their pitch</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; padding: 12px 16px; background: #f7f5ef; border-radius: 8px;">${message}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #6b7280; font-size: 13px;">Reply directly to this email to respond.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send careers email:", emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Careers form error:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
