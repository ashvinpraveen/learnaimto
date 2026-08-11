import { describe, expect, it } from "vitest";
import { calculateLeaderboardChanges } from "./leaderboardChanges";

describe("calculateLeaderboardChanges", () => {
  it("reports rank movement and signup gains", () => {
    const previous = [
      { name: "Alpha University", signups: 4 },
      { name: "Beta University", signups: 3 },
    ];
    const current = [
      { name: "Beta University", signups: 5 },
      { name: "Alpha University", signups: 4 },
    ];

    expect(calculateLeaderboardChanges(previous, current)).toEqual({
      "Beta University": { rankDelta: 1, signupDelta: 2 },
      "Alpha University": { rankDelta: -1, signupDelta: 0 },
    });
  });

  it("omits unchanged and newly introduced universities", () => {
    const previous = [{ name: "Alpha University", signups: 4 }];
    const current = [
      { name: "Alpha University", signups: 4 },
      { name: "New University", signups: 1 },
    ];

    expect(calculateLeaderboardChanges(previous, current)).toEqual({});
  });
});

