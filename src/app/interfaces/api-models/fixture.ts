interface Match {
  home: string;
  away: string;
  postponed: boolean;
  date: Date | null;
  group: string | null;
}

interface Matchday {
  round: number;
  matches: Match[];
}

export interface Fixture {
  category: number;
  phase1: Matchday[];
  phase2: Matchday[];
}