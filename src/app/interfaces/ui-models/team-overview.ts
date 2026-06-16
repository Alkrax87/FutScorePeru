export interface NextMatch {
  round?: number;
  homeTeamId?: string;
  awayTeamId?: string;
  homeTeamName?: string;
  awayTeamName?: string;
  homeTeamAbbreviation?: string;
  awayTeamAbbreviation?: string;
  homeTeamImage?: string;
  awayTeamImage?: string;
  homeTeamAlt?: string;
  awayTeamAlt?: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  postponed?: boolean;
  date?: Date | null;
  valid: boolean;
}

export interface LatestsMatches {
  round: number;
  postponed: boolean;
  homeTeamLogo?: string;
  homeTeamAlt?: string;
  rivalTeamId?: string;
  rivalTeamLogo?: string;
  rivalTeamAlt?: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  home?: boolean;
  free?: boolean;
}[]