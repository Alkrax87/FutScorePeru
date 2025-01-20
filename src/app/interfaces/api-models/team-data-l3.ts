export interface TeamDataL3 {
  category: string;
  group: string;
  teamId: string;
  name: string;
  abbreviation: string;
  image: string;
  imageThumbnail: string;
  alt: string;
  url: string;
  location: string;
  color: {
    c1: string;
    c2?: string;
  };
  stadium: {
    url: string;
  };
  manager: {
    url: string;
  };
  lastgames: {
    url: string;
  };
  performance: {
    url: string;
  };
  results: {
    url: string;
  };
}
