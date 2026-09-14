export interface MatchBracket {
  matchKey: string;
  nextKey: string;
  teamA: {
    teamId: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penaltyScore: number | null;
    };
  };
  teamB: {
    teamId: string;
    results: {
      firstLegScore: number | null;
      secondLegScore: number | null;
      penaltyScore: number | null;
    };
  };
}

export interface Brackets {
  category: number;
  bracket16: MatchBracket[];
  bracket8: MatchBracket[];
  bracket4: MatchBracket[];
  bracket2: MatchBracket[];
  bracket1: MatchBracket[];
  bracketExtra: MatchBracket[];
}