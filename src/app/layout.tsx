import "./styles/globals.css";
import { Inter } from "next/font/google";
import NavShell from "./components/ui/nav/NavShell";
import ProgBar from "./components/ui/status/ProgBar";
import AppShell from "./components/layout/AppShell";
import LenisProvider from "../providers/LenisProvider";

// Global font configuration — applied via CSS variable on <html>
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Root HTML wrapper — attaches global font variable
    <html lang="en" className={inter.variable}>
      <body>
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
      </body>
    </html>
  );
}
