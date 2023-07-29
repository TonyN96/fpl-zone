import React from "react";
import { Box } from "@mui/material";
import { useGameStatus } from "hooks/use_game_status";

import { Notifier } from "components/layout";

import { useSummaryStats } from "../../hooks/use_summary_stats";

import { SummaryStat } from "./summary_stat";

export interface SummaryStatType {
  label: string;
  teamCode?: number;
  playerName?: string;
  value?: string | number;
}

export default function GameweekSummary(): JSX.Element {
  const { seasonNotStarted, gameUpdating } = useGameStatus();
  const summaryData = useSummaryStats();

  if (seasonNotStarted) {
    return <Notifier message='This data will be available once the season has started.' type='warning' />;
  }

  if (gameUpdating) {
    return <Notifier message='Game is updating..' type='warning' />;
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-between'
      p={4}
    >
      {summaryData.map((stat, key): JSX.Element => <SummaryStat key={key} stat={stat} />)}
    </Box>
  );
}
