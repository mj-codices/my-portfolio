import "./globals.css";
import { Inter } from "next/font/google";
import NavShell from "./components/ui/nav/NavShell";
import ProgBar from "./components/ui/status/ProgBar";
import AppShell from "./components/layout/AppShell";
import LenisProvider from "../providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

 {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LenisProvider>
        <AppShell>
        <NavShell>
        {children}
        </NavShell>
        <ProgBar></ProgBar>
        </AppShell>
        </LenisProvider>
      </body>
    </html>
  );
}
