const ITEMS = [
  "UI/UX Design",
  "KPOP",
  "Figma",
  "Fashion",
  "Illustrator",
  "Architecture",
  "Branding",
  "Keep it real",
];

export default function MarqueeStrip() {
  // Duplicate for seamless loop
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div
      className="w-full overflow-hidden py-4"
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
      }}
    >
      <div className="marquee-inner">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-6 text-sm font-medium tracking-widest uppercase whitespace-nowrap"
            style={{ color: "var(--color-sub)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--color-accent)",
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
