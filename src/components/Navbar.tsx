"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Top" },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(247,244,237,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-content mx-auto px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-base tracking-wide"
            style={{ color: "var(--color-text)", textDecoration: "none" }}
          >
            Soichiro Kii
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-sm font-medium"
                style={{
                  color: isActive(l.href) ? "var(--color-text)" : "var(--color-sub)",
                  background: isActive(l.href) ? "rgba(74,158,191,0.12)" : "transparent",
                  padding: isActive(l.href) ? "4px 8px" : "4px 0",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 z-[110] relative"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="ham-line"
              style={{
                transform: open ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="ham-line"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="ham-line"
              style={{
                transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu-overlay ${open ? "" : "hidden"}`}>
        <div className="flex flex-col items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-3xl font-medium"
              style={{
                color: isActive(l.href) ? "var(--color-accent)" : "var(--color-text)",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
