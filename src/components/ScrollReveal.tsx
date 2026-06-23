"use client";

import { useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = "", delay = 0, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, reveal immediately (graceful fallback)
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal when the element scrolls into view, OR when it is already
        // above the viewport on mount (e.g. a reload mid-page or a deep link).
        // Without the second case, content scrolled past at load would stay
        // stuck at opacity:0 forever.
        const alreadyPassed = entry.boundingClientRect.top < 0;
        if (entry.isIntersecting || alreadyPassed) {
          timer = setTimeout(() => setVisible(true), alreadyPassed ? 0 : delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
