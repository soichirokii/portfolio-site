export default function Footer() {
  return (
    <footer
      className="w-full py-8 mt-20"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-serif text-sm" style={{ color: "var(--color-text)" }}>
          Soichiro Kii
        </span>
        <span className="text-xs" style={{ color: "var(--color-sub)" }}>
          © 2025 城井総一郎
        </span>
      </div>
    </footer>
  );
}
