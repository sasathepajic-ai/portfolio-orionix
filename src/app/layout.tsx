import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata, generateJsonLd } from "@/lib/seo";
import "./globals.css";

/* Google Fonts is unreachable from this network at build time (TLS
   interception), so both families are self-hosted static TTFs in
   src/app/fonts/ — the same files opengraph-image.tsx reads for satori. */

// Besley — a Clarendon: the sturdy hardware-store slab. Headlines (500),
// body (400), italic for quotes/queries.
const besley = localFont({
  variable: "--font-besley",
  display: "swap",
  src: [
    { path: "./fonts/besley-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/besley-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/besley-italic-400.ttf", weight: "400", style: "italic" },
  ],
});

// Familjen Grotesk — the functional layer: labels, buttons, nav, forms.
const familjen = localFont({
  variable: "--font-familjen",
  display: "swap",
  src: [
    { path: "./fonts/familjen-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/familjen-700.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLd();

  return (
    <html lang="en" className={`${besley.variable} ${familjen.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* No-JS safety: scroll-reveal must never leave content hidden. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
