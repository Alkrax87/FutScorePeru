export interface LeaguePageProfile {
  leagueData: {
    image: string;
    imageThumbnail: string;
    alt: string;
    location: string;
    color: {
      c1: string;
      c2: string;
    };
    teams: string[];
  };
  leagueDetailsData: {
    founded: number;
    topChampion: {
      name: string;
      image: string;
      province: string;
      titles: number;
    };
    provincialLeagues: string[];
    historicalChampions: {
      year: number;
      name: string;
      image: string;
      province: string;
    }[];
  };
}