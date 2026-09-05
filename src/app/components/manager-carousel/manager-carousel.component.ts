import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ManagerCardComponent } from '../manager-card/manager-card.component';
import { ManagerCard } from '../../interfaces/ui-models/manager-card';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manager-carousel',
  imports: [NgClass, ManagerCardComponent, FaIconComponent],
  template: `
    <div class="flex gap-1 w-full select-none">
      <!-- Prev -->
      @if (size > 1) {
        <button (click)="prev()" type="button" class="hidden sm:block min-w-8 w-8 bg-nightfall text-white hover:bg-crimson duration-300">
          <fa-icon [icon]="Prev"></fa-icon>
        </button>
      }
      <!-- Carousel -->
      <div class="w-full overflow-hidden relative">
        <div class="flex w-full h-full transition-transform duration-500 ease-in-out" [style.transform]="'translateX(-' + (currentIndex * 100) + '%)'">
          @for (item of data; track $index) {
            <div class="min-w-full">
              @if ($index === 0) {
                <app-manager-card [data]="item" [isActive]="true"></app-manager-card>
              } @else {
                <app-manager-card [data]="item" [isActive]="false"></app-manager-card>
              }
            </div>
          }
        </div>
      </div>
      <!-- Next -->
      @if (size > 1) {
        <button (click)="next()" type="button" class="hidden sm:block min-w-8 w-8 bg-nightfall text-white hover:bg-crimson duration-300">
          <fa-icon [icon]="Next"></fa-icon>
        </button>
      }
    </div>
    <!-- Slide Indicators -->
    @if (size > 1) {
      <div class="flex justify-center items-end gap-2 h-5">
        @for (item of data; track $index) {
          <span (click)="goToSlide($index)" [ngClass]="currentIndex === $index ? 'bg-crimson' : 'bg-gray-300'" class="w-3 h-3 rounded-full cursor-pointer hover:bg-crimson duration-300"></span>
        }
      </div>
    }
  `,
  styles: ``,
})
export class ManagerCarouselComponent {
  @Input() data!: ManagerCard[];
  currentIndex: number = 0;

  Prev = faChevronLeft;
  Next = faChevronRight;

  get size(): number {
    return this.data.length || 0;
  }

  prev() {
    if (this.size === 0) return;
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.size - 1;
  }

  next() {
    if (this.size === 0) return;
    this.currentIndex = this.currentIndex < this.size - 1 ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}