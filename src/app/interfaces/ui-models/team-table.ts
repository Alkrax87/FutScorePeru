export interface TeamTable {
  category: number;
  teamId: string;
  name: string;
  abbreviation: string;
  imageThumbnail: string;
  alt: string;
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