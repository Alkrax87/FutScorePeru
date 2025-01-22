import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ManagerCardComponent } from '../manager-card/manager-card.component';
import { ManagerCard } from '../../interfaces/ui-models/manager-card';

@Component({
  selector: 'app-manager-carousel',
  imports: [CommonModule, ManagerCardComponent],
  templateUrl: './manager-carousel.component.html',
  styleUrl: './manager-carousel.component.css',
})
export class ManagerCarouselComponent {
  data: ManagerCard[] = [
    {
      src: 'https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg',
      alt: 'Manager-Image',
      name: 'Nombre Ejemplo  correa',
      country: 'assets/svg/flags/pe.svg',
      isActive: true,
    },
    {
      src: 'https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg',
      alt: 'Manager-Image',
      name: 'Nombre Ejemplo',
      country: 'assets/svg/flags/pe.svg',
      isActive: false,
    },
    {
      src: 'https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg',
      alt: 'Manager-Image',
      name: 'Nombre Ejemplo',
      country: 'assets/svg/flags/pe.svg',
      isActive: false,
    },
    {
      src: 'https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg',
      alt: 'Manager-Image',
      name: 'Nombre Ejemplo',
      country: 'assets/svg/flags/pe.svg',
      isActive: false,
    },
    {
      src: 'https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg',
      alt: 'Manager-Image',
      name: 'Nombre Ejemplo',
      country: 'assets/svg/flags/pe.svg',
      isActive: false,
    },
    {
      src: 'https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg',
      alt: 'Manager-Image',
      name: 'Nombre Ejemplo',
      country: 'assets/svg/flags/pe.svg',
      isActive: false,
    },
  ];

  currentIndex: number = 0;

  prev() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.data.length - 1;
  }

  next() {
    this.currentIndex = this.currentIndex < this.data.length - 1 ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
