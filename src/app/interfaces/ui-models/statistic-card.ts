export interface StatisticCard {
  category: number;
  teamId: string;
  name: string;
  image: string;
  imageThumbnail: string;
  alt: string;
  value: number;
}
export type StatisticData = { teamId: string } & Partial<Record<'w' | 'd' | 'l' | 'ga' | 'gf' | 'gd', number>>;