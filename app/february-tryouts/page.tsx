import Link from "next/link";

export default function FebruaryTryoutsFlyer() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <section style={{ background: "#0b0b0b", color: "white", padding: 28, borderRadius: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 52, height: 52, background: "#39FF14", borderRadius: 12 }} />
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>Premium Ballers</div>
            <div style={{ opacity: 0.9 }}>February Tryouts • Ages 6–17</div>
          </div>
        </div>

        <h1 style={{ fontSize: 48, margin: "18px 0 6px" }}>Tryouts are live.</h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 760 }}>
          Come compete. Come get better. Come earn it. Registration is required.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
          <Link href="/registration" style={{ background: "#39FF14", color: "black", padding: "12px 18px", borderRadius: 12, fontWeight: 900, textDecoration: "none" }}>
            Register Now
          </Link>
          <Link href="/tryouts" style={{ border: "1px solid #39FF14", color: "#39FF14", padding: "12px 18px", borderRadius: 12, fontWeight: 900, textDecoration: "none" }}>
            View Sessions
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Ages</h3>
          <p style={{ fontSize: 18, marginBottom: 0 }}><strong>6–17</strong></p>
        </div>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Tryout Fee</h3>
          <p style={{ fontSize: 18, marginBottom: 0 }}><strong>$10</strong></p>
        </div>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Location</h3>
          <p style={{ marginBottom: 0 }}>TBA (posted on the website)</p>
        </div>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 16, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>What to Bring</h3>
          <p style={{ marginBottom: 0 }}>Shoes, water, effort. Arrive 15 minutes early.</p>
        </div>
      </section>
    </main>
  );
}
