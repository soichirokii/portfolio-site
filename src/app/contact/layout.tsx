import type { Metadata } from "next";

// contact/page.tsx はフォームの状態を持つクライアントコンポーネントで
// metadata を export できないため、layout 側で定義する。
export const metadata: Metadata = {
  title: "Contact",
  description:
    "城井総一郎へのお問い合わせページです。お仕事のご相談・ご依頼はこちらからお気軽にご連絡ください。",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
