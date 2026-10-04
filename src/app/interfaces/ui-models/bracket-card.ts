export interface BracketCard {
  matchKey: string;
  nextKey: string | null;
  teams: {
    category: number | null;
    teamId: string;
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