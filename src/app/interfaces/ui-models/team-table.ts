export interface TeamTable {
  name: string;
  abbreviation: string;
  image: string;
  alt: string;
  url: string;
  lastgames: string[];
  performance: {
    points: number;
    pj: number;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    dg: number;
  };
}
