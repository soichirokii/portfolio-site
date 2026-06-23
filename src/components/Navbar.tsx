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
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Shrink navbar after scrolling past threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  // Magnet effect: nav link drifts toward the cursor (desktop only)
  function handleMagnetMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    link.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }
  function handleMagnetLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.transform = "translate(0, 0)";
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
        <div
          className="max-w-content mx-auto flex items-center justify-between"
          style={{
            padding: scrolled ? "14px 32px" : "28px 32px",
            transition: "padding 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
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
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                style={{
                  display: "inline-block",
                  color: isActive(l.href) ? "var(--color-text)" : "var(--color-sub)",
                  background: isActive(l.href) ? "rgba(74,158,191,0.12)" : "transparent",
                  padding: isActive(l.href) ? "4px 8px" : "4px 0",
                  textDecoration: "none",
                  transition:
                    "color 0.2s, background 0.2s, transform 0.15s cubic-bezier(0.2, 1, 0.4, 1)",
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
