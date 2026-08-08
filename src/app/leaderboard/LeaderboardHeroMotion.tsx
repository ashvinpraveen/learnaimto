"use client";

import { useEffect, useState, type ReactNode } from "react";

type LeaderboardHeroMotionProps = {
  children: ReactNode;
  className: string;
  readyClassName: string;
};

export default function LeaderboardHeroMotion({
  children,
  className,
  readyClassName,
}: LeaderboardHeroMotionProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`${className} ${isReady ? readyClassName : ""}`}>
      {children}
    </div>
  );
}
