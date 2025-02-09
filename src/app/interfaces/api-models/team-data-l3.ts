export interface TeamDataL3 {
  teamId: string;
  group: string;
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
