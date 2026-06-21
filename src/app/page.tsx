import Link from "next/link";
import Image from "next/image";
import { fetchAllWorks } from "@/lib/notion";
import ScrollReveal from "@/components/ScrollReveal";
import WorksSlider from "@/components/WorksSlider";

const BEELOG_BLOCKS = [
  {
    num: "01",
    heading: "課外活動の情報格差をなくしたい。",
    slug: "beelog-logo",
    title: "BEElog ロゴデザイン",
    overview:
      "BEElogのロゴをデザイン。名前の由来にもなった「蜂」をモチーフに、シンプルさと視認性を意識して制作。\n\n「BEE log」という名前には、ミツバチが花から花へと蜜と花粉を運び、生態系を豊かにするように、「10代が情報を糊にして新しい価値を咲かせてほしい」という願いを込めた。初めてのロゴ制作で、視認性とデザイン性、意味との両立が難しかった。",
  },
  {
    num: "02",
    heading: "ロゴからサイトまで、全部ひとりで。",
    slug: "beelog-website",
    title: "BEElog サイトデザイン",
    overview:
      "BEElogのサイトを設計・制作。インスタの次は、本命のWebサイトを立ち上げた。初めてのUI/UX・開発で、何もわからない状態から公開まで漕ぎ着けた。\n\nメディアとしての役割を果たせるよう、見やすさと情報量のバランスを保てるよう設計した。プログラミング未経験の人でも記事を更新しやすい仕様にした。他のメディアを参考にしながら、身の回りの人にも助言を求めて進めた。情報を見て終わらせず、応募など次のアクションにつながる設計を意識した。",
  },
  {
    num: "03",
    heading: "ものの見方が変わった。",
    slug: "beelog-sns",
    title: "BEElog SNSオペレーション",
    overview:
      "BEElogのInstagram運用を担当。投稿テンプレートは現在まで2バージョンを作成。わかりやすさと情報量のバランスを保つことを意識した。進路選択の時期には進路情報の企画を実施。\n\n最高月間PV8万、フォロワー430人（2026年6月現在）。投稿頻度の保ち方が次の課題。",
  },
];

export default async function TopPage() {
  const allWorks = await fetchAllWorks();
  const sliderWorks = allWorks.filter((w) => w.type === "Work");

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="w-full" style={{ minHeight: "90vh" }}>
        <div className="max-w-content mx-auto px-6">
          <div
            className="flex flex-col md:flex-row items-center gap-10 md:gap-0"
            style={{ minHeight: "90vh" }}
          >
            {/* Left: Photo */}
            <div
              className="w-full md:w-[60%] flex-shrink-0 order-1 md:order-1"
              style={{ aspectRatio: "1 / 1.1" }}
            >
              <div
                className="w-full h-full img-placeholder"
                style={{ background: "#E0DDD6", minHeight: 360 }}
              />
            </div>

            {/* Right: Text */}
            <div className="w-full md:w-[40%] flex flex-col gap-6 pl-0 md:pl-12 order-2 md:order-2 pb-16 md:pb-0">
              <h1
                className="font-mincho leading-tight"
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                いつも通りに、<br />きらめきを。
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-sub)" }}
              >
                何気ない日常の中にある、小さな幸せを見つけて、増やしていく。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/works" className="btn-primary">
                  Works を見る
                </Link>
                <Link href="/about" className="btn-secondary">
                  もっと知る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORKS SECTION ─── */}
      <section className="w-full py-20">
        <div className="max-w-content mx-auto px-6">
          {/* Heading */}
          <ScrollReveal>
            <h2
              className="text-center font-sans mb-16"
              style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)" }}
            >
              WORKS
            </h2>
          </ScrollReveal>

          {/* BEElog Spotlight blocks */}
          <div className="flex flex-col gap-0">
            {BEELOG_BLOCKS.map((block, i) => (
              <ScrollReveal key={block.num} delay={i * 80}>
                <div
                  className="flex flex-col md:flex-row items-start gap-8 py-12"
                  style={{
                    borderTop: i === 0 ? "1px solid var(--color-border)" : undefined,
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {/* Left: Text (55%) */}
                  <div className="w-full md:w-[55%] flex flex-col gap-4 order-2 md:order-1">
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "var(--color-sub)" }}
                    >
                      {block.num}
                    </span>
                    <h3
                      className="font-mincho leading-snug"
                      style={{
                        fontSize: "clamp(20px, 2.5vw, 28px)",
                        color: "var(--color-text)",
                      }}
                    >
                      {block.heading}
                    </h3>
                    <p
                      className="text-sm leading-loose whitespace-pre-line"
                      style={{ color: "var(--color-sub)" }}
                    >
                      {block.overview}
                    </p>
                    <Link
                      href={`/works/${block.slug}`}
                      className="btn-secondary mt-2"
                      style={{ alignSelf: "flex-start" }}
                    >
                      {block.title} →
                    </Link>
                  </div>

                  {/* Right: Image (45%) */}
                  <div
                    className="w-full md:w-[45%] flex-shrink-0 order-1 md:order-2"
                    style={{ aspectRatio: "1.63 / 1" }}
                  >
                    <div className="img-placeholder w-full h-full" style={{ minHeight: 200 }} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Works Slider */}
          {sliderWorks.length > 0 && (
            <ScrollReveal>
              <div className="mt-16">
                <p
                  className="text-xs tracking-widest uppercase mb-6"
                  style={{ color: "var(--color-sub)" }}
                >
                  Works
                </p>
                <WorksSlider works={sliderWorks} />
              </div>
            </ScrollReveal>
          )}

          {/* See all */}
          <ScrollReveal>
            <div className="flex justify-center mt-10">
              <Link href="/works" className="btn-secondary">
                Works 一覧を見る →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section className="w-full py-20" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollReveal>
            <h2
              className="text-center font-sans mb-12"
              style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)" }}
            >
              ABOUT
            </h2>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Image */}
            <ScrollReveal className="w-full md:w-[360px] flex-shrink-0">
              <div
                className="img-placeholder w-full"
                style={{ aspectRatio: "1 / 1", maxWidth: 360 }}
              />
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal delay={100} className="flex flex-col gap-5 flex-1">
              <h3
                className="font-mincho text-xl"
                style={{ color: "var(--color-text)" }}
              >
                城井総一郎
              </h3>
              <p className="text-sm leading-loose" style={{ color: "var(--color-sub)" }}>
                2010年3月3日生まれ、16歳。神山まるごと高専2年 デザインエンジニアリング学科在籍中。
              </p>
              <p className="text-sm leading-loose" style={{ color: "var(--color-sub)" }}>
                好奇心が旺盛で、何にでも興味を持ってしまう性格。何があっても「なんとかなる」精神で歩いてきました。ポジティブさと素直さが取り柄です。
              </p>
              <Link href="/about" className="btn-secondary mt-2" style={{ alignSelf: "flex-start" }}>
                もっと知る
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section
        className="w-full py-24 text-center"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="max-w-content mx-auto px-6">
          <ScrollReveal>
            <h2
              className="font-sans mb-4"
              style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)" }}
            >
              CONTACT
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <p
              className="text-sm mb-8"
              style={{ color: "var(--color-sub)" }}
            >
              お気軽にご連絡ください。
            </p>
            <Link href="/contact" className="btn-primary">
              お問い合わせ
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
