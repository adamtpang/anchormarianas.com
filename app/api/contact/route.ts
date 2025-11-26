import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json()

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      )
    }

    console.log('New lead received:')
    console.log('Email:', email)
    console.log('Message:', message)
    console.log('Timestamp:', new Date().toISOString())

    // Send email via Resend
    try {
      await resend.emails.send({
        from: 'AnchorMarianas <onboarding@resend.dev>', // Change this once you verify your domain
        to: ['adamtpang@gmail.com'],
        replyTo: email,
        subject: `New Lead from ${email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Lead from anchormarianas.com</h2>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${email}</p>
              <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #6b7280; font-size: 14px;">
              Reply directly to this email to respond to ${email}
            </p>
          </div>
        `
      })

      console.log('✓ Email sent successfully')
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the request if email fails - still log it
    }

    return NextResponse.json({
      success: true,
      message: 'Message received successfully'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
