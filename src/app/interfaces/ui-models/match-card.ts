export interface MatchCard {
  matchKey: string;
  teams: {
    name: string;
    image: string;
    location: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penalties: number | null;
    };
  }[];
}