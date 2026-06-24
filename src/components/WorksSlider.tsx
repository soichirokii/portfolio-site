"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/lib/types";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  works: Work[];
}

export default function WorksSlider({ works }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function onMouseUp() { isDragging.current = false; }

  // Track which card is closest to the viewport center of the slider
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = el.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards.length) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      // Snap to the first/last dot at the scroll extremes
      if (el.scrollLeft <= 2) {
        setActiveIndex(0);
        return;
      }
      if (el.scrollLeft >= maxScroll - 2) {
        setActiveIndex(cards.length - 1);
        return;
      }
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [works.length]);

  return (
    <>
    <div
      ref={sliderRef}
      className="slider-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ cursor: "grab", userSelect: "none" }}
    >
      <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
        {works.map((work, i) => {
          const yearMatch = work.period.match(/\d{4}/);
          const year = yearMatch ? yearMatch[0] : "";
          return (
            <ScrollReveal key={work.id} delay={i * 60} className="flex-shrink-0" data-card>
            <Link
              href={`/works/${work.slug}`}
              className="work-card block"
              style={{ width: 300, textDecoration: "none", color: "inherit" }}
              draggable={false}
            >
              {/* Image */}
              <div
                className="work-card-img-wrap mb-3 relative"
                style={{ height: 184 }}
              >
                {work.mainImage ? (
                  <Image
                    src={work.mainImage}
                    alt={work.title}
                    fill
                    sizes="300px"
                    style={{ objectFit: "cover" }}
                    draggable={false}
                  />
                ) : (
                  <div className="placeholder img-placeholder" style={{ height: 184 }} />
                )}
              </div>

              {/* Category */}
              {work.category[0] && (
                <div className="flex flex-wrap mb-2">
                  {work.category.map((c) => (
                    <span key={c} className="category-tag">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h4
                className="work-card-title font-mincho text-sm leading-snug mb-1"
                style={{ color: "var(--color-text)" }}
              >
                {work.title}
              </h4>

              {year && (
                <p className="text-xs" style={{ color: "var(--color-sub)" }}>{year}</p>
              )}
            </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </div>

    {/* Pill-dot position indicator */}
    {works.length > 1 && (
      <div className="slider-dots">
        {works.map((work, i) => (
          <div
            key={work.id}
            className={`dot-pill${activeIndex === i ? " active" : ""}`}
            data-index={i}
          />
        ))}
      </div>
    )}
    </>
  );
}
