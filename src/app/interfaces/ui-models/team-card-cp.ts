export interface TeamCardCp {
  region: string;
  flag: string;
  alt: string;
  color: {
    c1: string;
    c2?: string;
  };
  teams: {
    name: string;
    image: string;
    alt: string;
    city: string;
  }[];
}