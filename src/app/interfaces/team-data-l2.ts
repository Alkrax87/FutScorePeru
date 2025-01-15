export interface TeamDataL2 {
  _id: string;
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
    c2: string;
    c3?: string;
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
