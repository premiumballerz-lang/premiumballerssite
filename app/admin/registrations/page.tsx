"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

type Registration = {
  id: string;
  created_at: string;
  player_first_name: string;
  player_last_name: string;
  grade: string;
  gender: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_email: string;
  payment_status: string;
  tryout_events?: { title: string };
};

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) window.location.href = "/admin/login";
      await loadRegistrations();
    })();
  }, []);

  async function loadRegistrations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("registrations")
      .select(`*, tryout_events ( title )`)
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setRegistrations((data ?? []) as Registration[]);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return registrations;
    return registrations.filter((r) =>
      `${r.player_first_name} ${r.player_last_name} ${r.grade} ${r.gender} ${r.guardian_name} ${r.guardian_email} ${r.tryout_events?.title ?? ""}`
        .toLowerCase()
        .includes(s)
    );
  }, [q, registrations]);

  async function setPayment(id: string, status: "paid" | "waived" | "unpaid") {
    const { error } = await supabase.from("registrations").update({ payment_status: status }).eq("id", id);
    if (error) alert(error.message);
    else loadRegistrations();
  }

  function exportCSV() {
    const headers = ["First Name","Last Name","Grade","Gender","Guardian","Phone","Email","Payment Status","Tryout"];
    const rows = filtered.map((r) => [
      r.player_first_name,
      r.player_last_name,
      r.grade,
      r.gender,
      r.guardian_name,
      r.guardian_phone,
      r.guardian_email,
      r.payment_status,
      r.tryout_events?.title ?? "",
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? "")}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "premium_ballers_registrations.csv";
    a.click();
  }

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
      <h1>Registrations</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
        <input
          placeholder="Search name, grade, email, tryout..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 10, minWidth: 280 }}
        />
        <button onClick={exportCSV} style={{ background: "#39FF14", color: "black", padding: "10px 14px", borderRadius: 10, fontWeight: 800, border: "none", cursor: "pointer" }}>
          Export CSV
        </button>
        <button onClick={loadRegistrations} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ccc", cursor: "pointer" }}>
          Refresh
        </button>
        <span style={{ opacity: 0.75 }}>{filtered.length} records</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table border={1} cellPadding={10} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th>Player</th>
              <th>Grade</th>
              <th>Guardian</th>
              <th>Contact</th>
              <th>Tryout</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.player_first_name} {r.player_last_name}</td>
                <td>{r.grade} ({r.gender})</td>
                <td>{r.guardian_name}</td>
                <td>{r.guardian_phone}<br />{r.guardian_email}</td>
                <td>{r.tryout_events?.title ?? "—"}</td>
                <td>
                  <div style={{ fontWeight: 700 }}>{r.payment_status}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <button onClick={() => setPayment(r.id, "paid")}>Mark Paid</button>
                    <button onClick={() => setPayment(r.id, "waived")}>Waive</button>
                    <button onClick={() => setPayment(r.id, "unpaid")}>Unpaid</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
