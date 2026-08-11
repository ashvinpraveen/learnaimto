import type { LeaderboardEntry } from "./leaderboard";

export type LeaderboardChange = {
  rankDelta: number;
  signupDelta: number;
};

export type LeaderboardChanges = Record<string, LeaderboardChange>;

export function calculateLeaderboardChanges(
  previous: LeaderboardEntry[],
  current: LeaderboardEntry[],
): LeaderboardChanges {
  const previousByName = new Map(
    previous.map((university, index) => [
      university.name,
      { rank: index + 1, signups: university.signups },
    ]),
  );

  return Object.fromEntries(
    current.flatMap((university, index) => {
      const previousUniversity = previousByName.get(university.name);
      if (!previousUniversity) return [];

      const change = {
        rankDelta: previousUniversity.rank - (index + 1),
        signupDelta: university.signups - previousUniversity.signups,
      };

      return change.rankDelta === 0 && change.signupDelta === 0
        ? []
        : [[university.name, change]];
    }),
  );
}

