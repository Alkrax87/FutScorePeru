import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from "@fortawesome/angular-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-section-subnav',
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  template: `
    <!-- Desktop Menu -->
    <div class="hidden md:block select-none sticky top-12 z-40">
      <div class="bg-crimson h-2"></div>
      <div class="bg-crimson flex justify-center">
        <div class="bg-gray-100 dark:bg-night duration-500 flex justify-center md:w-11/12 lg:w-5/6 xl:w-2/3 rounded-full">
          @for (route of routes; track $index) {
            <a [routerLink]="route.route" class="w-32 lg:w-40 justify-items-center group relative inline-block px-4 py-3">
              <span routerLinkActive="scale-y-100" class="absolute bottom-0 left-0 w-full h-1 bg-gold scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
              <div class="text-neutral-700 dark:text-white flex gap-1 duration-500">
                <fa-icon [icon]="route.icon"></fa-icon>
                <p>{{ route.name }}</p>
              </div>
            </a>
          }
        </div>
      </div>
      <div class="bg-crimson h-2"></div>
    </div>

    <!-- Mobile Menu -->
    <div class="block md:hidden sticky top-14 z-40">
      <button (click)="toggleMenu()" class="bg-gray-100 dark:bg-dark dark:text-white w-full duration-500 py-2 border-b-gold border-b-4">
        {{ division }}
        <fa-icon [ngClass]="{'text-crimson': isMenuOpen}" [icon]="Arrow"></fa-icon>
      </button>
      <!-- Options -->
      @if (isMenuOpen) {
        <div class="flex flex-col bg-gray-100 dark:bg-dark duration-500 w-full border-b-gold border-b-4">
          @for (route of routes; track $index) {
            <a [routerLink]="route.route" class="hover:bg-neutral-200 dark:hover:bg-brightnight text-neutral-700 dark:text-neutral-200 text-center py-2 duration-500" (click)="toggleMenu()">
              <fa-icon class="mr-1" [icon]="route.icon"></fa-icon>
              {{ route.name }}
            </a>
          }
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class SectionSubnavComponent {
  isMenuOpen = false;
  @Input() routes!: { name: string; route: string; icon: IconDefinition }[];
  @Input() division!: string;
  Arrow = faCaretDown;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}