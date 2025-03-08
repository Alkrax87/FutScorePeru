import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ManagerCardComponent } from '../manager-card/manager-card.component';
import { ManagerCard } from '../../interfaces/ui-models/manager-card';

@Component({
  selector: 'app-manager-carousel',
  imports: [CommonModule, ManagerCardComponent],
  template: `
    <div class="relative w-full max-w-3xl mx-auto overflow-hidden select-none">
      <div class="flex transition-transform duration-500" [style.transform]="'translateX(-' + currentIndex * 100 + '%)'">
        @for (item of data; track $index) {
          @if ($index === 0) {
            <app-manager-card class="min-w-full" [data]="item" [isActive]="true"></app-manager-card>
          } @else {
            <app-manager-card class="min-w-full" [data]="item" [isActive]="false"></app-manager-card>
          }
        }
      </div>
      @if (size > 1) {
        <button (click)="prev()" class="hidden md:block absolute w-12 h-12 left-0 top-1/2 transform -translate-y-10 bg-brightnight text-white rounded-full hover:bg-crimson">
          &#10094;
        </button>
        <button (click)="next()" class="hidden md:block absolute w-12 h-12 right-0 top-1/2 transform -translate-y-10 bg-brightnight text-white rounded-full hover:bg-crimson">
          &#10095;
        </button>

        <div class="flex justify-center items-center space-x-2 h-8">
          @for (item of data; track $index) {
            <span (click)="goToSlide($index)" [ngClass]="currentIndex === $index ? 'bg-crimson' : 'bg-gray-300'"class="w-3 h-3 rounded-full cursor-pointer hover:bg-crimson"></span>
          }
        </div>
      }
    </div>
  `,
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
