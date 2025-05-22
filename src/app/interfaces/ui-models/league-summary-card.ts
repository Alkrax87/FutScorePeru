export interface LeagueSummaryCard {
  teams: number;
  stages: {
    total: number;
    description: string;
  };
  objective: string;
}
