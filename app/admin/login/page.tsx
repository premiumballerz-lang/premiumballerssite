"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = "/admin/registrations";
    setLoading(false);
  }

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 420, margin: "0 auto" }}>
      <h1>Admin Login</h1>
      <div style={{ display: "grid", gap: 12 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 12 }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 12 }} />
        <button onClick={login} disabled={loading} style={{ background: "#39FF14", color: "black", padding: 12, borderRadius: 12, fontWeight: 900, border: "none", cursor: "pointer" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ opacity: 0.75, fontSize: 13 }}>Use your Supabase Auth user for: PremiumBallerz@gmail.com</p>
      </div>
    </main>
  );
}
