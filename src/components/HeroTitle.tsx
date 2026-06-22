"use client";

const LINES = ["いつも通りに、", "きらめきを。"];

export default function HeroTitle() {
  let charIndex = 0;
  return (
    <h1
      className="font-mincho leading-tight"
      style={{
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 500,
        color: "var(--color-text)",
      }}
    >
      {LINES.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {[...line].map((ch) => {
            const i = charIndex++;
            return (
              <span
                key={i}
                className="hero-char"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
