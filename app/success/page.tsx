export default function Success({ searchParams }: { searchParams?: { paid?: string } }) {
  const paid = searchParams?.paid === "1";
  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>{paid ? "Payment Complete." : "You're Registered."}</h1>
      <p>
        {paid
          ? "You are all set. A confirmation email will be sent shortly."
          : "Your Premium Ballers tryout registration is saved. If you haven't paid yet, please complete payment."}
      </p>
      <a href="/tryouts" style={{ display: "inline-block", marginTop: 12, background: "#39FF14", color: "black", padding: "10px 14px", borderRadius: 12, fontWeight: 900, textDecoration: "none" }}>
        Back to Tryout Info
      </a>
    </main>
  );
}
