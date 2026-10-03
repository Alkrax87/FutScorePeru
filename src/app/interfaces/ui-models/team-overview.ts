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
  homeTeamScore?: number | null;
  awayTeamScore?: number | null;
  canceled?: boolean;
  date?: Date | null;
  valid: boolean;
}

export interface LatestsMatches {
  round: number;
  canceled: boolean;
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

export interface StandingsTable {
  rank: number;
  category: number;
  teamId: string;
  name: string;
  imageThumbnail: string;
  alt: string;
  performance: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
};
