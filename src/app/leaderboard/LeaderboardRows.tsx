"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "../../lib/leaderboard";
import {
  calculateLeaderboardChanges,
  type LeaderboardChanges,
} from "../../lib/leaderboardChanges";
import styles from "./page.module.css";

const STORAGE_KEY = "aimto-leaderboard-snapshot-v3";
const rankLabels = ["01", "02", "03"];
const WINNERS = new Set(["Sunway University", "Taylor's University"]);

type StoredSnapshot = {
  changes: LeaderboardChanges;
  universities: LeaderboardEntry[];
};

function isStoredSnapshot(value: unknown): value is StoredSnapshot {
  if (!value || typeof value !== "object") return false;

  const snapshot = value as Partial<StoredSnapshot>;
  return (
    Array.isArray(snapshot.universities) &&
    snapshot.universities.every(
      (entry) =>
        entry &&
        typeof entry.name === "string" &&
        typeof entry.signups === "number",
    ) &&
    Boolean(snapshot.changes) &&
    typeof snapshot.changes === "object"
  );
}

function snapshotSignature(universities: LeaderboardEntry[]) {
  return JSON.stringify(
    universities.map(({ name, signups }) => [name, signups]),
  );
}

function getLastRankChanges(universities: LeaderboardEntry[]) {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    const stored = storedValue ? (JSON.parse(storedValue) as unknown) : null;

    if (!isStoredSnapshot(stored)) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ universities, changes: {} }),
      );
      return {};
    }

    if (
      snapshotSignature(stored.universities) === snapshotSignature(universities)
    ) {
      return stored.changes;
    }

    const changes = Object.fromEntries(
      Object.entries(
        calculateLeaderboardChanges(stored.universities, universities),
      ).filter(([, change]) => change.rankDelta !== 0),
    );
    const hasRankChanges = Object.keys(changes).length > 0;
    const nextChanges = hasRankChanges
      ? { ...stored.changes, ...changes }
      : stored.changes;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ universities, changes: nextChanges }),
    );
    return nextChanges;
  } catch {
    return {};
  }
}

function PlacementChange({ rankDelta }: { rankDelta?: number }) {
  if (!rankDelta) return null;

  return (
    <span
      className={`${styles.placementChange} ${rankDelta < 0 ? styles.placementDown : ""}`}
      aria-hidden="true"
    >
      <span className={styles.placementTriangle} />
      <b>{Math.abs(rankDelta)}</b>
    </span>
  );
}

export default function LeaderboardRows({
  universities,
  showChanges = true,
}: {
  universities: LeaderboardEntry[];
  showChanges?: boolean;
}) {
  const [changes, setChanges] = useState<LeaderboardChanges>({});

  useEffect(() => {
    setChanges(getLastRankChanges(universities));
  }, [universities]);

  return (
    <ol className={styles.rows}>
      {universities.map((university, index) => (
        <li
          className={`${styles.row} ${index < 3 ? styles[`rank${index + 1}`] : ""}`}
          key={university.name}
        >
          <span
            className={styles.rank}
            aria-label={`Rank ${index + 1}${showChanges && changes[university.name]?.rankDelta ? `, ${changes[university.name].rankDelta > 0 ? "up" : "down"} ${Math.abs(changes[university.name].rankDelta)} ${Math.abs(changes[university.name].rankDelta) === 1 ? "place" : "places"} since the previous placement change` : ""}`}
          >
            {index < 2 ? (
              <span className={styles.coinWrap}>
                <span className={styles.coinBody}>
                  <span className={styles.coinEdge} aria-hidden="true" />
                  <Image
                    className={styles.rankCoin}
                    src={
                      index === 0
                        ? "/aimto-assets/leaderboard-first-place-cutout.png"
                        : "/aimto-assets/leaderboard-second-place-cutout-v2.png"
                    }
                    alt={
                      index === 0
                        ? "Gold 01 placement coin"
                        : "Silver 02 placement coin"
                    }
                    width={72}
                    height={72}
                  />
                  <Image
                    aria-hidden="true"
                    className={styles.coinBack}
                    src={
                      index === 0
                        ? "/aimto-assets/leaderboard-first-place-cutout.png"
                        : "/aimto-assets/leaderboard-second-place-cutout-v2.png"
                    }
                    alt=""
                    width={72}
                    height={72}
                  />
                </span>
              </span>
            ) : (
              rankLabels[index] ?? String(index + 1).padStart(2, "0")
            )}
            <PlacementChange
              rankDelta={showChanges ? changes[university.name]?.rankDelta : undefined}
            />
          </span>
          <div className={styles.university}>
            <strong>{university.name}</strong>
            {WINNERS.has(university.name) && (
              <span className={styles.winnerBadge}>Winner</span>
            )}
          </div>
          <span className={styles.signups}>
            <b>{university.signups}</b>
            <small>{university.signups === 1 ? "signup" : "signups"}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
