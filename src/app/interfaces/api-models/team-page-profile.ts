export interface TeamPageProfile {
  teamData: {
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
    stadium: number;
    color: {
      c1: string;
      c2: string;
    };
  };
  teamDetailsData: {
    category: string;
    description: string;
    founded: number;
    website?: string;
    social: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
      tiktok?: string;
    };
  };
}