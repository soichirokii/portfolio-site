"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // `active` becomes true after hydration — keeps SSR output fully visible
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setActive(true);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        active
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition:
                "opacity 1s cubic-bezier(0.2,1,0.3,1), transform 1s cubic-bezier(0.2,1,0.3,1)",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
