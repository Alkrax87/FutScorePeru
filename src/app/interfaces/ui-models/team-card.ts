export interface TeamCard {
  category: number;
  teamId: string;
  name: string;
  abbreviation: string;
  image: string;
  alt: string;
  color: {
    c1: string;
    c2?: string;
  };
  stadium: {
    name: string;
    capacity: string;
    location: string;
  };
}