export interface LeagueInformation {
  image: string;
  alt: string;
  location: string;
  teams: {
    name: string;
    abbreviation: string;
    image: string;
  }[];
  information: {
    topWinner: {
      name: string;
      image: string;
      province: string;
      winner: number;
    };
    foundation: number;
    leagues: string[];
    allTimeWinners: {
      year: number;
      name: string;
      image?: string;
      province: string;
    }[];
  };
}