export interface DivisionData {
  category: number;
  name: string;
  sup: string;
  season: number;
  teams: number;
  image: string;
  stages: { name: string; inGame: number; status: boolean }[];
}