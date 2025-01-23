export interface ManagerCarousel {
  name: string;
  image: string;
  alt: string;
  url: string;
  manager: {
    name: string;
    cod: string;
    photo: string;
  }[];
}
