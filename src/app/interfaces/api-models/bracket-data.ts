export interface BracketData {
  matchKey: string;
  teamA: {
    teamId: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penalties: number | null;
    };
  },
  teamB: {
    teamId: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penalties: number | null;
    };
  }
}