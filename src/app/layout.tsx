import "./globals.css";
import { Inter } from "next/font/google";
import NavShell from "./components/nav/NavShell";

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
        <NavShell>
        {children}
        </NavShell>
      </body>
    </html>
  );
}
