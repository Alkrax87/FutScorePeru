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
    color: {
      c1: string;
      c2: string;
    };
  };
  teamDetailsData: {
    description: string;
    founded: number;
    website: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
      youtube: string;
      tiktok: string;
    };
  };
  stadiumData: {
    name: string;
    capacity: number;
    location: string;
    image: string;
  },
  teamFixtureData: {
    phase1: {
      round: number;
      home: string;
      away: string;
      postponed: boolean;
      date: Date | null;
      isRest: boolean;
    }[];
    phase2: {
      round: number;
      home: string;
      away: string;
      postponed: boolean;
      date: Date | null;
      isRest: boolean;
    }[];
  };
  teamOverviewData: {
    nextMatch: {
      round: number;
      home: string;
      away: string;
      postponed: boolean;
      date: Date | null;
      isRest: boolean;
    },
    latest: {
      phase1: {
        round: number;
        home: string;
        away: string;
        postponed: boolean;
        date: Date | null;
        isRest: boolean;
      }[];
      phase2: {
        round: number;
        home: string;
        away: string;
        postponed: boolean;
        date: Date | null;
        isRest: boolean;
      }[];
    },
    standings: {
      teamId: string;
      points: number;
      played: number;
      w: number;
      d: number;
      l: number;
      gf: number;
      ga: number;
      gd: number;
      rank: number;
    }[];
  }
}