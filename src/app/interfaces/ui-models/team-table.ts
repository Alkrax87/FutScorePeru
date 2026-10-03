export interface TeamTable {
  category: number;
  teamId: string;
  name: string;
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
    rp?: number;
    sanction?: number;
    addition?: number;
  };
}

export interface PointAdjustment {
  teamName: string;
  type: 'sanction' | 'addition';
  points: number;
}