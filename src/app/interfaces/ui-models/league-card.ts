export interface LeagueCard {
  leagueId: string;
  region: string;
  flag: string;
  color: {
    c1: string;
    c2?: string;
  };
  teams: {
    name: string;
    image: string;
    city: string;
  }[];
}