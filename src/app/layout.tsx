import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import FreightReputation from "@/components/FreightReputation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rcs3pl.com"),
  title: {
    default: "Raheem Cargo Solutions LLC | Freight Brokerage & Logistics",
    template: "%s | RCS Logistics",
  },
  description:
    "Raheem Cargo Solutions LLC is an asset-backed freight brokerage serving shippers and carriers with specialized logistics, reefer, flatbed, power-only, and liquid bulk transportation.",
  keywords: [
    "freight brokerage",
    "asset-backed logistics",
    "freight transportation",
    "reefer services",
    "flatbed heavy haul",
    "power-only solutions",
    "liquid bulk logistics",
    "Mobile Alabama freight broker",
    "Shreveport Louisiana logistics",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rcs3pl.com",
    siteName: "Raheem Cargo Solutions LLC",
    title: "Raheem Cargo Solutions LLC | Freight Brokerage & Logistics",
    description:
      "Asset-backed freight brokerage and specialized logistics serving shippers and carriers across regional and complex freight lanes.",
    images: [
      {
        url: "/home_bg.jfif",
        alt: "Raheem Cargo Solutions freight logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raheem Cargo Solutions LLC | Freight Brokerage & Logistics",
    description:
      "Asset-backed freight brokerage and specialized logistics for dependable transportation capacity.",
    images: ["/logo1.1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo1.1.png",
    shortcut: "/logo1.1.png",
    apple: "/logo1.1.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <footer>
          <FreightReputation />
        </footer>
      </body>
    </html>
  );
}
