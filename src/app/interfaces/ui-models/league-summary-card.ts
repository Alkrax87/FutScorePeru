export interface LeagueSummaryCard {
  teams: string;
  stages: {
    total: number;
    description: string;
  };
  objective: string;
}
