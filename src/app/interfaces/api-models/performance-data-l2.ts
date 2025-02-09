export interface PerformanceDataL2 {
  teamId: string;
  regional: {
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
  grupos: {
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
