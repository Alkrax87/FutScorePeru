import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ManagerCardComponent } from '../manager-card/manager-card.component';
import { ManagerCard } from '../../interfaces/ui-models/manager-card';

@Component({
  selector: 'app-manager-carousel',
  imports: [CommonModule, ManagerCardComponent],
  templateUrl: './manager-carousel.component.html',
  styles: ``,
})
export class ManagerCarouselComponent {
  @Input() data!: ManagerCard[];
  currentIndex: number = 0;
  size: number = 0;

  ngOnInit() {
    this.size = this.data.length;
  }

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
