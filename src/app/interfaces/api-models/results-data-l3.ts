export interface ResultsDataL3 {
  teamId: string;
  regular: { game: number; score: number | null }[];
  final: { game: number; score: number | null }[];
}
