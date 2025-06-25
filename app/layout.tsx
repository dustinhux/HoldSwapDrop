import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// At the top of your app/page.tsx or app/layout.tsx
export const metadata = {
  title: "HoldSwapDrop - Dynasty Trade Calculator",
  description: "Calculate fair dynasty trades with crowdsourced NFL player values.",
  openGraph: {
    title: "HoldSwapDrop - Dynasty Trade Calculator",
    description: "Calculate fair dynasty trades with crowdsourced NFL player values.",
    url: "https://hold-swap-drop.vercel.app",
    type: "website",
    images: [
      {
        url: "https://hold-swap-drop.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "HoldSwapDrop Trade Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HoldSwapDrop - Dynasty Trade Calculator",
    description: "Make smart dynasty trades with real user input.",
    images: ["https://hold-swap-drop.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
