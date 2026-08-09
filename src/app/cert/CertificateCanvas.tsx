"use client";

import { useEffect, useRef } from "react";
import {
  CERT_HEIGHT,
  CERT_TEMPLATE_SRC,
  CERT_WIDTH,
  drawNameOnCertificate,
} from "./certificate";
import styles from "./page.module.css";

type CertificateCanvasProps = {
  name: string;
  onReadyChange?: (ready: boolean) => void;
};

export default function CertificateCanvas({
  name,
  onReadyChange,
}: CertificateCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    onReadyChange?.(false);

    const render = async () => {
      await document.fonts.ready;

      const image = new Image();
      image.decoding = "async";
      image.src = CERT_TEMPLATE_SRC;
      await image.decode();

      if (cancelled) return;

      canvas.width = CERT_WIDTH;
      canvas.height = CERT_HEIGHT;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, CERT_WIDTH, CERT_HEIGHT);
      ctx.drawImage(image, 0, 0, CERT_WIDTH, CERT_HEIGHT);
      drawNameOnCertificate(ctx, name);
      onReadyChange?.(true);
    };

    render().catch(() => {
      if (!cancelled) onReadyChange?.(false);
    });

    return () => {
      cancelled = true;
    };
  }, [name, onReadyChange]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.certificateCanvas}
      aria-label={`Certificate of participation for ${name.trim() || "participant"}`}
    />
  );
}

export function getCertificateCanvas(
  root: HTMLElement | null,
): HTMLCanvasElement | null {
  const canvas = root?.querySelector("canvas");
  return canvas instanceof HTMLCanvasElement ? canvas : null;
}
