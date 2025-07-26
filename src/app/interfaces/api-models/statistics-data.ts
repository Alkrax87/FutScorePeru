export interface StatisticsData {
  bestDefense: { teamId: string; ga: number }[];
  worstDefense: { teamId: string; ga: number }[];
  mostGoals: { teamId: string; gf: number }[];
  fewestGoals: { teamId: string; gf: number }[];
  mostWins: { teamId: string; w: number }[];
  mostDraws: { teamId: string; d: number }[];
  mostLosses: { teamId: string; l: number }[];
  bestGoalDifference: { teamId: string; gd: number }[];
  worstGoalDifference: { teamId: string; gd: number }[];
}
