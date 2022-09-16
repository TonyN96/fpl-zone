import React from "react";
import { Box, Typography } from "@mui/material";
import { getFormattedDate, getFormattedTime } from "helpers";
import { CustomResult, Fixture } from "types";

import { CustomModal } from "components/utils";

import { Result } from "../result";

import { MatchStat } from "./match_stat";

interface MatchDetailsModalProps {
  isResultsModalOpen: boolean;
  closeResultsModal: () => void;
  selectedResult: Fixture;
}

export default function MatchDetailsModal({
  isResultsModalOpen,
  closeResultsModal,
  selectedResult
}: MatchDetailsModalProps): JSX.Element {
  const customResult: CustomResult = {
    team_h: selectedResult.team_h,
    team_h_score: (selectedResult.team_h_score as number) || null,
    team_a: selectedResult.team_a,
    team_a_score: (selectedResult.team_a_score as number) || null,
    kickoff_time: selectedResult.kickoff_time
  };

  const kickOffTime = selectedResult.kickoff_time && (
    <Box className='flex-center' flexDirection='column'>
      <Typography>{getFormattedDate(new Date(selectedResult.kickoff_time))}</Typography>
      <Typography>{getFormattedTime(new Date(selectedResult.kickoff_time))}</Typography>
    </Box>
  );

  const statsToRender = [
    "goals_scored",
    "assists",
    "yellow_cards",
    "red_cards"
  ];

  return (
    <CustomModal
      closeModal={closeResultsModal}
      isModalOpen={isResultsModalOpen}
    >
      <Box
        className='flex-center'
        flexDirection='column'
        gap={2}
        width='100%'
      >
        {kickOffTime}
        <Result matchStarted result={customResult} />
        {statsToRender.map((stat, key) => <MatchStat key={key} selectedResult={selectedResult} statName={stat} />)}
      </Box>
    </CustomModal>
  );
}
