"use client";

import { useEffect, useState } from "react";
import AimtoButton from "../AimtoButton";
import { EVENT_START_ISO, REGISTRATION_URL } from "@/lib/constants";
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

export default function LearnathonCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getRemaining
  > | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ["Days", remaining?.days],
    ["Hours", remaining?.hours],
    ["Minutes", remaining?.minutes],
    ["Seconds", remaining?.seconds],
  ] as const;

  return (
    <section
      className={styles.countdown}
      aria-label="Countdown to the Learn-a-thon"
    >
      <div>
        <span className={styles.sectionLabel}>
          THE LEARN-A-THON BEGINS IN_
        </span>
        <div className={styles.countdownUnits}>
          {units.map(([label, value]) => (
            <div key={label}>
              <strong>
                {value === undefined ? "--" : String(value).padStart(2, "0")}
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <AimtoButton className={styles.ctaButton} href={REGISTRATION_URL}>
        Sign up free <span aria-hidden="true">↗</span>
      </AimtoButton>
    </section>
  );
}
