import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ListingAI - AI Product Listing Generator for eBay, Amazon, Etsy",
  description: "Generate optimized product listings in seconds. AI-powered titles, descriptions, and keywords for eBay, Amazon, Etsy, Poshmark, and more.",
  keywords: ["listing generator", "eBay listing", "Amazon listing", "AI copywriter", "product description generator", "e-commerce"],
  openGraph: {
    title: "ListingAI - AI Product Listing Generator",
    description: "Generate optimized product listings in seconds with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
