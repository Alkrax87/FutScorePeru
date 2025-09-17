import { BracketData } from './bracket-data';

export interface BracketsData {
  bracket16?: BracketData[];
  bracket8?: BracketData[];
  bracket4?: BracketData[];
  bracket2?: BracketData[];
  bracket1?: BracketData[];
  bracketExtra?: BracketData[];
}