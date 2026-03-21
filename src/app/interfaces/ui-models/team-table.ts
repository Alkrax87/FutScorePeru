export interface TeamTable {
  category: number;
  teamId: string;
  name: string;
  abbreviation: string;
  imageThumbnail: string;
  alt: string;
  form: string[];
  performance: {
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