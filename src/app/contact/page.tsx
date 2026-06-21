"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const SNS = [
  { label: "Instagram", href: "https://www.instagram.com/soichiro_kii?igsh=M3AyOWQ0dzYzMGwx&utm_source=qr" },
  { label: "X (Twitter)", href: "https://x.com/soichiro_kii?s=11" },
  { label: "Mail", href: "mailto:soichiro3322118@gmail.com" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full pt-16 pb-32">
      <div className="max-w-content mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
          <h1
            className="text-center font-sans mb-4"
            style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text)" }}
          >
            CONTACT
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={40}>
          <p
            className="text-center text-sm mb-12"
            style={{ color: "var(--color-sub)" }}
          >
            お気軽にご連絡ください。
          </p>
        </ScrollReveal>

        <div className="max-w-xl mx-auto">

          {/* Form */}
          <ScrollReveal delay={60}>
            {status === "done" ? (
              <p className="text-center py-20 text-sm" style={{ color: "var(--color-accent)" }}>
                送信が完了しました。ありがとうございます。
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--color-sub)" }}>
                    お名前
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-transparent"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--color-sub)" }}>
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-transparent"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--color-sub)" }}>
                    件名
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-transparent"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: "var(--color-sub)" }}>
                    メッセージ
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-transparent resize-none"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs" style={{ color: "red" }}>
                    送信に失敗しました。時間をおいて再度お試しください。
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "sending"}
                  style={{ opacity: status === "sending" ? 0.6 : undefined }}
                >
                  {status === "sending" ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* SNS */}
          <ScrollReveal delay={100}>
            <div
              className="mt-16 pt-10"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <p
                className="text-xs tracking-widest mb-5 text-center"
                style={{ color: "var(--color-sub)" }}
              >
                SNS
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                {SNS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs"
                    style={{ padding: "10px 20px" }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
