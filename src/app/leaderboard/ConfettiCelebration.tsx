"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

const CONFETTI_COLORS = [
  "#d8ff36",
  "#ffffff",
  "#ffcc4d",
  "#c7cbd1",
  "#ff5b8d",
  "#56d7ff",
];

type ConfettiStyle = CSSProperties & {
  "--confetti-color": string;
  "--confetti-delay": string;
  "--confetti-drift": string;
  "--confetti-duration": string;
  "--confetti-left": string;
  "--confetti-spin": string;
};

const pieces = Array.from({ length: 56 }, (_, index) => {
  const style: ConfettiStyle = {
    "--confetti-color": CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    "--confetti-delay": `${(index % 14) * 0.055}s`,
    "--confetti-drift": `${((index * 29) % 180) - 90}px`,
    "--confetti-duration": `${2.25 + (index % 8) * 0.12}s`,
    "--confetti-left": `${(index * 37) % 100}%`,
    "--confetti-spin": `${540 + (index % 5) * 180}deg`,
  };

  return { index, style };
});

export default function ConfettiCelebration() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let finishTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      setIsActive(true);
      finishTimer = window.setTimeout(() => setIsActive(false), 3400);
    }, 500);

    return () => {
      window.clearTimeout(startTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, []);

  return (
    isActive && (
      <div className={styles.confettiBurst} aria-hidden="true">
        {pieces.map(({ index, style }) => (
          <span className={styles.confettiPiece} key={index} style={style} />
        ))}
      </div>
    )
  );
}
