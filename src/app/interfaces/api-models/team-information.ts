export interface TeamInformation {
  division: string;
  name: string;
  abbreviation: string;
  image: string;
  alt: string;
  location: string;
  foundation: number;
  background: string;
  website?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  },
  stadium?: {
    name: string;
    capacity: number;
    location: string;
    image: string;
  },
  lastgames: {
    apertura?: string[];
    clausura?: string[];
    acumulado?: string[];
    regional?: string[];
    grupos?: string[];
    final?: string[];
  },
  performance: {
    apertura?: {
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      sanction: number;
      addition: number;
    };
    clausura?: {
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      sanction: number;
      addition: number;
    };
    regional?: {
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      sanction: number;
      addition: number;
    };
    grupos?: {
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      sanction: number;
      addition: number;
    };
    final?: {
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      sanction: number;
      addition: number;
    };
  },
  fixture: {
    apertura?: { home: string, away: string }[];
    clausura?: { home: string, away: string }[];
    acumulado?: { home: string, away: string }[];
    regional?: { home: string, away: string }[];
    grupos?: { home: string, away: string }[];
    final?: { home: string, away: string }[];
  },
}