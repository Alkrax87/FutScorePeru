export interface FixtureMatch {
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
  homeTeamResult: null | number;
  awayTeamResult: null | number;
  postponed: boolean;
  date: Date | null;
  group: string | null;
}

export interface FixtureByDate {
  date: Date | null;
  matches: FixtureMatch[];
}