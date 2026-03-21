export interface TeamFixture {
  round: number;
  postponed: boolean;
  date: Date | null;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamAlt: string;
  awayTeamAlt: string;
  homeTeamScore: number;
  awayTeamScore: number;
  free: boolean;
}