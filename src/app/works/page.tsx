import { fetchAllWorks } from "@/lib/notion";
import ScrollReveal from "@/components/ScrollReveal";
import WorksFilter from "@/components/WorksFilter";

export default async function WorksPage() {
  const works = await fetchAllWorks();

  return (
    <div className="w-full pt-16 pb-32">
      <div className="max-w-content mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
          <h1
            className="text-center font-sans mb-10"
            style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)" }}
          >
            WORKS
          </h1>
        </ScrollReveal>

        {/* Tabs + Filters + Grid (client component) */}
        <WorksFilter works={works} />
      </div>
    </div>
  );
}
