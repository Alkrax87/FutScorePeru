export interface MatchCard {
  keyIndex: string;
  teams: {
    name: string;
    image: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penalties: number | null;
    };
  }[];
}