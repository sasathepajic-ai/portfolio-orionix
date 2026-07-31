import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata, generateJsonLd } from "@/lib/seo";
import "./globals.css";

/* Google Fonts is unreachable from this network at build time (TLS
   interception), so both families are self-hosted in src/app/fonts/ — as
   WOFF2, not the TTF next/font/local usually gets handed. WOFF2 is the same
   glyph data with real compression built into the format; converting the
   TTFs once with `wawoff2` cut the combined weight from 302KB to 122KB
   (~60%) for a file the browser downloads on every cold visit. The TTFs stay
   in the folder only because opengraph-image.tsx's satori renderer wants
   them — that route reads them directly, not through next/font. */

// Besley — a Clarendon: the sturdy hardware-store slab. Headlines (500),
// body (400), italic for quotes/queries.
const besley = localFont({
  variable: "--font-besley",
  display: "swap",
  src: [
    { path: "./fonts/besley-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/besley-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/besley-italic-400.woff2", weight: "400", style: "italic" },
  ],
});

// Inter — the functional layer: labels, buttons, nav, forms.
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = constructMetadata();

/* Paints the mobile browser chrome to match the canvas. This one follows the
   OS only — a meta tag can't read localStorage — so a reader who has forced
   the other theme keeps a browser bar in the system colour. The page itself is
   always right; this is the one place the override can't reach. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#16150f" },
  ],
};

/* Stamps a stored theme choice onto <html> BEFORE first paint, so a reader who
   picked the non-OS theme never sees a flash of the other one. Deliberately
   silent when nothing is stored: leaving [data-theme] off lets the
   prefers-color-scheme rules in design-tokens.css stay in charge, which means
   the page keeps following the OS live if it changes mid-session — and still
   themes correctly with JavaScript disabled. */
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLd();

  return (
    /* suppressHydrationWarning: the script below sets data-theme on this very
       element before React hydrates, so the attribute legitimately differs
       from the server-rendered HTML. */
    <html
      lang="en"
      className={`${besley.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
