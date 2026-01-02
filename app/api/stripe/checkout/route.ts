import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" as any });

export async function POST(req: Request) {
  const body = await req.json();
  const { registration_id } = body;

  if (!registration_id) return NextResponse.json({ error: "Missing registration_id" }, { status: 400 });

  const { data: reg, error } = await supabaseAdmin
    .from("registrations")
    .select("id, guardian_email, player_first_name, player_last_name, payment_status")
    .eq("id", registration_id)
    .single();

  if (error || !reg) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

  if (reg.payment_status === "paid") {
    return NextResponse.json({ error: "Already paid" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: reg.guardian_email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 1000,
          product_data: { name: "Premium Ballers Tryout Fee (Ages 6–17)" },
        },
        quantity: 1,
      },
    ],
    metadata: { registration_id: reg.id },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/registration?canceled=1`,
  });

  return NextResponse.json({ url: session.url });
}
