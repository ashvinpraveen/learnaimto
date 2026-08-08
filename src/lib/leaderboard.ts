export type LeaderboardEntry = {
  name: string;
  signups: number;
};

export type LeaderboardData = {
  updatedAt: string | null;
  universities: LeaderboardEntry[];
  isLive: boolean;
};

export const LEADERBOARD_UNIVERSITIES = [
  "Universiti Malaya (UM)",
  "Taylor's University",
  "Sunway University",
  "Monash University Malaysia",
  "Asia Pacific University (APU)",
  "Multimedia University (MMU)",
  "Universiti Teknologi MARA (UiTM)",
  "Universiti Sains Malaysia (USM)",
  "Universiti Tunku Abdul Rahman (UTAR)",
] as const;

const fallbackEntries: LeaderboardEntry[] = LEADERBOARD_UNIVERSITIES.map(
  (name) => ({
    name,
    signups: 0,
  }),
);

function isLeaderboardEntry(value: unknown): value is LeaderboardEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<LeaderboardEntry>;
  return (
    typeof entry.name === "string" &&
    typeof entry.signups === "number"
  );
}

function sortEntries(entries: LeaderboardEntry[]) {
  return [...entries].sort(
    (a, b) => b.signups - a.signups || a.name.localeCompare(b.name),
  );
}

export async function getLeaderboardData(): Promise<LeaderboardData> {
  const dataUrl = process.env.LEADERBOARD_DATA_URL;

  if (!dataUrl) {
    return {
      updatedAt: null,
      universities: sortEntries(fallbackEntries),
      isLive: false,
    };
  }

  try {
    const response = await fetch(dataUrl, {
      next: { revalidate: 86_400 },
    });

    if (!response.ok) throw new Error(`Leaderboard request failed: ${response.status}`);

    const data = (await response.json()) as {
      updatedAt?: unknown;
      universities?: unknown;
    };

    if (!Array.isArray(data.universities)) throw new Error("Invalid leaderboard response");

    const universities = data.universities.filter(isLeaderboardEntry);
    if (universities.length === 0) throw new Error("Leaderboard response is empty");

    return {
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : null,
      universities: sortEntries(universities),
      isLive: true,
    };
  } catch (error) {
    console.error("Using leaderboard fallback data", error);

    return {
      updatedAt: null,
      universities: sortEntries(fallbackEntries),
      isLive: false,
    };
  }
}
