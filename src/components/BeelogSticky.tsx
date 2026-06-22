"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Block {
  num: string;
  heading: string;
  slug: string;
  title: string;
  overview: string;
  mainImage: string | null;
}

export default function BeelogSticky({ blocks }: { blocks: Block[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setActive(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const idx = Math.min(blocks.length - 1, Math.floor(progress * blocks.length));
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [blocks.length]);

  return (
    <>
      {/* ── Desktop: sticky crossfade ── */}
      <div
        ref={sectionRef}
        className="beelog-sticky"
        style={{ position: "relative", height: `${blocks.length * 85}vh` }}
      >
        <div
          className="sticky-frame"
          style={{
            position: "sticky",
            top: 80,
            height: "calc(100vh - 80px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="w-full">
            <div className="flex flex-row items-center gap-12">
              {/* Left column */}
              <div className="w-[55%] flex flex-col">
                <span
                  className="text-xs tracking-widest mb-3"
                  style={{ color: "var(--color-sub)" }}
                >
                  PICK UP
                </span>
                <h3
                  className="font-mincho mb-3"
                  style={{ fontSize: 32, color: "var(--color-text)" }}
                >
                  BEElog
                </h3>
                <div className="flex items-center mb-6">
                  <span className="cat-dot" />
                  <span className="text-xs" style={{ color: "var(--color-sub)" }}>
                    Branding
                  </span>
                </div>

                {/* Crossfading heading + body + link */}
                <div className="crossfade-stack" style={{ position: "relative", minHeight: 320 }}>
                  {blocks.map((b, i) => (
                    <div
                      key={b.slug}
                      className="cf-item flex flex-col"
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: active === i ? 1 : 0,
                        transition: "opacity 0.5s ease",
                        pointerEvents: active === i ? "auto" : "none",
                      }}
                    >
                      <span
                        className="text-xs tracking-widest mb-2"
                        style={{ color: "var(--color-sub)" }}
                      >
                        {b.num}
                      </span>
                      <h4
                        className="font-mincho leading-snug mb-4"
                        style={{ fontSize: "clamp(20px, 2.2vw, 28px)", color: "var(--color-text)" }}
                      >
                        {b.heading}
                      </h4>
                      <p
                        className="text-sm leading-loose whitespace-pre-line mb-5"
                        style={{ color: "var(--color-sub)" }}
                      >
                        {b.overview}
                      </p>
                      <Link
                        href={`/works/${b.slug}`}
                        className="btn-secondary"
                        style={{ alignSelf: "flex-start" }}
                      >
                        {b.title} →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: crossfading image */}
              <div className="w-[45%] relative" style={{ aspectRatio: "1.63 / 1" }}>
                {blocks.map((b, i) => (
                  <div
                    key={b.slug}
                    className="cf-img"
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: active === i ? 1 : 0,
                      transition: "opacity 0.5s ease",
                      overflow: "hidden",
                    }}
                  >
                    {b.mainImage ? (
                      <Image
                        src={b.mainImage}
                        alt={b.title}
                        fill
                        sizes="45vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="img-placeholder w-full h-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-10">
              {blocks.map((b, i) => (
                <span
                  key={b.slug}
                  style={{
                    width: active === i ? 24 : 8,
                    height: 4,
                    borderRadius: 2,
                    background: active === i ? "var(--color-text)" : "var(--color-border)",
                    transition: "width 0.4s ease, background 0.4s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: simple stacked ── */}
      <div className="beelog-stacked flex flex-col gap-0">
        {blocks.map((b, i) => (
          <div
            key={b.slug}
            className="flex flex-col gap-4 py-10"
            style={{
              borderTop: i === 0 ? "1px solid var(--color-border)" : undefined,
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1.63 / 1" }}>
              {b.mainImage ? (
                <Image src={b.mainImage} alt={b.title} fill sizes="100vw" style={{ objectFit: "cover" }} />
              ) : (
                <div className="img-placeholder w-full h-full" />
              )}
            </div>
            <span className="text-xs tracking-widest" style={{ color: "var(--color-sub)" }}>
              {b.num}
            </span>
            <h4
              className="font-mincho leading-snug"
              style={{ fontSize: "clamp(20px, 6vw, 26px)", color: "var(--color-text)" }}
            >
              {b.heading}
            </h4>
            <p
              className="text-sm leading-loose whitespace-pre-line"
              style={{ color: "var(--color-sub)" }}
            >
              {b.overview}
            </p>
            <Link href={`/works/${b.slug}`} className="btn-secondary" style={{ alignSelf: "flex-start" }}>
              {b.title} →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
