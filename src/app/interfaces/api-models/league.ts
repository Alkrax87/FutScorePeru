export interface League {
  leagueId: string;
  image: string;
  imageThumbnail: string;
  background: string;
  alt: string;
  location: string;
  color: {
    c1: string;
    c2: string;
  };
  teams: string[];
}