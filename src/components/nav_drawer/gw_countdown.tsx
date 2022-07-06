import React, { useContext } from "react";
import Countdown from "react-countdown";
import { Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { AppData } from "types";
import { Gameweek } from "types/gameweek";

export const GameweekCountdown = (): JSX.Element => {
  const { gameweeks } = useContext(AppDataContext) as AppData;

  const nextGameweek: Gameweek | undefined = gameweeks.find((gw) => {
    return gw.is_next;
  });

  if (!nextGameweek) return <></>;

  const deadline = nextGameweek.deadline_time;

  interface CountdownRenderProps {
    days: number;
    hours: number;
    minutes: number;
    completed: boolean;
  }

  const renderer = ({ days, hours, minutes, completed }: CountdownRenderProps): JSX.Element => {
    const gameweekName = nextGameweek.name.toUpperCase();
    const daysLabel = days ? `${days} day${days > 1 ? "s" : ""}` : "";
    const hoursLabel = hours ? `${hours} hr${hours > 1 ? "s" : ""}` : "";
    const minsLabel = minutes ? `${minutes} min${minutes > 1 ? "s" : ""}` : "";
    const countdown = [daysLabel, hoursLabel, minsLabel].join(" ");
    if (completed) {
      return (
        <Typography
          className='text-ellipsis'
          p={1}
          textAlign='center'
          variant='h4'
          width='100%'
        >
          {gameweekName.toUpperCase()}
          <br />
          IN PROGRESS
        </Typography>
      );
    }

    return (
      <Typography
        className='text-ellipsis'
        p={1}
        textAlign='center'
        variant='h5'
        width='100%'
      >
        {gameweekName} DEADLINE:
        <br />
        {countdown.toUpperCase()}
      </Typography>
    );

  };

  return (
    <Countdown date={deadline} renderer={renderer} />
  );
};
