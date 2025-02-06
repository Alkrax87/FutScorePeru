import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleHalfStroke, faLayerGroup, faShareNodes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fab',
  imports: [FontAwesomeModule, CommonModule],
  template: `
    <div
      class="text-2xl z-50 fixed bottom-5 right-5 w-14 h-14 text-white flex items-center justify-center cursor-pointer shadow-lg bg-crimson hover:bg-gold rounded-full"
      (click)="toggleMenu()"
      [class.bg-gold]="menuOpen"
    >
      <fa-icon [icon]="Layer"></fa-icon>
    </div>

    @if (menuOpen) {
      <div class="flex fixed bottom-6 right-10 w-36 bg-brightnight p-1 rounded-l-3xl gap-2" >
        <div class="flex justify-center items-center transform duration-300">
          <button class="bg-nightfall hover:bg-brightnight hover:text-lg rounded-full text-white w-10 h-10" (click)="toggleDarkMode()">
            <fa-icon [icon]="Dark"></fa-icon>
          </button>
        </div>
        <div class="flex justify-center items-center transform duration-300">
          <button class="bg-nightfall hover:bg-brightnight hover:text-lg rounded-full text-white w-10 h-10" (click)="share()">
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
  Layer = faLayerGroup;
  Share = faShareNodes;
  Dark = faCircleHalfStroke;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDarkMode() {
    console.log('Modo oscuro activado');
  }

  share() {
    console.log('Compartiendo...');
  }
}
