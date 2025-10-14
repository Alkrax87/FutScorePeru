import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLayerGroup, faMoon, faShareNodes, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fab',
  imports: [FontAwesomeModule, CommonModule],
  template: `
    <div
      class="text-2xl z-50 fixed bottom-5 right-5 w-14 h-14 text-white flex items-center justify-center cursor-pointer shadow-lg bg-crimson hover:bg-gold rounded-full focus:outline-none"
      (click)="toggleMenu()"
      [class.bg-gold]="menuOpen"
    >
      <fa-icon [icon]="Layer"></fa-icon>
    </div>

    @if (menuOpen) {
      <div class="flex fixed bottom-6 right-10 w-36 bg-brightnight p-1 rounded-l-3xl gap-2">
        <div class="flex justify-center items-center">
          <button
            class="hover:bg-none sm:hover:bg-crimson rounded-full text-white w-10 h-10 focus:outline-none"
            [ngClass]="{ 'bg-crimson': isDarkMode, 'bg-nightfall': !isDarkMode }"
            (click)="toggleDarkMode()"
          >
            <fa-icon [icon]="isDarkMode ? Light : Dark"></fa-icon>
          </button>
        </div>
        <div class="flex justify-center items-center">
          <button class="bg-nightfall hover:bg-crimson rounded-full text-white w-10 h-10 focus:outline-none" (click)="share()">
            <fa-icon [icon]="Share"></fa-icon>
          </button>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class FabComponent {
  menuOpen = false;
  isDarkMode = false;
  Layer = faLayerGroup;
  Share = faShareNodes;
  Light = faSun;
  Dark = faMoon;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
      this.applyDarkMode();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', String(this.isDarkMode));
      this.applyDarkMode();
    }
  }

  applyDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  share() {
    console.log('Compartiendo...');
  }
}