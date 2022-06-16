import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Player as PlayerType } from "types";

import Player from "components/player/player";

import "@testing-library/jest-dom/extend-expect";

import { mockPlayers } from "../../test/test_data";

describe("Player Tests", () => {
  let mockPlayer: PlayerType;
  let mockMultiplier: number;
  let mockIsCaptain: boolean;
  let mockIsViceCaptain: boolean;

  const mockHandlePlayerPerformanceClick = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <Player
        compressed={false}
        handlePlayerPerformanceClick={mockHandlePlayerPerformanceClick}
        isCaptain={mockIsCaptain}
        isViceCaptain={mockIsViceCaptain}
        multiplier={mockMultiplier}
        player={mockPlayer}
      />
    );
  };

  beforeEach(() => {
    [mockPlayer] = mockPlayers;
    mockMultiplier = 1;
    mockIsCaptain = false;
    mockIsViceCaptain = false;
  });

  afterEach(cleanup);


  it("Renders player name as expected", () => {
    render(createComponent());

    const playerNameText = screen.getByTestId("player-name");
    expect(playerNameText).toHaveTextContent(mockPlayer.web_name);
  });

  it("Renders player score as expected", () => {
    render(createComponent());

    const playerScoreText = screen.getByTestId("player-score");
    expect(playerScoreText).toHaveTextContent(mockPlayer.event_points.toString());
  });

  it("Renders player kit image as expected", () => {
    render(createComponent());

    const kitImageContainer = screen.getByTestId("kit-img-container") as HTMLImageElement;
    const url = `${process.env.PUBLIC_URL}/assets/images/kits/${mockPlayer.team_code}.png`;
    expect(kitImageContainer).toHaveStyle(`background-image: url(${url})`);
  });

  it("Multipler works as expected", () => {
    mockMultiplier = 2;

    render(createComponent());

    const playerScoreText = screen.getByTestId("player-score");
    const multipliedScore = mockPlayer.event_points * mockMultiplier;

    expect(playerScoreText).toHaveTextContent(multipliedScore.toString());
  });

  describe("Renders armband as expected", () => {
    it("Renders no armband if player is neither captain or vice", () => {
      render(createComponent());

      expect(screen.queryByTestId("armband-container")).toBeNull();
    });

    it("Renders captain armband if player captain", () => {
      mockIsCaptain = true;

      render(createComponent());

      expect(screen.getByTestId("armband-container")).toHaveTextContent("C");
    });

    it("Renders vice captain armband if player vice captain", () => {
      mockIsViceCaptain = true;

      render(createComponent());

      expect(screen.getByTestId("armband-container")).toHaveTextContent("V");
    });
  });
});
