import { Resend } from "resend";
import { QuotePayload } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY || "mock-key");

export async function sendQuoteEmail(quote: QuotePayload) {
  const { name, email, company, site, goal, timeline, budget, package: pkg, link } = quote;

  const subject = `New ${pkg} quote request from ${name}`;

  const html = `
    <h2>New Quote Request</h2>
    <p><strong>Package:</strong> ${pkg}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
    ${site ? `<p><strong>Site:</strong> <a href="${site}">${site}</a></p>` : ""}
    <p><strong>Timeline:</strong> ${timeline}</p>
    <p><strong>Budget:</strong> ${budget}</p>
    ${link ? `<p><strong>Reference:</strong> <a href="${link}">${link}</a></p>` : ""}

    <h3>Project Goal</h3>
    <p>${goal}</p>

    <hr>
    <p><small>Sent from anchormarianas.com quote form</small></p>
  `;

  try {
    const { data } = await resend.emails.send({
      from: "quotes@anchormarianas.com",
      to: [process.env.SITE_EMAIL!],
      subject,
      html,
      replyTo: email
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send quote email:", error);
    throw error;
  }
}