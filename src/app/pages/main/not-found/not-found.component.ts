import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnComponent } from '../../../components/btn/btn.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, BtnComponent],
  template: `
    <div class="flex py-28 items-center justify-center bg-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-5xl">
        <div class="relative">
          <img src="assets/svg/404.svg" alt="404-image"/>
        </div>
        <div class="flex flex-col justify-center items-start space-y-4">
          <h1 class="text-5xl font-bold text-crimson">¡Falta en ataque!</h1>
          <p class="text-lg text-night">Parece que esta página fue expulsada por el árbitro.</p>
          <p class="text-sm text-gray-500">No te preocupes, puedes volver al inicio para seguir el partido.</p>
          <div class="flex w-full justify-center md:justify-start">
            <a routerLink="/home" class="rounded-full">
              <app-btn>Volver al Inicio</app-btn>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100">
      <img src="assets/svg/wave.svg" alt="wave-image"/>
    </div>
  `,
  styles: ``,
})
export class NotFoundComponent {}
