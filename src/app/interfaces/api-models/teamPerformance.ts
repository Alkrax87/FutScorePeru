interface TeamPerformanceStats {
  points: number;
  played: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  sanction: number;
}

export interface TeamPerformance {
  teamId: string;
  phase1: TeamPerformanceStats & {
    rp?: number;
  };
  phase2: TeamPerformanceStats & {
    addition: number;
  };
  overall: TeamPerformanceStats & {
    addition: number;
  };
}