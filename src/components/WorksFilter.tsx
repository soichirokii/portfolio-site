"use client";

import { useState } from "react";
import type { Work } from "@/lib/types";
import WorkCard from "@/components/WorkCard";
import ScrollReveal from "@/components/ScrollReveal";

const TABS = ["ALL", "Works", "Projects"] as const;
type Tab = (typeof TABS)[number];

const FILTERS_BY_TAB: Record<Tab, string[]> = {
  ALL: ["ALL", "UI/UX", "Branding", "Development", "Goods", "Original", "Graphic", "PM", "Content", "Sales", "Finance"],
  Works: ["ALL", "UI/UX", "Branding", "Development", "Goods", "Original", "Graphic"],
  Projects: ["ALL", "PM", "Content", "Sales", "Finance"],
};

export default function WorksFilter({ works }: { works: Work[] }) {
  const [tab, setTab] = useState<Tab>("ALL");
  const [filter, setFilter] = useState("ALL");

  function handleTab(t: Tab) {
    setTab(t);
    setFilter("ALL");
  }

  const filtered = works.filter((w) => {
    const matchTab =
      tab === "ALL" ||
      (tab === "Works" && w.type === "Work") ||
      (tab === "Projects" && w.type === "Project");
    const matchFilter = filter === "ALL" || w.category.includes(filter);
    return matchTab && matchFilter;
  });

  return (
    <>
      {/* Tabs */}
      <div
        className="flex justify-center gap-8 mb-0"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? "active" : ""}`}
            onClick={() => handleTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 py-5">
        {FILTERS_BY_TAB[tab].map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="section-divider mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
        {filtered.map((work, i) => (
          <ScrollReveal key={work.id} delay={i * 40}>
            <WorkCard work={work} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-20 text-sm" style={{ color: "var(--color-sub)" }}>
          該当する作品がありません
        </p>
      )}
    </>
  );
}
