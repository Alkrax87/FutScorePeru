export interface TeamDataL1 {
  teamId: string;
  name: string;
  abbreviation: string;
  image: string;
  imageThumbnail: string;
  alt: string;
  url: string;
  location: string;
  stadium: number;
  color: {
    c1: string;
    c2?: string;
  };
}
