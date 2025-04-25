import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transport Ticket",
  description: "Transport-ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
