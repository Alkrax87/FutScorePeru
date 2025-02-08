export interface ResultsDataL2 {
  teamId: string;
  regional: { game: number; score: number | null }[];
  grupos: { game: number; score: number | null }[];
}
