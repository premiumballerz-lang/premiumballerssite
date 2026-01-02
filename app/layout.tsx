export const metadata = {
  title: "Premium Ballers",
  description: "Premium Ballers Basketball Program - Ages 6–17",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
