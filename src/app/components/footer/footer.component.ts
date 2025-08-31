import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeather } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule , RouterLink, RouterLinkActive],
  template: `
    <footer class="bg-night select-none pt-12 border-t-crimson border-t-4">
      <div class="flex flex-col items-center gap-6">
        <h2 class="text-white font-bold text-3xl">FutScorePerú</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 xl:gap-32 px-10 sm:px-24 md:px-12 w-full md:w-full lg:w-5/6 xl:w-3/4">
          <!-- 1 -->
          <div class="col-span-1 sm:col-span-2 md:col-span-1 grid-cols-1">
            <p class="text-white text-lg font-semibold text-center md:text-start"><fa-icon class="text-white mr-3" [icon]='Feather'></fa-icon> CONTENIDO</p>
            <div class="h-1 my-1 md:my-3 w-full bg-crimson rounded-full"></div>
            <p class="text-center md:text-justify text-gray-200">
              Desde la pasión de la Liga 1 hasta la emoción de la Copa Perú, seguimos cada gol que hace vibrar a los hinchas de todo el país, llevando la alegría del fútbol a cada rincón.
            </p>
          </div>
          <!-- 2 -->
          <div class=" md:col-span-1 grid-cols-1 text-center">
            <p class="text-white text-lg font-semibold">WEB</p>
            <div class="h-1 my-1 md:my-3 w-full bg-crimson rounded-full"></div>
            <div class="flex flex-col gap-2 text-neutral-200">
              @for (item of routesWeb; track $index) {
                <a [routerLink]="item.path" routerLinkActive="text-crimson" class="hover:text-crimson">{{ item.name }}</a>
              }
            </div>
          </div>
          <!-- 3 -->
          <div class=" md:col-span-1 grid-cols-1 text-center">
            <p class="text-white text-lg font-semibold">Ligas</p>
            <div class="h-1 my-1 md:my-3 w-full bg-crimson rounded-full"></div>
            <div class="flex flex-col gap-2 text-neutral-200">
              @for (item of routesLigas; track $index) {
                <a [routerLink]="item.path" routerLinkActive="text-crimson" class="hover:text-crimson">{{ item.name }}</a>
              }
            </div>
          </div>
        </div>
      </div>
      <div class="w-full py-2 text-white text-center bg-crimson font-semibold mt-12">
        <a href="https://www.mavp_projects.com">&copy; 2025 MAVP Projects</a>
      </div>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  Feather = faFeather;

  routesWeb = [
    { path: 'main/home', name: 'Home' },
    { path: 'main/about', name: 'Acerca de' },
    { path: 'main/social', name: 'Social' },
  ];

  routesLigas = [
    { path: 'liga1', name: 'Liga 1' },
    { path: 'liga2', name: 'Liga 2' },
    { path: 'liga3', name: 'Liga 3' },
    { path: 'copa-peru', name: 'Copa Perú' },
  ];
}