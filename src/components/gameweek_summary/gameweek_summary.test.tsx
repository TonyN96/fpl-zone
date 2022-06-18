import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test";

import "@testing-library/jest-dom/extend-expect";

import GameweekSummary, { SummaryStatType } from "./gameweek_summary";

let mockSummaryStats: SummaryStatType[];

jest.mock("hooks/use_summary_stats", () => ({
  useSummaryStats: (): SummaryStatType[] => mockSummaryStats
}));

describe("Gameweek Summary Tests", () => {
  beforeEach(() => {
    mockSummaryStats = [
      {
        label: "highest score",
        value: "100 pts"
      },
      {
        label: "average score",
        value: "30 pts"
      },
      {
        label: "star player",
        teamCode: 30,
        playerName: "Mock Player Name",
        value: 20
      },
      {
        label: "most captained",
        teamCode: 12,
        playerName: "Mock Player Name"
      },
      {
        label: "most vice-captained",
        teamCode: 2,
        playerName: "Mock Player Name"
      },
      {
        label: "most transferred in",
        teamCode: 11,
        playerName: "Mock Player Name",
        value: 10000
      }
    ];
  });

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <GameweekSummary />
      </AppDataContext.Provider>
    );
  };

  it("Stat label displayed correctly", () => {
    render(createComponent());

    mockSummaryStats.forEach((stat) => {
      const text = screen.getByTestId(`stat-label-text-${stat.label}`);
      expect(text).toHaveTextContent(stat.label.toUpperCase());
    });
  });

  it("Stat value displayed correctly", () => {
    render(createComponent());

    const statsWithValue = mockSummaryStats.filter(stat => stat.value);

    statsWithValue.forEach((stat) => {
      const text = screen.getByTestId(`stat-value-text-${stat.label}`);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(text).toHaveTextContent(stat.value!.toString());
    });
  });

  it("Player name displayed correctly", () => {
    render(createComponent());

    const statsWithPlayerName = mockSummaryStats.filter(stat => stat.playerName);

    statsWithPlayerName.forEach((stat) => {
      const text = screen.getByTestId(`stat-value-text-${stat.label}`);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(text).toHaveTextContent(stat.playerName!.toString());
    });
  });

  it("Team crest image displayed correctly", () => {
    render(createComponent());

    const statsWithTeamCode = mockSummaryStats.filter(stat => stat.teamCode);

    statsWithTeamCode.forEach((stat) => {
      const img = screen.getByTestId(`team-crest-img-${stat.label}`);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${stat.teamCode!}.png`;

      expect(img).toHaveAttribute("src", url);
    });
  });
});
