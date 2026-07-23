import type { Metadata } from "next";
import { Zen_Maru_Gothic, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Opening from "@/components/Opening";

// 和文 — 丸ゴシック（Figma ver2 の決定版フォント）
const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-maru",
  display: "swap",
});

// 英字 — New Astro Soft が入るまでの暫定（Figma でも代用に使用）
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soichirokii.vercel.app"),
  title: "Soichiro Kii | Portfolio",
  description: "城井総一郎のポートフォリオです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${zenMaru.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Mark JS as available before first paint. Reveal styles only apply
            when this class is present, so content is never stuck invisible
            if JS fails to load or run. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              // OP がこれから再生されるなら、ヒーローの登場アニメを描画前から一時停止し、
              // 幕が上がるタイミング（Opening.tsx）で再開させる。チラつき防止。
              "try{var p=sessionStorage.getItem('kii-op')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!p&&!r)document.documentElement.classList.add('op-playing');}catch(e){}",
          }}
        />
      </head>
      <body>
        <Opening />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
