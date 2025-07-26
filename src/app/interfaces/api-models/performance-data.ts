export interface PerformanceData {
  teamId: string;
  apertura?: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
  clausura?: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
  acumulado?: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
  regional?: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
  grupos?: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
  final?: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
  };
}