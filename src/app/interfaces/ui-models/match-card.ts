export interface MatchCard {
  matchKey: string;
  teams: {
    name: string;
    image: string;
    Location: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penalties: number | null;
    };
  }[];
}