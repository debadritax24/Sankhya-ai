import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { UserProvider } from "@/components/providers/user-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SANKHYA AI — Skill Intelligence Platform",
    template: "%s | SANKHYA AI",
  },
  description:
    "AI-enabled Skill Intelligence and Learning Platform for India's Official Statistical System. A prototype for SIH 2026.",
  keywords: [
    "skill intelligence",
    "competency",
    "learning platform",
    "government",
    "India",
    "official statistics",
    "SIH 2026",
  ],
  authors: [{ name: "SANKHYA AI Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SANKHYA AI",
    title: "SANKHYA AI — Skill Intelligence Platform",
    description:
      "AI-enabled Skill Intelligence and Learning Platform for India's Official Statistical System.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
          <body className="min-h-screen bg-background text-foreground antialiased">
            <a href="#main-content" className="skip-to-main">
              Skip to main content
            </a>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}
