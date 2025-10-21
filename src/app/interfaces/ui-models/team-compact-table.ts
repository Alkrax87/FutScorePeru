export interface TeamCompactTable {
  category: number;
  teamId: string;
  name: string;
  abbreviation: string;
  imageThumbnail: string;
  alt: string;
  performance: {
    points: number;
    gf: number;
    gd: number;
  };
}