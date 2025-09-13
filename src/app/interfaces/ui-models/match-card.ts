export interface MatchCard {
  matchKey: string;
  nextKey: string;
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