export interface League {
  category: number;
  leagueId: string;
  image: string;
  imageThumbnail: string;
  alt: string;
  location: string;
  color: {
    c1: string;
    c2?: string;
  };
  teams: {
    teamId: string;
    name: string;
    abbreviation: string;
    image: string;
    city: string;
  }[];
}