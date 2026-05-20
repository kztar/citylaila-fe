import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tour and Attractions Booking make easy - CityLaila",
  description:
    "We Cover, You Discover. Book tickets for top attractions in Dubai, Abu Dhabi & worldwide. Instant confirmation, best price guarantee.",
  keywords: "Dubai attractions, Abu Dhabi tickets, theme parks UAE, things to do in Dubai",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}