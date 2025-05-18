export interface ManagerCarousel {
  category: number,
  teamId: string,
  name: string;
  image: string;
  alt: string;
  manager: {
    name: string;
    cod: string;
    photo: string;
  }[];
}