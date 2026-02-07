import "./globals.css";
import { Inter } from "next/font/google";
import NavShell from "./components/nav/NavShell";
import ProgBar from "./components/ProgBar";
import AppShell from "./AppShell";
import LenisProvider from "./components/LenisProvider";

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
