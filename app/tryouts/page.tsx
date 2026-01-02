import { supabase } from "../../lib/supabaseClient";

export default async function Tryouts() {
  const { data: events } = await supabase
    .from("tryout_events")
    .select("*")
    .eq("is_active", true)
    .order("event_date", { ascending: true });

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>February Tryouts</h1>
      <p><strong>Ages:</strong> 6–17</p>
      <p><strong>Tryout Fee:</strong> $10</p>
      <p><strong>Location:</strong> TBA</p>

      <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
        {(events ?? []).map((e: any) => (
          <div key={e.id} style={{ padding: 18, border: "1px solid #e6e6e6", borderRadius: 16 }}>
            <h3 style={{ marginTop: 0 }}>{e.title}</h3>
            <p style={{ margin: "6px 0" }}>
              <strong>Date:</strong> {e.event_date} <br />
              <strong>Time:</strong> {String(e.start_time).slice(0,5)} – {String(e.end_time).slice(0,5)} <br />
              <strong>Location:</strong> {e.location_name} ({e.location_address})
            </p>
            <a href="/registration" style={{ display: "inline-block", background: "#39FF14", color: "black", padding: "10px 14px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>
              Register
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
