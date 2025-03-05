export interface DivisionData {
  category: string;
  name: string;
  sup: string;
  season: number;
  teams: number;
  image: string;
  stages: { name: string; inGame: number; status: boolean }[];
}