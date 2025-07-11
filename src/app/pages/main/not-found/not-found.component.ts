import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnComponent } from '../../../components/btn/btn.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, BtnComponent],
  template: `
    <div class="flex py-0  md:py-28 items-center justify-center bg-gray-100 dark:bg-nightfall duration-500">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-5xl">
        <div class="relative">
          <img src="assets/svg/404.svg" alt="404-image"/>
        </div>
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-5xl font-bold text-crimson m-4">¡Falta en ataque!</h1>
          <p class="text-lg text-night dark:text-white duration-500">Parece que esta página fue expulsada por el árbitro.</p>
          <p class="text-base text-gray-500 dark:text-gray-400 duration-500">No te preocupes, puedes volver al inicio para seguir el partido.</p>
          <div class="w-full py-5">
            <a routerLink="/main">
              <app-btn [active]="true">Volver al Inicio</app-btn>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 dark:bg-nightfall duration-500">
      <img src="assets/svg/wave.svg" alt="wave-image"/>
    </div>
  `,
  styles: ``,
})
export class NotFoundComponent {}
