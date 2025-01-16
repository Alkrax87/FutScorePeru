export interface TeamCard {
  name: string;
  abbreviation: string;
  image: string;
  alt: string;
  url: string;
  color: {
    c1: string;
    c2: string;
    c3?: string;
  };
  stadium: {
    name: string;
    capacity: string;
    location: string;
  };
}
