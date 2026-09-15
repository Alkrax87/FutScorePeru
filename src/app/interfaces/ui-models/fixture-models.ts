export interface FixtureMatch {
  date: Date | null;
  group: string | null;
  postponed: boolean;
  home: {
    category: number;
    teamId: string;
    name: string;
    abbreviation: string;
    imageThumbnail: string;
    alt: string;
    result: number | null;
  },
  away: {
    category: number;
    teamId: string;
    name: string;
    abbreviation: string;
    imageThumbnail: string;
    alt: string;
    result: number | null;
  }
}

export interface FixtureByDate {
  date: Date | null;
  matches: FixtureMatch[];
}