export interface ManagerCarousel {
  category: number,
  teamId: string,
  name: string;
  imageThumbnail: string;
  alt: string;
  managers: {
    name: string;
    cod: string;
    photo: string;
  }[];
}