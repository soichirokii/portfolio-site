import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/lib/types";

interface Props {
  work: Work;
  className?: string;
}

export default function WorkCard({ work, className = "" }: Props) {
  const primaryCat = work.category[0] ?? "";
  const yearMatch = work.period.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : "";

  return (
    <Link
      href={`/works/${work.slug}`}
      className={`work-card block ${className}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Image */}
      <div className="work-card-img-wrap mb-3">
        {work.mainImage ? (
          <Image
            src={work.mainImage}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="placeholder img-placeholder" />
        )}
      </div>

      {/* Category */}
      {primaryCat && (
        <div className="flex flex-wrap mb-2">
          {work.category.map((c) => (
            <span key={c} className="category-tag">
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3
        className="work-card-title font-mincho text-base leading-snug mb-1"
        style={{ color: "var(--color-text)" }}
      >
        {work.title}
      </h3>

      {/* Year */}
      {year && (
        <p className="text-xs" style={{ color: "var(--color-sub)" }}>
          {year}
        </p>
      )}
    </Link>
  );
}
