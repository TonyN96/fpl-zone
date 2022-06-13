import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { mockAppData, mockPlayers, mockTeams } from "test/test_data";
import { Player } from "types";

import "@testing-library/jest-dom/extend-expect";

import { TeamNameTableRow } from ".";

describe("Team name table row tests", () => {
  let players: Player[];

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <TeamNameTableRow
          players={players}
          teams={mockTeams}
        />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    players = mockPlayers.slice(0, 4);

    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Player's team name displayed correctly", () => {
    render(createComponent());

    players.forEach((player) => {
      const row = screen.getByTestId(`team-name-row-${player.id}`);
      const team = getTeamById(player.team, mockTeams);
      expect(row).toHaveTextContent(team.name);
    });
  });

  describe("Empty table cell", () => {
    it("displayed when less than 5 five players are selected", () => {
      players = mockPlayers.slice(0, 2);

      render(createComponent());

      expect(screen.getByTestId("empty-table-cell")).toBeInTheDocument();
    });

    it("not displayed when 5 five players are selected", () => {
      players = mockPlayers.slice(0, 5);

      render(createComponent());

      expect(screen.queryByTestId("empty-table-cell")).toBeNull();
    });
  });
});
