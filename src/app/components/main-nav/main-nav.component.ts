import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  imports: [NgClass, RouterLink, RouterLinkActive],
  template: `
    <div class="bg-night text-light font-semibold w-full sticky top-0 z-50">
      <!-- Container -->
      <div class="flex justify-between items-center h-12">
        <!-- Left container -->
        <div class="flex min-w-24 h-full">
          <div class="bg-main flex justify-center items-center w-full h-full">
            <img src="main-logo.webp" alt="main-logo" class="bg-white rounded-full p-1 h-10 w-10">
          </div>
          <div class="
            relative right-[0.1px] w-0 h-0 border-solid
            border-t-[48px] border-r-0 border-b-0 border-l-[48px]
            border-t-transparent  border-r-transparent border-b-transparent border-l-main
          "></div>
        </div>
        <!-- Center container -->
        <nav class="hidden md:flex justify-center w-full h-full">
          @for (route of routes; track $index) {
            <a [routerLink]="route.path" routerLinkActive="text-main" class="hover:text-main outline-none">
              <div class="flex justify-center items-center h-full px-3">
                {{ route.name }}
              </div>
            </a>
          }
        </nav>
        <!-- Right container -->
        <div class="flex justify-end min-w-24 h-full pr-2">
          <button (click)="toggleMenu()" class="block md:hidden my-auto hover:text-main rounded-md p-1 outline-none duration-500 text-xl" [ngClass]="{'text-main': isMenuOpen}">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (isMenuOpen) {
        <div class="h-2 bg-main"></div>
        <nav class="flex flex-col items-center md:hidden">
          @for (route of routes; track $index) {
            <a [routerLink]="route.path" routerLinkActive="text-main" class="w-full hover:text-main" (click)="toggleMenu()">
              <div class="h-10 flex items-center justify-center">
                {{ route.name }}
              </div>
            </a>
          }
        </nav>
      }

      <div class="h-2 bg-main"></div>
    </div>
  `,
  styles: ``
})
export class MainNavComponent {
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