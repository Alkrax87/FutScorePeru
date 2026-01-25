interface StatsSummary {
  mostWins: { teamId: string; w: number }[];
  mostDraws: { teamId: string; d: number }[];
  mostLosses: { teamId: string; l: number }[];
  bestDefense: { teamId: string; ga: number }[];
  worstDefense: { teamId: string; ga: number }[];
  mostGoalsFor: { teamId: string; gf: number }[];
  fewestGoalsFor: { teamId: string; gf: number }[];
  bestGoalDifference: { teamId: string; gd: number }[];
  worstGoalDifference: { teamId: string; gd: number }[];
}

export interface Statistics {
  phase1: StatsSummary;
  phase2: StatsSummary;
  overall: StatsSummary;
}