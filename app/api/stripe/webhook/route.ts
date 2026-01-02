import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" as any });

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const registration_id = session.metadata?.registration_id;
    const payment_intent = session.payment_intent?.toString();

    if (registration_id) {
      await supabaseAdmin
        .from("registrations")
        .update({
          payment_status: "paid",
          stripe_payment_intent_id: payment_intent ?? null,
          paid_at: new Date().toISOString(),
        })
        .eq("id", registration_id);

      // Send confirmation email (best-effort)
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registration_id }),
        });
      } catch {}
    }
  }

  return NextResponse.json({ received: true });
}
