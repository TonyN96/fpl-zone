import { Position as Pos, Team } from "types";
import { Player } from "types/player";

export const GetPlayerById = (id: number, players: Player[]): Player => players.find(p => p.id === id)!;

export const getTeamById = (id: number, teams: Team[]): Team => teams.find((t) => t.id === id)!;

export const getPositionById = (id: number, positions: Pos[]): Pos => positions.find((p) => p.id === id)!;

export const getPlayerImageUrl = (player?: Player): string => {
  if (!player) {
    return `${process.env.PUBLIC_URL}/assets/images/player-placeholder.png`;
  }

  const imgId = player.photo.replace(".jpg", "");

  return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;
};

export const getTeamCrestImageUrl = (teamCode: number): string => {
  return `https://resources.premierleague.com/premierleague/badges/70/t${teamCode}.png`;
};

export const getLocalImage = (url: string): string => `${process.env.PUBLIC_URL}/assets/images/${url}`;

export const getNormalizedString = (input: string): string => (
  input
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .toUpperCase()
);

export const numberWithCommas = (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const formatDate = (date: Date): string => (
  `${date.toLocaleDateString(navigator.language, { day: "numeric", month: "short" })
  } ${
    date.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })}`
);

// Adding delay before next function call
export const delay = async (ms: number | undefined): Promise<void> => {
  await new Promise((res) => setTimeout(res, ms));
};
