export interface LeagueInformation {
  title: string;
  flag: string;
  foundation: number;
  teams: {
    name: string;
    image: string;
  }[],
  topWinner: { name: string; image: string; province: string; winner: number };
  leagues: string[];
  allTimeWinners: {
    year: number;
    name: string;
    image?: string;
    province: string;
  }[];
}