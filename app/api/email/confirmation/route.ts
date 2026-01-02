import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { registration_id } = await req.json();
  if (!registration_id) return NextResponse.json({ error: "Missing registration_id" }, { status: 400 });

  const { data: reg, error } = await supabaseAdmin
    .from("registrations")
    .select(`
      id, confirmation_sent, guardian_email, guardian_name,
      player_first_name, player_last_name, grade, gender,
      tryout_events ( title, event_date, start_time, end_time, location_name, location_address ),
      payment_status
    `)
    .eq("id", registration_id)
    .single();

  if (error || !reg) return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  if ((reg as any).confirmation_sent) return NextResponse.json({ ok: true, skipped: true });

  const ev = (reg as any).tryout_events;

  const subject = "Premium Ballers Tryout Registration Confirmed";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.4">
      <h2>You're registered.</h2>
      <p>Hi ${(reg as any).guardian_name || "there"},</p>
      <p><strong>Ages:</strong> 6–17</p>
      <p><strong>Player:</strong> ${(reg as any).player_first_name} ${(reg as any).player_last_name} (${(reg as any).gender}, ${(reg as any).grade})</p>
      <p><strong>Tryout:</strong> ${ev?.title || "Premium Ballers February Tryouts"}</p>
      <p><strong>Date:</strong> ${ev?.event_date || "February (TBA)"}</p>
      <p><strong>Time:</strong> ${ev?.start_time?.slice(0,5) || "TBA"} - ${ev?.end_time?.slice(0,5) || "TBA"}</p>
      <p><strong>Location:</strong> ${ev?.location_name || "TBA"} ${ev?.location_address ? `(${ev.location_address})` : ""}</p>
      <p><strong>Payment:</strong> ${(reg as any).payment_status}</p>
      <hr />
      <p><strong>What to bring:</strong> basketball shoes, water, and arrive 15 minutes early.</p>
      <p>See you in the gym,<br/>Premium Ballers</p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: (reg as any).guardian_email,
    bcc: process.env.ADMIN_EMAIL!,
    subject,
    html,
  });

  await supabaseAdmin.from("registrations").update({ confirmation_sent: true }).eq("id", registration_id);

  return NextResponse.json({ ok: true });
}
