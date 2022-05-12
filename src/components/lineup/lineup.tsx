import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { numberWithCommas } from "helpers";
import _ from "lodash";
import { AppData, Player as PlayerType, TeamData, TeamPicks } from "types";

import Player from "../player/player";

import PlayerPerformanceModal from "./player_performance_modal";

interface LineupProps {
  selected: PlayerType[][];
  bench: PlayerType[];
  compressed?: boolean;
  teamPicks?: TeamPicks;
  teamData?: TeamData;
}

export default function Lineup({
  selected,
  bench,
  teamPicks,
  teamData,
  compressed = false,
}: LineupProps): JSX.Element {
  const appData = useContext(AppDataContext) as AppData;

  const [isPlayerPerformanceModalOpen, setPlayerPerformanceModalOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);

  const sortedBench = _.sortBy(bench, ["element_type"]);
  const activeChip = teamPicks?.active_chip ? teamPicks.active_chip.toUpperCase() : "None";
  const totalPoints = teamData?.summary_event_points;

  const handlePlayerPerformanceClick = (player: PlayerType): void => {
    setPlayerPerformanceModalOpen(true);
    setSelectedPlayer(player);
  };

  const renderLineupInfo = (): JSX.Element => {
    const textStyling = {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "50%",
      textAlign: "center",
    };
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          width: "100%",
          maxWidth: "80%",
          margin: "auto",
        }}
      >
        {teamData && (
          <Typography variant="h2" textAlign="center">
            {teamData.name}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 1,
            mt: 2,
            mb: 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {teamPicks && (
            <Typography sx={textStyling} variant="h6">
              Active Chip:
              <br />
              <Typography>{activeChip}</Typography>
            </Typography>
          )}
          {teamData && (
            <Typography sx={textStyling} variant="h6">
              GW Points:
              <br />
              <Typography>{totalPoints}</Typography>
            </Typography>
          )}
          {teamData && (
            <Typography sx={textStyling} variant="h6">
              Overall Rank:
              <br />
              <Typography>{numberWithCommas(teamData.summary_overall_rank)}</Typography>
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  const renderSelected = (): JSX.Element => {
    return (
      <Box
        data-testid="first-xi-players"
        sx={{
          pl: "5%",
          pr: "5%",
          pb: "5%",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pitch.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {selected.map((positionGroup, key) => {
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              {positionGroup.map((player, key) => {
                const pick = teamPicks?.picks.find((pick) => pick.element === player.id);
                return (
                  <Player
                    player={player}
                    handlePlayerPerformanceClick={handlePlayerPerformanceClick}
                    key={key}
                    compressed={compressed}
                    isCaptain={pick?.is_captain}
                    isViceCaptain={pick?.is_vice_captain}
                    multiplier={pick?.multiplier || 1}
                  />
                );
              })}
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderBench = (): JSX.Element => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: 4,
          p: 1.5,
        }}
      >
        <Typography variant="h5">Bench</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          data-testid="bench-players"
        >
          {sortedBench.map((player, key) => {
            const pick = teamPicks?.picks.find((pick) => pick.element === player.id);
            return (
              <Player
                player={player}
                handlePlayerPerformanceClick={handlePlayerPerformanceClick}
                key={key}
                compressed={compressed}
                multiplier={pick?.multiplier || 1}
              />
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ height: "100%", p: 3, display: "flex", flexDirection: "column", rowGap: 1.5 }}>
        {!!teamData && !!teamPicks && renderLineupInfo()}
        {renderSelected()}
        {renderBench()}
      </Box>
      {selectedPlayer && (
        <PlayerPerformanceModal
          isPlayerPerformanceModalOpen={isPlayerPerformanceModalOpen}
          setPlayerPerformanceModalOpen={setPlayerPerformanceModalOpen}
          selectedPlayer={selectedPlayer}
          elementStats={appData.element_stats}
          teams={appData.teams}
        />
      )}
    </>
  );
}
