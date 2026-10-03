export interface TeamFixture {
  round: number;
  canceled: boolean;
  date: Date | null;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamAlt: string;
  awayTeamAlt: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
  free: boolean;
}[];