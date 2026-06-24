import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getWorkBySlug, fetchAllWorks } from "@/lib/notion";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const works = await fetchAllWorks();
  return works.map((w) => ({ slug: w.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const yearMatch = work.period.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : work.period;

  const metaRows = [
    { label: "ROLE", value: work.role },
    { label: "TARGET", value: work.target },
    { label: "PERIOD", value: work.period },
  ].filter((r) => r.value);

  return (
    <div className="w-full pt-16 pb-32">
      <div className="max-w-content mx-auto px-6">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/works"
            className="text-sm"
            style={{ color: "var(--color-sub)", textDecoration: "none" }}
          >
            ← WORKS に戻る
          </Link>
        </div>

        {/* Hero: Title | Image */}
        <ScrollReveal>
          <div
            className="flex flex-col md:flex-row items-start gap-8 pb-12"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            {/* Left: Title */}
            <div
              className="w-full md:w-[40%] flex flex-col gap-4 pr-0 md:pr-8"
              style={{ borderRight: "none" }}
            >
              {/* Vertical divider line visible only on desktop */}
              <div className="hidden md:block" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    right: -32,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: "var(--color-border)",
                  }}
                />
              </div>
              <div className="flex items-center mb-2">
                <span className="text-xs" style={{ color: "var(--color-sub)" }}>
                  {work.type} · {year}
                </span>
              </div>
              <h1
                className="font-mincho leading-snug mb-3"
                style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "var(--color-text)" }}
              >
                {work.title}
              </h1>
              <div className="flex flex-wrap">
                {work.category.map((c) => (
                  <span key={c} className="category-tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Key visual */}
            <div
              className="w-full md:w-[60%]"
              style={{ aspectRatio: "1.63 / 1" }}
            >
              {work.mainImage ? (
                <div style={{ position: "relative", width: "100%", aspectRatio: "1.63 / 1" }}>
                  <Image
                    src={work.mainImage}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              ) : (
                <div className="img-placeholder w-full h-full" style={{ minHeight: 240 }} />
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Meta + Overview */}
        <ScrollReveal delay={60}>
          <div
            className="py-12"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Meta rows */}
              <div className="flex flex-col gap-6">
                {metaRows.map((row) => (
                  <div key={row.label} className="flex gap-8">
                    <span
                      className="text-xs tracking-widest w-20 flex-shrink-0 pt-0.5"
                      style={{ color: "var(--color-sub)" }}
                    >
                      {row.label}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
                {work.category.length > 0 && (
                  <div className="flex gap-8">
                    <span
                      className="text-xs tracking-widest w-20 flex-shrink-0 pt-0.5"
                      style={{ color: "var(--color-sub)" }}
                    >
                      CATEGORY
                    </span>
                    <span className="flex flex-wrap">
                      {work.category.map((c) => (
                        <span key={c} className="category-tag">
                          {c}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>

              {/* Overview */}
              {work.overview && (
                <div>
                  <span
                    className="block text-xs tracking-widest mb-3"
                    style={{ color: "var(--color-sub)" }}
                  >
                    OVERVIEW
                  </span>
                  <p
                    className="text-sm leading-loose whitespace-pre-line"
                    style={{ color: "var(--color-text)" }}
                  >
                    {work.overview}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Design Process */}
        {work.designProcess && (
          <ScrollReveal>
            <div
              className="py-12"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <span
                className="block text-xs tracking-widest mb-4"
                style={{ color: "var(--color-sub)" }}
              >
                PROCESS
              </span>
              <p className="text-sm leading-loose whitespace-pre-line" style={{ color: "var(--color-text)" }}>
                {work.designProcess}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Results */}
        {work.results && (
          <ScrollReveal>
            <div
              className="py-12"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <span
                className="block text-xs tracking-widest mb-4"
                style={{ color: "var(--color-sub)" }}
              >
                RESULTS
              </span>
              <p className="text-sm leading-loose whitespace-pre-line" style={{ color: "var(--color-text)" }}>
                {work.results}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Process Images */}
        {work.processImages.length > 0 && (
          <ScrollReveal>
            <div className="py-12" style={{ borderBottom: "1px solid var(--color-border)" }}>
              <span
                className="block text-xs tracking-widest mb-6"
                style={{ color: "var(--color-sub)" }}
              >
                PROCESS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {work.processImages.map((url, i) => (
                  <div key={i} style={{ position: "relative", aspectRatio: "1.63 / 1" }}>
                    <Image
                      src={url}
                      alt={`Process ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Back */}
        <div className="mt-12">
          <Link href="/works" className="btn-secondary">
            ← WORKS に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
