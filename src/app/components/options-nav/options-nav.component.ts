import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-options-nav',
  imports: [RouterModule, FontAwesomeModule, FontAwesomeModule],
  template: `
    <!-- Desktop Menu -->
    <div class="hidden md:block">
      <div class="bg-gray-100 w-full flex">
        <div class="flex mx-auto">
          @for (item of options; track $index) {
            <a [routerLink]="item.route" class="sm:w-32 md:w-40 lg:w-60 justify-items-center group relative inline-block px-4 py-4">
              <span routerLinkActive="scale-y-100" class="absolute bottom-0 left-0 w-full h-1.5 bg-gold scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
              <div class="flex text-neutral-600">
                <fa-icon class="items-center" [icon]="item.icon"></fa-icon>
                <span class="ml-1">{{ item.name }}</span>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div class="block md:hidden">
      <div class="bg-gray-100 w-full">
        <button (click)="toggleMenu()" class="w-full bg-gray-100 py-2 border-b-4 border-b-gold">
          {{ division }}
          <fa-icon class="ml-2" [icon]="Arrow"></fa-icon>
        </button>

        <!-- Menú desplegable en móviles -->
        @if (isMenuOpen) {
          <div class="flex flex-col bg-gray-100 w-full border-b-4 border-b-gold">
            @for (item of options; track $index) {
              <a [routerLink]="item.route" class="text-center py-2 text-neutral-600" (click)="toggleMenu()">
                <fa-icon class="mr-2" [icon]="item.icon"></fa-icon>
                {{ item.name }}
              </a>
            }
          </div>
        }
    </div>
  `,
  styles: ``,
})
export class OptionsNavComponent {
  isMenuOpen = false;
  @Input() options: { name: string; route: string; icon: any }[] = [];
  @Input() division!: string;
  Arrow = faCaretDown;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
