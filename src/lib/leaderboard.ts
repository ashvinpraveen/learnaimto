export type LeaderboardEntry = {
  name: string;
  signups: number;
};

export type LeaderboardData = {
  updatedAt: string | null;
  universities: LeaderboardEntry[];
};

export const LEADERBOARD_UNIVERSITIES = [
  "Multimedia University (MMU)",
  "Sunway University",
  "Taylor's University",
  "Universiti Malaya (UM)",
  "Universiti Teknologi MARA (UiTM)",
  "Universiti Sains Malaysia (USM)",
  "Universiti Utara Malaysia (UUM)",
  "Sekolah Menengah Kebangsaan Kepong Baru (SMK Kepong Baru)",
] as const;

const DEFAULT_LEADERBOARD_DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXiRcXdEQj-OVxL1qTmiy22q_130yJ5VRBZkWRuHld5sQE1nYJFMlb2OX0t6c_aROcQFwaAxDbQHRw/pub?gid=2083718559&single=true&output=csv";

const fallbackEntries: LeaderboardEntry[] = [
  { name: LEADERBOARD_UNIVERSITIES[0], signups: 8 },
  { name: LEADERBOARD_UNIVERSITIES[1], signups: 4 },
  { name: LEADERBOARD_UNIVERSITIES[2], signups: 2 },
  { name: LEADERBOARD_UNIVERSITIES[3], signups: 1 },
  { name: LEADERBOARD_UNIVERSITIES[4], signups: 1 },
  { name: LEADERBOARD_UNIVERSITIES[5], signups: 1 },
  { name: LEADERBOARD_UNIVERSITIES[6], signups: 1 },
  { name: LEADERBOARD_UNIVERSITIES[7], signups: 1 },
];

const FALLBACK_UPDATED_AT = "2026-08-11T01:24:41+08:00";

function isLeaderboardEntry(value: unknown): value is LeaderboardEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<LeaderboardEntry>;
  return (
    typeof entry.name === "string" &&
    typeof entry.signups === "number"
  );
}

function sortEntries(entries: LeaderboardEntry[]) {
  const preferredOrder = new Map(
    LEADERBOARD_UNIVERSITIES.map((name, index) => [name, index]),
  );

  return [...entries].sort((a, b) => {
    const signupDifference = b.signups - a.signups;
    if (signupDifference !== 0) return signupDifference;

    const aOrder = preferredOrder.get(
      a.name as (typeof LEADERBOARD_UNIVERSITIES)[number],
    );
    const bOrder = preferredOrder.get(
      b.name as (typeof LEADERBOARD_UNIVERSITIES)[number],
    );

    if (aOrder !== undefined || bOrder !== undefined) {
      return (aOrder ?? Number.MAX_SAFE_INTEGER) -
        (bOrder ?? Number.MAX_SAFE_INTEGER);
    }

    return a.name.localeCompare(b.name);
  });
}

function parseCsvRows(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];

    if (character === '"') {
      if (quoted && csv[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && csv[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value !== "" || row.length > 0) {
    row.push(value);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  }

  return rows;
}

function parseCsvLeaderboard(csv: string) {
  const [header, ...rows] = parseCsvRows(csv);
  if (!header) throw new Error("Leaderboard CSV is empty");

  const nameIndex = header.findIndex(
    (cell) => cell.trim().toLowerCase() === "university",
  );
  const signupIndex = header.findIndex(
    (cell) => cell.trim().toLowerCase() === "signups",
  );

  if (nameIndex === -1 || signupIndex === -1) {
    throw new Error("Leaderboard CSV headers are invalid");
  }

  return rows
    .map((row) => ({
      name: row[nameIndex]?.trim() ?? "",
      signups: Number(row[signupIndex]),
    }))
    .filter(isLeaderboardEntry)
    .filter((entry) => entry.name !== "" && Number.isFinite(entry.signups));
}

export async function getLeaderboardData(): Promise<LeaderboardData> {
  const dataUrl = process.env.LEADERBOARD_DATA_URL || DEFAULT_LEADERBOARD_DATA_URL;

  try {
    const response = await fetch(dataUrl, {
      next: { revalidate: 300 },
    });

    if (!response.ok) throw new Error(`Leaderboard request failed: ${response.status}`);

    const responseBody = await response.text();
    const isJson =
      response.headers.get("content-type")?.includes("application/json") ||
      responseBody.trimStart().startsWith("{");

    let updatedAt: string | null = new Date().toISOString();
    let universities: LeaderboardEntry[];

    if (isJson) {
      const data = JSON.parse(responseBody) as {
        updatedAt?: unknown;
        universities?: unknown;
      };

      if (!Array.isArray(data.universities)) {
        throw new Error("Invalid leaderboard response");
      }

      universities = data.universities.filter(isLeaderboardEntry);
      updatedAt = typeof data.updatedAt === "string" ? data.updatedAt : updatedAt;
    } else {
      universities = parseCsvLeaderboard(responseBody);
    }

    if (universities.length === 0) throw new Error("Leaderboard response is empty");

    return {
      updatedAt,
      universities: sortEntries(universities),
    };
  } catch (error) {
    console.error("Using leaderboard fallback data", error);

    return {
      updatedAt: FALLBACK_UPDATED_AT,
      universities: sortEntries(fallbackEntries),
    };
  }
}
