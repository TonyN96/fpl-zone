import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { mockAppData, mockFixtures, mockPlayers, mockTeams } from "test/test_data";
import { Fixture as FixtureType, Player, Team } from "types";

import { fdrColours } from "components/fdr/difficulty_legend";
import { BaseItem } from "components/fdr/fdr";

import "@testing-library/jest-dom/extend-expect";

import { Fixture } from "./fixture";

describe("Fixture Tests", () => {
  let mockFixturesProp: FixtureType[];
  let mockBaseItem: BaseItem;
  let mockIsPlayerTable: boolean;

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <Fixture
          baseItem={mockBaseItem}
          fixtures={mockFixturesProp}
          isPlayerTable={mockIsPlayerTable}
        />
      </AppDataContext.Provider>
    );
  };

  const testTextValue = (fixture: FixtureType, teamId: number): void => {
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const oppositionAbbreviation = getTeamById(oppositionId, mockTeams)!.short_name;

    const fixtureContainer = screen.getByTestId("fixture-container");
    const homeOrAwayText = isHome ? "(H)" : "(A)";

    expect(fixtureContainer).toHaveTextContent(`${oppositionAbbreviation} ${homeOrAwayText}`);
  };

  const testContainerBackground = (fixture: FixtureType, teamId: number): void => {
    const isHome = fixture.team_h === teamId;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const difficultyColour = fdrColours[difficulty];
    const singleFixtureBox = screen.getByTestId(`fixture-container-bg-${fixture.id}`);

    expect(singleFixtureBox).toHaveStyle(`background-color: ${difficultyColour}`);
  };

  it("Player FDR displays correctly", () => {
    mockBaseItem = mockPlayers[0];
    mockFixturesProp = mockFixtures.slice(0, 2);
    mockIsPlayerTable = true;

    render(createComponent());

    const teamId = (mockBaseItem as Player).team;

    mockFixturesProp.forEach((fixture) => {
      testTextValue(fixture, teamId);
      testContainerBackground(fixture, teamId);
    });
  });

  it("Team FDR displays correctly", () => {
    mockBaseItem = mockTeams[0];
    mockFixturesProp = mockFixtures.slice(0, 2);
    mockIsPlayerTable = false;

    render(createComponent());

    const teamId = (mockBaseItem as Team).id;

    mockFixturesProp.forEach((fixture) => {
      testTextValue(fixture, teamId);
      testContainerBackground(fixture, teamId);
    });
  });
});