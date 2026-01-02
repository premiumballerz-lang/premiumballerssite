"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type TryoutEvent = {
  id: string;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  fee_cents: number;
};

export default function Registration() {
  const [events, setEvents] = useState<TryoutEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tryout_event_id: "",
    player_first_name: "",
    player_last_name: "",
    grade: "",
    gender: "",
    school: "",
    city: "",
    guardian_name: "",
    guardian_phone: "",
    guardian_email: "",
    waiver_participation: false,
    waiver_photo_video: false,
    code_of_conduct: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("tryout_events")
        .select("id,title,event_date,start_time,end_time,fee_cents")
        .eq("is_active", true)
        .order("event_date", { ascending: true });

      const evs = (data ?? []) as TryoutEvent[];
      setEvents(evs);
      if (evs[0]?.id) setForm((f) => ({ ...f, tryout_event_id: evs[0].id }));
    })();
  }, []);

  async function submit() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("registrations")
        .insert([{
          ...form,
          season: "2026 February Tryouts",
          payment_status: "unpaid",
        }])
        .select("id")
        .single();

      if (error) throw error;
      window.location.href = `/pay?rid=${data.id}`;
    } catch (e: any) {
      alert(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function setField(key: string, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Tryout Registration</h1>
      <p>For <strong>Ages 6–17</strong>. Fee: <strong>$10</strong>.</p>

      <div style={{ display: "grid", gap: 12, border: "1px solid #e6e6e6", borderRadius: 16, padding: 18 }}>
        <label>
          Tryout Session
          <select value={form.tryout_event_id} onChange={(e) => setField("tryout_event_id", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }}>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title} — {ev.event_date} ({String(ev.start_time).slice(0,5)}-{String(ev.end_time).slice(0,5)})
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>Player First Name
            <input value={form.player_first_name} onChange={(e) => setField("player_first_name", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
          <label>Player Last Name
            <input value={form.player_last_name} onChange={(e) => setField("player_last_name", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>Grade
            <input value={form.grade} onChange={(e) => setField("grade", e.target.value)} placeholder="e.g., 7th" style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
          <label>Gender
            <select value={form.gender} onChange={(e) => setField("gender", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }}>
              <option value="">Select</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>School
            <input value={form.school} onChange={(e) => setField("school", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
          <label>City/Town
            <input value={form.city} onChange={(e) => setField("city", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
        </div>

        <label>Parent/Guardian Name
          <input value={form.guardian_name} onChange={(e) => setField("guardian_name", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>Guardian Phone
            <input value={form.guardian_phone} onChange={(e) => setField("guardian_phone", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
          <label>Guardian Email
            <input value={form.guardian_email} onChange={(e) => setField("guardian_email", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
          </label>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <label><input type="checkbox" checked={form.waiver_participation} onChange={(e) => setField("waiver_participation", e.target.checked)} /> Participation waiver (required)</label>
          <label><input type="checkbox" checked={form.code_of_conduct} onChange={(e) => setField("code_of_conduct", e.target.checked)} /> Code of conduct (required)</label>
          <label><input type="checkbox" checked={form.waiver_photo_video} onChange={(e) => setField("waiver_photo_video", e.target.checked)} /> Photo/Video release (optional)</label>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{ background: "#39FF14", color: "black", padding: 12, borderRadius: 12, fontWeight: 900, border: "none", cursor: "pointer" }}
        >
          {loading ? "Submitting..." : "Submit & Continue to Payment"}
        </button>
      </div>
    </main>
  );
}
