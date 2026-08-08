"use client";

import { useEffect, useRef } from "react";

type RippleDotFieldProps = {
  className: string;
};

function hash(x: number, y: number) {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43_758.5453;
  return value - Math.floor(value);
}

function smoothstep(min: number, max: number, value: number) {
  const amount = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return amount * amount * (3 - 2 * amount);
}

export default function RippleDotField({ className }: RippleDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let dotChannels = "245, 245, 245";

    const syncDotColor = () => {
      const themedChannels = getComputedStyle(canvas)
        .getPropertyValue("--theme-ink-rgb")
        .trim();
      dotChannels = themedChannels || "245, 245, 245";
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const time = motionQuery.matches ? 0 : now / 1_000;
      const gap = Math.max(20, Math.min(26, width / 48));
      const columns = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;

      for (let row = -1; row < rows; row += 1) {
        for (let column = -1; column < columns; column += 1) {
          const random = hash(column, row);
          const jitterX = (hash(column + 31, row + 7) - 0.5) * gap * 0.48;
          const jitterY = (hash(column + 13, row + 29) - 0.5) * gap * 0.48;
          const x = column * gap + jitterX;
          const y = row * gap + jitterY;
          const normalizedX = (x - width / 2) / Math.max(width / 2, 1);
          const normalizedY = (y - height / 2) / Math.max(height / 2, 1);
          const ellipticalDistance = Math.hypot(normalizedX * 0.78, normalizedY * 1.18);
          const edgeDensity = 0.14 + smoothstep(0.3, 0.94, ellipticalDistance) * 0.86;

          if (random > edgeDensity) continue;

          const distance = Math.hypot(x - width / 2, y - height / 2);
          const wave = (Math.sin(distance * 0.052 - time * 2.45) + 1) / 2;
          const pulse = Math.pow(wave, 4);
          const flicker = 0.72 + hash(column + 5, row + 17) * 0.28;
          const alpha = Math.min(0.94, (0.035 + pulse * 0.9) * flicker);
          const size = random > 0.9 ? 2.7 : 1.8;

          context.fillStyle = `rgba(${dotChannels}, ${alpha})`;
          context.fillRect(x, y, size, size);
        }
      }

      if (!motionQuery.matches) frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      resize();
      syncDotColor();
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(start);
    const themeObserver = new MutationObserver(syncDotColor);
    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["class", "data-theme", "style"],
      attributes: true,
    });
    motionQuery.addEventListener("change", start);
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      motionQuery.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
