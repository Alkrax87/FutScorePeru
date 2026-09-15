export interface ManagerCard {
  name: string;
  cod: string;
  photo: string;
}

export interface ManagerCarousel {
  category: number;
  teamId: string;
  name: string;
  imageThumbnail: string;
  alt: string;
  managers: ManagerCard[];
}