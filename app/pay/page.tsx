"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PayPage() {
  const params = useSearchParams();
  const rid = params.get("rid");
  const [loading, setLoading] = useState(false);

  async function pay() {
    if (!rid) return alert("Missing registration id");
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registration_id: rid }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Could not start payment");
  }

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Pay Tryout Fee</h1>
      <p>Tryout fee is <strong>$10</strong>. Complete payment to finalize check-in speed on tryout day.</p>
      <button
        onClick={pay}
        disabled={loading}
        style={{ background: "#39FF14", color: "black", padding: 12, borderRadius: 12, fontWeight: 900, border: "none" }}
      >
        {loading ? "Starting checkout..." : "Pay $10 Now"}
      </button>
      <p style={{ marginTop: 14, opacity: 0.75 }}>Gym location: <strong>TBA</strong> (posted on the website).</p>
    </main>
  );
}
