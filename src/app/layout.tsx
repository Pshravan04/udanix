import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NeuralBackground } from "@/components/ui/neural-background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Udaanix — Guiding the Path to Excellence",
  description: "Connect with 200+ verified counselors. Get clarity on your next big career move. Udaanix is the next-generation platform for students and professionals.",
  keywords: ["counseling", "career guidance", "student platform", "mentorship", "Udaanix"],
  icons: {
    icon: "/favicon.jpg",
  },
};

import { BottomNav } from "@/components/layout/bottom-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative bg-white pb-32 md:pb-0" suppressHydrationWarning>
        <NeuralBackground />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
