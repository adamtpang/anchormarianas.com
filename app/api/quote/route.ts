import { NextRequest, NextResponse } from "next/server";
import { QuoteSchema } from "@/lib/schemas";
import { sendQuoteEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the payload
    const validatedData = QuoteSchema.parse(body);

    // Send email
    await sendQuoteEmail(validatedData);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote submission error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit quote" },
      { status: 500 }
    );
  }
}