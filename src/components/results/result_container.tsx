import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { Fixture } from "types";

import { Result } from "./result";

interface ResultContainerProps {
  fixture: Fixture;
  onFixtureClick: (fixture: Fixture) => void;
}

export const ResultContainer = ({ fixture, onFixtureClick }: ResultContainerProps): JSX.Element => {
  const { teams } = useContext(AppDataContext);
  const theme = useTheme();

  const homeTeam = getTeamById(fixture.team_h, teams);
  const awayTeam = getTeamById(fixture.team_a, teams);

  const homeScore = fixture.team_h_score || 0;
  const awayScore = fixture.team_a_score || 0;

  const kickOff = new Date(fixture.kickoff_time || "");
  const matchStarted = kickOff < new Date();

  const onClick = matchStarted ? (): void => onFixtureClick(fixture) : undefined;
  const style = {
    height: "4rem",
    "&:last-child": { border: "none" },
    "&:hover": {
      bgcolor: matchStarted ? theme.palette.highlight.main : "inherit",
      cursor: matchStarted ? "pointer" : "default"
    }
  };

  return (
    <Box
      borderBottom='1px solid rgb(224, 224, 224)'
      className='flex-center'
      data-testid={`result-${fixture.id}`}
      onClick={onClick}
      p={1}
      sx={style}
    >
      <Result
        awayScore={awayScore}
        awayTeam={awayTeam}
        homeScore={homeScore}
        homeTeam={homeTeam}
        kickOff={kickOff}
      />
    </Box>
  );
};
