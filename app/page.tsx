export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, background: "#39FF14", borderRadius: 10 }} />
          <strong style={{ fontSize: 18 }}>Premium Ballers</strong>
        </div>
        <nav style={{ display: "flex", gap: 14 }}>
          <a href="/february-tryouts">February Tryouts</a>
          <a href="/tryouts">Sessions</a>
          <a href="/registration">Register</a>
          <a href="/admin/login">Admin</a>
        </nav>
      </header>

      <section style={{ marginTop: 40, padding: 28, borderRadius: 16, background: "#0b0b0b", color: "white" }}>
        <h1 style={{ fontSize: 44, margin: 0 }}>Premium Ballers Tryouts</h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 720 }}>
          February tryouts are live for <strong>Ages 6–17</strong>. Tryout fee: <strong>$10</strong>. Secure your spot and pull up ready to work.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
          <a href="/registration" style={{ background: "#39FF14", color: "black", padding: "12px 18px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>
            Register Now
          </a>
          <a href="/tryouts" style={{ border: "1px solid #39FF14", color: "#39FF14", padding: "12px 18px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>
            View Sessions
          </a>
        </div>
      </section>

      <section style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {[
          { title: "Ages 6–17", text: "Youth development and competitive pathways." },
          { title: "$10 Tryout Fee", text: "Pay online with Stripe or at check-in if needed." },
          { title: "Gym Location", text: "TBA — posted on the website once confirmed." },
          { title: "Admin Dashboard", text: "Secure list, filters, and CSV export." },
        ].map((c) => (
          <div key={c.title} style={{ padding: 18, border: "1px solid #e6e6e6", borderRadius: 16 }}>
            <h3 style={{ marginTop: 0 }}>{c.title}</h3>
            <p style={{ marginBottom: 0 }}>{c.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
