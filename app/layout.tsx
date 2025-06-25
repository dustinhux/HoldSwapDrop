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
    images: [
      {
        url: "/og-image.png", // Place this image in the public/ folder
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
    images: ["/og-image.png"],
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
