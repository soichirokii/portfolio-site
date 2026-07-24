export default function Footer() {
  return (
    <footer
      className="w-full py-8 mt-20"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span
          className="logo-mark"
          role="img"
          aria-label="SOICHIRO KII"
          style={{ height: 14, color: "var(--color-text)" }}
        />
        <span className="text-xs" style={{ color: "var(--color-sub)" }}>
          © 2026 城井総一郎
        </span>
      </div>
    </footer>
  );
}
