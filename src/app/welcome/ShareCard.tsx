"use client";

import { useEffect, useRef } from "react";
import type { Personality, TraitScore } from "./questions";
import { METHOD_NAME } from "./questions";
import styles from "./page.module.css";

type ShareCardProps = {
  name: string;
  percent: number;
  score: number;
  maxScore: number;
  personality: Personality;
  traits: TraitScore[];
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export default function ShareCard({
  name,
  percent,
  score,
  maxScore,
  personality,
  traits,
}: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const displayName = (name.trim() || "Builder").toUpperCase();

    ctx.fillStyle = "#070707";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 2;
    ctx.strokeRect(56, 56, width - 112, height - 112);

    ctx.fillStyle = personality.accent;
    ctx.fillRect(56, 56, width - 112, 10);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 26px 'JetBrains Mono', monospace";
    ctx.fillText(`AIMTO · ${METHOD_NAME} SCORECARD_`, 100, 150);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 58px 'Space Grotesk', 'Rethink Sans', sans-serif";
    const nameWidth = ctx.measureText(displayName).width;
    const nameScale = nameWidth > 880 ? 880 / nameWidth : 1;
    ctx.save();
    ctx.translate(100, 230);
    ctx.scale(nameScale, nameScale);
    ctx.fillText(displayName, 0, 0);
    ctx.restore();

    ctx.fillStyle = personality.accent;
    ctx.font = "700 210px 'Space Grotesk', 'Rethink Sans', sans-serif";
    const scoreText = `${percent}`;
    ctx.fillText(scoreText, 100, 470);
    const scoreWidth = ctx.measureText(scoreText).width;
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 64px 'Space Grotesk', 'Rethink Sans', sans-serif";
    ctx.fillText("%", 100 + scoreWidth + 12, 390);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 52px 'Space Grotesk', 'Rethink Sans', sans-serif";
    ctx.fillText(personality.title.toUpperCase(), 100, 560);

    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "500 30px 'Rethink Sans', sans-serif";
    ctx.fillText(personality.tagline, 100, 615);

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "600 22px 'JetBrains Mono', monospace";
    ctx.fillText(
      `TYPE ${personality.code}  ·  ${score}/${maxScore} PTS  ·  ${personality.dayTrack.toUpperCase()}`,
      100,
      680,
    );

    let y = 760;
    for (const trait of traits) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "600 22px 'JetBrains Mono', monospace";
      ctx.fillText(`${trait.letter}  ${trait.label.toUpperCase()}`, 100, y);

      const barX = 420;
      const barW = 540;
      const barH = 12;
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      roundRect(ctx, barX, y - 12, barW, barH, 4);
      ctx.fill();
      ctx.fillStyle = personality.accent;
      roundRect(
        ctx,
        barX,
        y - 12,
        Math.max(8, barW * (trait.value / trait.max)),
        barH,
        4,
      );
      ctx.fill();
      y += 58;
    }

    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.font = "600 20px 'JetBrains Mono', monospace";
    ctx.fillText(
      "MALAYSIAN LEARN-A-THON  ·  12 AUG 2026  ·  THE CAMPUS KL",
      100,
      1220,
    );
    ctx.fillText("GET YOURS  ·  /WELCOME", 100, 1260);
  }, [maxScore, name, percent, personality, score, traits]);

  return (
    <div className={styles.shareCardWrap}>
      <canvas
        ref={canvasRef}
        className={styles.shareCanvas}
        aria-label={`${name || "Builder"} AI builder scorecard`}
      />
    </div>
  );
}

export async function downloadShareCard(
  root: HTMLElement | null,
  fileName: string,
) {
  const canvas = root?.querySelector("canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}
