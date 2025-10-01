import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/pricing";
import { z } from "zod";

const CheckoutSchema = z.object({
  priceId: z.string(),
  customerEmail: z.string().email().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, customerEmail } = CheckoutSchema.parse(body);

    const origin = request.headers.get("origin") || "https://anchormarianas.com";

    const { url } = await createCheckoutSession({
      priceId,
      customerEmail,
      successUrl: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/services`
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}