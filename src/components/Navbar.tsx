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

// Scroll distance after which the full-bleed bar morphs into the floating pill.
const THRESHOLD = 80;

// The bar is `fixed`, so a spacer holds its place in the flow. Its height is
// derived rather than measured — measuring the live bar races with the morph
// transition and can freeze the spacer at the pill's height.
const ROW_H = 30; // inner row: tallest of logo (17), nav link (29), burger (25)
const TOP_PAD_Y = 28;
const PILL_PAD_Y = 12;
const BORDER = 1;
const BAR_H = ROW_H + TOP_PAD_Y * 2 + BORDER * 2;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MORPH = `0.45s ${EASE}`;

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

  // Float the navbar after scrolling past threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Fixed shell — the bar itself morphs inside it */}
      <div
        className="fixed inset-x-0 top-0"
        // Lift above the mobile overlay (z-100) while it's open so the logo and
        // the close button stay reachable.
        style={{ zIndex: open ? 120 : 50 }}
      >
        <nav
          className="mx-auto"
          style={{
            width: scrolled ? "min(880px, calc(100% - 28px))" : "100%",
            marginTop: scrolled ? 12 : 0,
            borderRadius: scrolled ? 999 : 0,
            // Border width stays 1px in both states so the morph never jumps;
            // at the top only the bottom edge is visible. Per-side colours
            // (never the `borderColor` shorthand) so React can diff them.
            borderStyle: "solid",
            borderWidth: BORDER,
            borderTopColor: scrolled ? "var(--color-border)" : "transparent",
            borderRightColor: scrolled ? "var(--color-border)" : "transparent",
            borderLeftColor: scrolled ? "var(--color-border)" : "transparent",
            borderBottomColor: "var(--color-border)",
            background: scrolled ? "rgba(247,244,237,0.82)" : "rgba(247,244,237,0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: scrolled ? "0 10px 30px -14px rgba(44,44,42,0.45)" : "none",
            transition: `width ${MORPH}, margin-top ${MORPH}, border-radius ${MORPH}, border-top-color ${MORPH}, border-right-color ${MORPH}, border-left-color ${MORPH}, background ${MORPH}, box-shadow ${MORPH}`,
          }}
        >
          <div
            className="max-w-content mx-auto flex items-center justify-between"
            style={{
              height: ROW_H,
              paddingTop: scrolled ? PILL_PAD_Y : TOP_PAD_Y,
              paddingBottom: scrolled ? PILL_PAD_Y : TOP_PAD_Y,
              paddingLeft: scrolled ? 24 : 32,
              paddingRight: scrolled ? 24 : 32,
              boxSizing: "content-box",
              transition: `padding ${MORPH}`,
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="SOICHIRO KII — Top"
              style={{ color: "var(--color-text)", display: "inline-flex", alignItems: "center" }}
            >
              <span
                className="logo-mark"
                role="img"
                aria-label="SOICHIRO KII"
                style={{ height: scrolled ? 15 : 17, transition: `height ${MORPH}` }}
              />
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
                    background: isActive(l.href) ? "rgba(107,151,172,0.14)" : "transparent",
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
              aria-expanded={open}
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
      </div>

      {/* Holds the fixed bar's place in the document flow */}
      <div aria-hidden style={{ height: BAR_H }} />

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
