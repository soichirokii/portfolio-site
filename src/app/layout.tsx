import type { Metadata } from "next";
import { DM_Sans, Shippori_Mincho, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-shippori",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soichiro Kii — Portfolio",
  description: "城井総一郎のポートフォリオ。デザイン・テクノロジー・ビジネスを横断するデザインエンジニア。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${dmSans.variable} ${shippori.variable} ${dmSerif.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
