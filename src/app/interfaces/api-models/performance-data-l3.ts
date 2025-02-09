export interface PerformanceDataL3 {
  teamId: string;
  regular: {
    points: number;
    pj: number;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    dg: number;
    sanction: number | null;
  };
  final: {
    points: number;
    pj: number;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    dg: number;
    sanction: number | null;
  };
}
