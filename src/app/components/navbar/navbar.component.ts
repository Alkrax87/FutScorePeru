import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-night select-none">
      <!-- Desktop Menu -->
      <div class="w-full flex justify-between items-center">
        <!-- Left container -->
        <div class="flex items-center bg-crimson min-w-28">
          <div class="rounded-full bg-white p-1 mx-2">
            <img src="main-logo.webp" alt="Logo" class="h-8 w-8">
          </div>
          <div class="border-l-[3.5rem] border-t-[3.5rem] border-l-transparent border-t-night bg-crimson"></div>
        </div>
        <!-- Center container -->
        <div class="hidden md:flex mx-auto text-gray-100">
          @for (route of routes; track $index) {
            <a [routerLink]="route.path" routerLinkActive="text-crimson" class="hover:text-crimson">
              <div class="flex justify-center items-center h-14 px-3">
                {{ route.name }}
              </div>
            </a>
          }
        </div>
        <!-- Right container -->
        <div class="hidden md:flex min-w-28"></div>
        <!-- Hamburger Menu for Mobile -->
        <button (click)="toggleMenu()" class="md:hidden text-gray-300 focus:outline-none pr-2" [ngClass]="{'text-crimson': isMenuOpen === true}">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div class="h-2 bg-crimson"></div>
      <!-- Mobile Menu -->
      @if (isMenuOpen) {
        <div class="flex flex-col items-center md:hidden">
          @for (item of routes; track $index) {
            <a [routerLink]="item.path" class="w-full text-gray-300 hover:text-crimson" (click)="toggleMenu()">
              <div routerLinkActive="text-crimson" class="h-10 flex items-center justify-center">{{ item.name }}</div>
            </a>
          }
        </div>
      }
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  routes = [
    { path: "/main" , name: "Home" },
    { path: "/liga1" , name: "Liga 1" },
    { path: "/liga2" , name: "Liga 2" },
    { path: "/liga3" , name: "Liga 3" },
    { path: "/copa-peru" , name: "Copa Perú" },
  ]

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}