export interface ResultsDataL1 {
  teamId: string;
  apertura: { game: number; score: number | null }[];
  clausura: { game: number; score: number | null }[];
}
