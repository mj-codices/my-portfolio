import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavShell from "./components/ui/nav/NavShell";
import ProgBar from "./components/ui/status/ProgBar";
import AppShell from "./components/layout/AppShell";
import LenisProvider from "../providers/LenisProvider";
import MotionProvider from "../providers/MotionProvider";
import { INTRO_SEEN_KEY } from "./components/layout/brandIntroKey";
import { SITE_URL } from "@/lib/site";

// Global font configuration — applied via CSS variable on <html>
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

// Browser tab, bookmarks, search results, and link previews
const title = "Michael J. White — Full-Stack Developer";
const description =
  "Portfolio of Michael J. White (Julian), a full-stack developer in Southern California building thoughtful, scalable, production-ready web apps with Next.js, React, and TypeScript.";

export const metadata: Metadata = {
  // Resolves relative URLs in metadata (e.g. a future link-preview image)
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

// Runs before first paint: on repeat loads in the same tab, mark the intro as
// seen so its overlay is hidden by CSS instead of flashing black (BrandIntro).
const introSeenScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1")document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Root HTML wrapper — attaches global font variable
    // suppressHydrationWarning: the intro script may add data-intro-seen to
    // <html> before React hydrates
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSeenScript }} />
      </head>
      <body>
        {/* Framer Motion config — honors the OS reduced-motion setting */}
        <MotionProvider>
        {/* Smooth scrolling context (Lenis) — affects all scroll-based animations */}
        <LenisProvider>
          {/* App-level layout wrapper (shared structure/styling) */}
          <AppShell>
            {/* Navigation shell — wraps all route content */}
            <NavShell>{children}</NavShell>
            {/* Global progress bar — reflects scroll position */}
            <div className="max-[500px]:hidden">
            <ProgBar></ProgBar>
            </div>
          </AppShell>
        </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
