// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LeaderboardRows from "./LeaderboardRows";

const STORAGE_KEY = "aimto-leaderboard-snapshot-v3";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("LeaderboardRows", () => {
  it("shows up and down placement markers after a rank swap", async () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        universities: [
          { name: "Alpha University", signups: 4 },
          { name: "Beta University", signups: 3 },
        ],
        changes: {},
      }),
    );

    render(
      <LeaderboardRows
        universities={[
          { name: "Beta University", signups: 5 },
          { name: "Alpha University", signups: 4 },
        ]}
      />,
    );

    expect(
      await screen.findByLabelText(
        "Rank 1, up 1 place since the previous placement change",
      ),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(
        "Rank 2, down 1 place since the previous placement change",
      ),
    ).toBeTruthy();
  });
});

