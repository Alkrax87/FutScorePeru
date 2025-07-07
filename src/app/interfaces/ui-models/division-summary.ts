export interface DivisionSummary {
  teams: string;
  stages: {
    total: number;
    description: string;
  };
  objective: string;
}