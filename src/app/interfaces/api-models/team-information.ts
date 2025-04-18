export interface TeamInformation {
  division: string;
  name: string;
  abbreviation: string;
  image: string;
  alt: string;
  location: string;
  foundation: number;
  background: string;
  website?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  },
  stadium?: {
    name: string;
    capacity: number;
    location: string;
    image: string;
  }
}