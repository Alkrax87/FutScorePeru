export interface FixtureCard {
  stadium: string;
  category: number;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamAbbreviation: string;
  awayTeamAbbreviation: string;
  homeTeamImageThumbnail: string;
  awayTeamImageThumbnail: string;
  homeTeamAlt: string;
  awayTeamAlt: string;
  homeTeamResult: string | number;
  awayTeamResult: string | number;
}
