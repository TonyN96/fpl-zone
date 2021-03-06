import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { getGameweekFixtures } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { useNextFiveTeamFixtures } from "hooks";
import { useNextFiveGameweekIds } from "hooks/use_next_five_gameweek_ids";
import { isEmpty, map } from "lodash";
import { AppData, Fixture as FixtureType, Player, Team } from "types";

import { Notifier, notifierMessageMap as msgMsg, NotifierType } from "components/layout";
import { BaseItemWithCrest } from "components/results/base_item_with_crest";

import { Fixture } from "./fixture";

// FDR can display fixtures for players or teams
export type BaseItem = Player | Team;

interface FdrTableProps {
  players?: Player[];
}

interface NextFiveTeamFixturesProps {
  item: BaseItem;
}

export default function FdrTable({ players }: FdrTableProps): JSX.Element {
  const [nextFiveGameweekFixtures, setNextFiveFixtures] = useState<FixtureType[][]>([]);
  const [notifierMessage, setNotifierMessage] = useState<string>("Fetching fixture data..");
  const [notifierType, setNotifierType] = useState<NotifierType>("loading");
  const { teams } = useContext(AppDataContext) as AppData;
  const baseItem = players || teams;
  const nextFiveGameweekIds = useNextFiveGameweekIds();

  useEffect(() => {
    const fetchNextFiveGameweekFixtures = async (): Promise<void> => {
      if (isEmpty(nextFiveGameweekIds)) {
        setNotifierMessage(msgMsg.seasonFinished);
        setNotifierType("error");

        return;
      }

      const nextFiveGameweekFixtures: FixtureType[][] = await Promise.all(
        nextFiveGameweekIds.map((gameweek) => getGameweekFixtures(gameweek))
      );

      setNextFiveFixtures(nextFiveGameweekFixtures);
    };

    fetchNextFiveGameweekFixtures();
  }, []);

  const TeamFixturesRow = ({ item }: NextFiveTeamFixturesProps): JSX.Element => {
    const teamFixtures = useNextFiveTeamFixtures(item, nextFiveGameweekFixtures);

    return (
      <TableRow
        data-testid={`fixture-row-${item.id}`}
        sx={{
          "& .MuiTableCell-root:first-of-type": { pl: 1 }
        }}
      >
        <TableCell width={baseItemCellWidth}>
          <BaseItemWithCrest item={item} />
        </TableCell>
        {map(teamFixtures, (fixtures, key) => (
          <TableCell key={key}>
            <Fixture baseItem={item} fixtures={fixtures} />
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const baseItemCellWidth = "20%";

  return isEmpty(nextFiveGameweekFixtures)
    ? (
      <Box className='flex-center' data-testid='notifier-container' height='100%'>
        <Notifier message={notifierMessage} type={notifierType} />
      </Box>
    )
    : (
      <Box
        className='flex-center'
        data-testid='fdr-container'
        flexDirection='column'
        height='100%'
        overflow='hidden'
        sx={{ "& .MuiTableContainer-root": { height: "100%" } }}
      >
        <TableContainer>
          <Table
            sx={{
              tableLayout: "fixed",
              height: "100%",
              "& .MuiTableCell-root": {
                p: 0,
                border: "0.5px solid black"
              }
            }}
          >
            <TableHead>
              <TableRow
                data-testid='table-head-column-title'
                sx={{ "& .MuiTableCell-root": { height: "5vh" } }}
              >
                <TableCell width={baseItemCellWidth} />
                {nextFiveGameweekIds.map((gameweekNumber, index) => (
                  <TableCell key={index}>
                    <Typography textAlign='center'>GW {gameweekNumber}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {baseItem.map((item: BaseItem, key: number) => <TeamFixturesRow item={item} key={key} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
}
