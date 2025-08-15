export interface DivisionData {
  divisionId: number;
  sup: string;
  name: string;
  image: string;
  season: number;
  teams: number;
  firstPhase: {
    name: string;
    inGame: number;
    status: boolean;
  },
  secondPhase: {
    name: string;
    inGame: number;
    status: boolean;
  },
  thirdPhase: {
    name: string;
    status: boolean;
  },
  brackets: {
    bracket32: string;
    bracket16: string;
    bracket8: string;
    bracket4: string;
    bracket2: string;
    bracket1: string;
    bracketExtra: string;
  }
}