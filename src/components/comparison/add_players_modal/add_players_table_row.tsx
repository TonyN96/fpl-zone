import React, { useContext } from "react";
import { Box,TableCell, TableRow, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getPositionById, getTeamById } from "helpers";
import { AppData, Player } from "types";

import { ControlledCheckbox } from "components/utils";

import { MAX_PLAYER_COUNT } from "../player_comparison";

interface AddPlayersTableRowProps {
  tempSelectedPlayers: Player[];
  onPlayerToggle: (player: Player, value: boolean) => void;
  player: Player;
  key: number;
}

export const AddPlayersTableRow = ({
  tempSelectedPlayers,
  onPlayerToggle,
  player,
  key
}: AddPlayersTableRowProps): JSX.Element => {
  const { positions, teams } = useContext(AppDataContext) as AppData;

  const team = getTeamById(player.team, teams);
  const position = getPositionById(player.element_type, positions);
  const checkedValue = tempSelectedPlayers.includes(player);
  const checkboxDisabled = tempSelectedPlayers.length >= MAX_PLAYER_COUNT;

  return (
    <TableRow data-testid={`player-table-row-${player.id}`} key={key}>
      <TableCell data-testid={`checkbox-table-cell-${player.id}`}>
        <ControlledCheckbox
          checkedValue={checkedValue}
          isDisabled={checkboxDisabled}
          onPlayerSelect={(value: boolean): void => onPlayerToggle(player, value)}
        />
      </TableCell>
      <TableCell data-testid={`player-name-table-cell-${player.id}`}>
        <Typography>{player.first_name} {player.second_name}</Typography>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <img
            alt='team-crest'
            data-testid={`player-team-crest-${player.id}`}
            height='25vh'
            src={`${process.env.PUBLIC_URL}/assets/images/crests/${team.code}.png`}
            width='auto'
          />
          <Typography
            data-testid={`player-team-name-${player.id}`}
            display='inline'
          >
            {team.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography
          data-testid={`player-position-text-${player.id}`}
        >
          {position.singular_name_short}
        </Typography>
      </TableCell>
    </TableRow>
  );
};