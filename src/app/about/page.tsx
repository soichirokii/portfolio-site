import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const SKILLS = ["UI/UX Design", "Figma", "Illustrator", "Prototyping", "Branding", "Vibe Coding"];
const TOOLS = ["Figma", "Illustrator", "Photoshop", "Canva", "Notion"];
const INTERESTS = ["マーケティング", "エンタメ", "広告"];

export default function AboutPage() {
  return (
    <div className="w-full pt-16 pb-32">
      <div className="max-w-content mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
          <h1
            className="text-center font-sans mb-16"
            style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)" }}
          >
            ABOUT
          </h1>
        </ScrollReveal>

        {/* Intro: Photo + Profile */}
        <section
          className="pb-16"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Photo */}
            <ScrollReveal className="w-full md:w-[360px] flex-shrink-0">
              <div
                className="img-placeholder w-full"
                style={{ aspectRatio: "1 / 1", maxWidth: 360 }}
              />
            </ScrollReveal>

            {/* Profile text */}
            <ScrollReveal delay={80} className="flex flex-col gap-5 flex-1 pt-2">
              <h2
                className="font-mincho"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--color-text)" }}
              >
                城井総一郎 / Soichiro Kii
              </h2>
              <p className="text-sm leading-loose" style={{ color: "var(--color-sub)" }}>
                2010年3月3日生まれ、16歳。神山まるごと高専2年 デザインエンジニアリング学科在籍中。
              </p>
              <p className="text-sm leading-loose" style={{ color: "var(--color-sub)" }}>
                好奇心が旺盛で、何にでも興味を持ってしまう性格。何があっても「なんとかなる」精神で歩いてきました。ポジティブさと素直さが取り柄です。
              </p>
              <p className="text-sm leading-loose" style={{ color: "var(--color-sub)" }}>
                現在は、メディア制作・イベント企画・Webデザインとその開発に取り組んでいます。
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission */}
        <section
          className="py-16"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <ScrollReveal>
            <h2
              className="font-mincho mb-8"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--color-text)" }}
            >
              いつも通りに、きらめきを。
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <p className="text-sm leading-loose mb-5" style={{ color: "var(--color-sub)", maxWidth: 680 }}>
              課題を解決することより、すでにいいものをもっとよくすることに興味があります。0から1をつくることだけでなく、1にあるものを、もっと多くの人に届くきらめきへと増幅させること。それが自分のものづくりの軸です。
            </p>
            <p className="text-sm leading-loose" style={{ color: "var(--color-sub)", maxWidth: 680 }}>
              デザイン、テクノロジー、ビジネス。分野を一つに絞らず横断してきたのも、この軸のため。たくさんの興味があるからこそ、領域をまたいで動けることが、自分の強みです。
            </p>
          </ScrollReveal>
        </section>

        {/* Skills / Tools / Interests */}
        <section className="py-16">
          <div className="flex flex-col gap-12">

            {/* SKILLS */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <span
                  className="text-xs tracking-widest w-24 flex-shrink-0 pt-1"
                  style={{ color: "var(--color-sub)" }}
                >
                  SKILLS
                </span>
                <div className="flex flex-wrap gap-3">
                  {SKILLS.map((s) => (
                    <span
                      key={s}
                      className="filter-chip"
                      style={{ cursor: "default" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* TOOLS */}
            <ScrollReveal delay={40}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <span
                  className="text-xs tracking-widest w-24 flex-shrink-0 pt-1"
                  style={{ color: "var(--color-sub)" }}
                >
                  TOOLS
                </span>
                <div className="flex flex-wrap gap-3">
                  {TOOLS.map((t) => (
                    <span
                      key={t}
                      className="filter-chip"
                      style={{ cursor: "default" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* INTERESTS */}
            <ScrollReveal delay={80}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <span
                  className="text-xs tracking-widest w-24 flex-shrink-0 pt-1"
                  style={{ color: "var(--color-sub)" }}
                >
                  INTERESTS
                </span>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map((interest) => (
                    <span
                      key={interest}
                      className="filter-chip"
                      style={{ cursor: "default" }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <div
            className="pt-16 text-center"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <p className="text-sm mb-6" style={{ color: "var(--color-sub)" }}>
              お気軽にご連絡ください。
            </p>
            <Link href="/contact" className="btn-primary">
              お問い合わせ
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
