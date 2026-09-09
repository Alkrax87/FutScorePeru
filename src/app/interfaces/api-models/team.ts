export interface Team {
  teamId: string;
  category: number;
  groupPhase1: string;
  groupPhase2: string;
  name: string;
  abbreviation: string;
  image: string;
  imageThumbnail: string;
  background: string;
  alt: string;
  location: string;
  stadium: string;
  color: {
    c1: string;
    c2?: string;
  };
}