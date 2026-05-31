export interface TeamPageProfile {
  teamData: {
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
  stadiumData: {
    name: string;
    capacity: number;
    location: string;
    image: string;
  },
  teamFixtureData: {
    round: number;
    home: string;
    away: string;
    postponed: boolean;
    date: Date | null;
  }[];
  teamOverviewData: {
    nextMatch: {
      round: number;
      home: string;
      away: string;
      postponed: boolean;
      date: Date | null;
    },
    latest: {
      phase1: {
        round: number;
        home: string;
        away: string;
        postponed: boolean;
        date: Date | null;
      }[];
      phase2: {
        round: number;
        home: string;
        away: string;
        postponed: boolean;
        date: Date | null;
      }[];
    }
  }
}