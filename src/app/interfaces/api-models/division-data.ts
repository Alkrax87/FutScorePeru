export interface DivisionData {
  category: string;
  season: number;
  teams: number;
  stages: { name: string; inGame: number; status: boolean }[];
}
