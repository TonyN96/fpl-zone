import React, { useContext } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData, Fixture as FixtureType, Player, Team } from "types";

import { fdrColours } from "./difficulty_legend";
import { BaseItem } from "./fdr";

interface FixtureProps {
  fixtures: FixtureType[];
  baseItem: BaseItem;
  isPlayerTable: boolean;
}

interface SingleFixtureProps {
  fixture: FixtureType;
}

export const Fixture = ({
  fixtures,
  baseItem,
  isPlayerTable
}: FixtureProps): JSX.Element => {
  const SingleFixture = ({ fixture }: SingleFixtureProps): JSX.Element => {
    const { teams } = useContext(AppDataContext) as AppData;

    const teamId = isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const text = `${getTeamById(oppositionId, teams).short_name} (${isHome ? "H" : "A"})`;

    return (
      <Tooltip
        arrow
        enterDelay={500}
        placement='top'
        title={text}
      >
        <Box
          data-testid={`fixture-container-bg-${fixture.id}`}
          sx={{
            p: 0.5,
            display: "flex",
            backgroundColor: `${fdrColours[difficulty]}`,
            height: "100%",
            flexGrow: 1,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            flexBasis: 1
          }}
        >
          <Box
            sx={{
              p: 0.2,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {text}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box
      data-testid='fixture-container'
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-evenly"
      }}
    >
      {fixtures.map((fixture, key) => <SingleFixture fixture={fixture} key={key} />)}
    </Box>
  );
};
