import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { getGameweekFixtures } from "api/fpl_api_provider";
import { Fixture, Gameweek, Player, Team } from "types";
import _ from "lodash";
import FixtureBox from "./fixture_box";
import "./fdr.css";

type BaseItem = Player | Team;

interface FdrTableProps {
  currentGameweek: Gameweek;
  type: BaseItem[];
  teams: Team[];
}

interface FdrTableState {
  nextFiveGameweekFixtures: Fixture[][];
}

export default class FdrTable extends React.Component<FdrTableProps, FdrTableState> {
  public isPlayerTable: boolean;
  public baseItem: BaseItem[];
  public nameColumnTitle: string;
  public nextFiveGameweeks: number[];

  public constructor(props: FdrTableProps) {
    super(props);

    this.isPlayerTable = "web_name" in this.props.type[0];
    this.baseItem = this.isPlayerTable
      ? (this.props.type as Player[])
      : (this.props.type as Team[]);
    this.nameColumnTitle = this.isPlayerTable ? "Player" : "Team";
    this.nextFiveGameweeks = Array(5)
      .fill(this.props.currentGameweek.id + 1)
      .map((e, i) => e + i);

    this.state = {
      nextFiveGameweekFixtures: [],
    };
  }

  public renderBaseItemName = (baseItem: BaseItem): string => {
    return "web_name" in baseItem ? baseItem.web_name : baseItem.name;
  };

  public getTeamById = (teamId: number): string | undefined => {
    const team = this.props.teams.find((t) => t.id === teamId);
    return team?.short_name;
  };

  public async fetchNextFiveGameweekFixtures(): Promise<Fixture[][]> {
    const nextFiveGameweekFixtures: Fixture[][] = [];
    // For loop must be used as async await cannot be used in a forEach loop
    // eslint-disable-next-line no-loops/no-loops
    for (const gameweek of this.nextFiveGameweeks) {
      await getGameweekFixtures(gameweek).then((fixtures) => {
        nextFiveGameweekFixtures.push(fixtures);
      });
    }
    return nextFiveGameweekFixtures;
  }

  public componentDidMount = async (): Promise<void> => {
    await this.fetchNextFiveGameweekFixtures().then((nextFiveGameweekFixtures) => {
      this.setState({ nextFiveGameweekFixtures });
    });
  };

  public getNextFiveTeamFixtures = (baseItem: BaseItem, fixtures: Fixture[][]): Fixture[][] => {
    const fixturesByTeam: Fixture[][] = [];
    fixtures.forEach((gameweek) => {
      const teamFixtures = gameweek.filter(
        (f) => f.team_h === baseItem.id || f.team_a === baseItem.id
      );
      fixturesByTeam.push([...teamFixtures]);
    });
    return fixturesByTeam;
  };

  public renderRow = (baseItem: BaseItem, index: number): JSX.Element => {
    const teamFixtures = this.getNextFiveTeamFixtures(
      baseItem,
      this.state.nextFiveGameweekFixtures
    );
    return (
      <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" key={index}>
          {this.renderBaseItemName(baseItem)}
        </TableCell>
        {_.map(teamFixtures, (fixtures, key) => (
          <FixtureBox
            fixtures={fixtures}
            baseItem={baseItem}
            isPlayerTable={this.isPlayerTable}
            key={key}
            getTeamById={this.getTeamById}
          />
        ))}
      </TableRow>
    );
  };

  public render(): JSX.Element {
    return _.isEmpty(this.state.nextFiveGameweekFixtures) ? (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ height: "100%", rowGap: "20px" }}
      >
        <Typography>Fetching fixture data..</Typography>
        <CircularProgress />
      </Box>
    ) : (
      <TableContainer component={Paper} sx={{ mt: 6 }}>
        <Table
          aria-label="fdr table"
          size="small"
          sx={{ tableLayout: "fixed", "& .MuiTableCell-root": { padding: "2px 4px" } }}
        >
          <TableHead>
            <TableRow>
              <TableCell>{this.nameColumnTitle}</TableCell>
              {this.nextFiveGameweeks.map((gameweekNumber, index) => (
                <TableCell sx={{ textAlign: "center" }} key={index}>
                  GW {gameweekNumber}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.baseItem.map((item: BaseItem, key: number) => this.renderRow(item, key))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}