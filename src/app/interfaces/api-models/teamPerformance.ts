export interface TeamPerformance {
  teamId: string;
  phase1: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
    sanction: number;
  };
  phase2: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
    sanction: number;
    addition: number;
  };
  phase3: {
    points: number;
    played: number;
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    gd: number;
    sanction: number;
    addition: number;
  };
}