"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 開演オープニング（Figma ver2 の「オープニング（前）→（後）」を再現）。
 * ブルーの幕 → ロゴ「SOICHIRO KII」が立ち上がり、白線が引かれ → 幕が上がって本体へ。
 * - 1セッション1回だけ（sessionStorage）
 * - prefers-reduced-motion は即スキップ
 * - クリック / Esc で途中スキップ可
 * SSR でも幕を出しておくので、初回ロードでコンテンツがチラ見えしない。
 */
export default function Opening() {
  // SSR と初回クライアントで一致させるため、初期状態は常に「表示」。
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = sessionStorage.getItem("kii-op") === "1";

    const root = document.documentElement;
    // 再訪 or モーション削減 → 幕もヒーロー待機も無しで即撤去
    if (played || reduce) {
      root.classList.remove("op-playing");
      setDone(true);
      return;
    }

    sessionStorage.setItem("kii-op", "1");
    document.body.style.overflow = "hidden";

    // 幕が上がり始めるタイミングでヒーローの登場アニメを解放（幕上げと同期）
    const revealTimer = window.setTimeout(() => {
      root.classList.remove("op-playing");
    }, 1600);

    const finish = () => {
      root.classList.remove("op-playing");
      document.body.style.overflow = "";
      setDone(true);
    };
    // 幕が上がりきる時間（CSS の 2.4s に合わせて撤去）
    const timer = window.setTimeout(finish, 2500);

    // クリック / Esc でスキップ（幕を素早く上げ、ヒーローも即解放）
    const skip = () => {
      const el = overlayRef.current;
      if (el) el.classList.add("op-skip");
      root.classList.remove("op-playing");
      window.clearTimeout(revealTimer);
      window.clearTimeout(timer);
      window.setTimeout(finish, 400);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    const el = overlayRef.current;
    el?.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(revealTimer);
      root.classList.remove("op-playing");
      el?.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className="op-overlay" aria-hidden="true">
      <div className="op-inner">
        {/* ロゴは CSS mask で描画（色は background-color）。本番SVGは public/logo.svg を差し替えるだけ */}
        <span className="op-logo" role="img" aria-label="SOICHIRO KII" />
        <span className="op-line" />
      </div>
    </div>
  );
}
