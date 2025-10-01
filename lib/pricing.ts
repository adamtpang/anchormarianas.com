import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2025-08-27.basil"
});

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  customerEmail
}: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe checkout error:", error);
    throw new Error("Failed to create checkout session");
  }
}

export async function createInvoice({
  customerEmail,
  amount,
  description,
  dueDate
}: {
  customerEmail: string;
  amount: number;
  description: string;
  dueDate?: Date;
}) {
  try {
    // Create customer first
    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: dueDate ? Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 30,
    });

    // Add invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount: amount * 100, // Convert to cents
      currency: "usd",
      description,
    });

    // Finalize and send
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id!);
    await stripe.invoices.sendInvoice(invoice.id!);

    return finalizedInvoice;
  } catch (error) {
    console.error("Stripe invoice error:", error);
    throw new Error("Failed to create invoice");
  }
}