import Link from "next/link";
import Image from "next/image";
import { fetchAllWorks } from "@/lib/notion";
import ScrollReveal from "@/components/ScrollReveal";
import WorksSlider from "@/components/WorksSlider";

// Editorial headings for the Top-page spotlight. Title / overview / image
// are pulled live from Notion (single source of truth — never goes stale).
const BEELOG_META = [
  { num: "01", heading: "課外活動の情報格差をなくしたい。", slug: "beelog-logo" },
  { num: "02", heading: "ロゴからサイトまで、全部ひとりで。", slug: "beelog-website" },
  { num: "03", heading: "ものの見方が変わった。", slug: "beelog-sns" },
];

export default async function TopPage() {
  const allWorks = await fetchAllWorks();
  const sliderWorks = allWorks.filter((w) => w.type === "Work");

  const beelogBlocks = BEELOG_META.map((m) => {
    const work = allWorks.find((w) => w.slug === m.slug);
    return {
      ...m,
      title: work?.title ?? "",
      overview: work?.overview ?? "",
      mainImage: work?.mainImage ?? null,
    };
  });

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
              className="w-full md:w-[60%] flex-shrink-0 order-1 md:order-1 relative overflow-hidden"
              style={{ aspectRatio: "1 / 1.1", minHeight: 360 }}
            >
              <Image
                src="https://i.imgur.com/q3MgUwj.jpeg"
                alt="城井総一郎"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
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
            {beelogBlocks.map((block, i) => (
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
                    className="w-full md:w-[45%] flex-shrink-0 order-1 md:order-2 relative overflow-hidden"
                    style={{ aspectRatio: "1.63 / 1", minHeight: 200 }}
                  >
                    {block.mainImage ? (
                      <Image
                        src={block.mainImage}
                        alt={block.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="img-placeholder w-full h-full" />
                    )}
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
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "1 / 1", maxWidth: 360 }}
              >
                <Image
                  src="https://i.imgur.com/YMgpRGZ.png"
                  alt="城井総一郎"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: "cover" }}
                />
              </div>
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
