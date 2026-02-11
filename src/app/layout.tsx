import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netlink Healthcare — Connected Ecosystem Intelligence",
  description:
    "Netlink delivers enterprise healthcare technology — embedding AI into the framework so it can sense, learn, and respond as one connected ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
