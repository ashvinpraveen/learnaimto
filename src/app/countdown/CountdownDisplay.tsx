"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
import { EVENT_START_ISO, SITE_NAME } from "@/lib/constants";
import styles from "./page.module.css";

const eventStart = new Date(EVENT_START_ISO).getTime();

function getRemaining() {
  const difference = Math.max(0, eventStart - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

function formatUnit(value: number | undefined) {
  return value === undefined ? "--" : String(value).padStart(2, "0");
}

export default function CountdownDisplay() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getRemaining
  > | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setRemaining(getRemaining());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    onFullscreenChange();
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen can be blocked by the browser; keep the page usable.
    }
  };

  const units = [
    ["Days", remaining?.days],
    ["Hours", remaining?.hours],
    ["Minutes", remaining?.minutes],
    ["Seconds", remaining?.seconds],
  ] as const;

  return (
    <main className={styles.page} aria-label={`${SITE_NAME} countdown`}>
      <button
        type="button"
        className={styles.fullscreenButton}
        onClick={toggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={isFullscreen ? "Exit full screen" : "Open in full screen"}
      >
        {isFullscreen ? (
          <Minimize2 size={16} aria-hidden="true" strokeWidth={2.25} />
        ) : (
          <Maximize2 size={16} aria-hidden="true" strokeWidth={2.25} />
        )}
        {isFullscreen ? "Exit" : "Full screen"}
      </button>

      <div className={styles.content}>
        <Image
          src="/aimto-assets/logo-white.png"
          alt={SITE_NAME}
          width={600}
          height={113}
          priority
          className={styles.logo}
        />

        <div className={styles.countdown} aria-live="polite">
          <div className={styles.units}>
            {units.map(([label, value]) => (
              <div key={label} className={styles.unit}>
                <strong className={styles.value}>{formatUnit(value)}</strong>
                <span className={styles.label}>{label}</span>
              </div>
            ))}
          </div>
          <p className={styles.eventLine}>12 August 2026 · The Campus KL</p>
        </div>
      </div>
    </main>
  );
}
