export interface StatisticsData {
  bestDefense: { teamId: string; gc: number }[];
  worstDefense: { teamId: string; gc: number }[];
  mostGoals: { teamId: string; gf: number }[];
  fewestGoals: { teamId: string; gf: number }[];
  mostWins: { teamId: string; pg: number }[];
  mostDraws: { teamId: string; pe: number }[];
  mostLosses: { teamId: string; pp: number }[];
  bestGoalDifference: { teamId: string; dg: number }[];
  worstGoalDifference: { teamId: string; dg: number }[];
}
