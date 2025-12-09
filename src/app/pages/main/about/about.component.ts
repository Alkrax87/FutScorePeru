import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullseye, faHandFist, faTrophy, faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule],
  template: `
    <div class="select-none">
      <div class="bg-neutral-100 dark:bg-nightfall py-12 md:py-24 px-3 md:px-5 flex flex-col items-center duration-500">
        <div class="bg-nightfall dark:bg-brightnight duration-500 flex justify-center items-center p-2 rounded-full w-12 h-12 mb-6">
          <fa-icon class="text-crimson text-2xl" [icon]="Trophy"></fa-icon>
        </div>
        <p class="dark:text-white duration-500 text-5xl font-bold text-center">Pasión por el <span class="text-crimson">Fútbol Peruano</span></p>
        <p class="text-neutral-500 dark:text-neutral-300 duration-500 text-center mt-3 text-lg max-w-screen-md">Creemos que cada partido cuenta una historia y cada división tiene su encanto. Nuestro objetivo es dar visibilidad a todas las categorías y celebrar la rica tradición futbolística de nuestro país.</p>
        <div class="w-full md:max-w-screen-lg grid grid-cols-2 md:grid-cols-4 mt-10 gap-5 md:gap-20">
          <div class="text-center">
            <p class="text-crimson text-4xl font-bold">4</p>
            <p class="font-semibold text-gold">Divisiones</p>
          </div>
          <div class="text-center">
            <p class="text-crimson text-4xl font-bold">25</p>
            <p class="font-semibold text-gold">Departamentos</p>
          </div>
          <div class="text-center">
            <p class="text-crimson text-4xl font-bold">100+</p>
            <p class="font-semibold text-gold">Equipos</p>
          </div>
          <div class="text-center">
            <p class="text-crimson text-4xl font-bold">&infin;</p>
            <p class="font-semibold text-gold">Pasión</p>
          </div>
        </div>
      </div>
      <div class="bg-night py-12 md:py-24 px-3 md:px-5 duration-500">
        <div class="flex flex-col items-center">
          <p class="text-white text-4xl font-bold">Nuestra Misión</p>
          <div class="bg-crimson skew-x-50 h-1.5 w-72 my-2"></div>
          <p class="text-neutral-400 text-center mt-3 text-lg max-w-screen-md">Conectar a los fanáticos del fútbol peruano con información completa, actualizada y apasionada sobre todas las divisiones del balompié nacional.</p>
        </div>
        <div class="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 text-center mt-5">
          <div class="bg-nightfall flex flex-col items-center p-5 w-full">
            <div class="bg-crimson flex justify-center items-center p-2 rounded-full w-14 h-14">
              <fa-icon class="text-white text-2xl" [icon]="Signal"></fa-icon>
            </div>
            <p class="text-white text-xl font-semibold my-5">Cobertura Completa</p>
            <p class="text-neutral-400">Información detallada de Liga 1, Liga 2, Liga 3 y Copa Perú. Desde resltados, tablas, estadisticas y mucho más.</p>
          </div>
          <div class="bg-nightfall flex flex-col items-center p-5 w-full">
            <div class="bg-crimson flex justify-center items-center p-2 rounded-full w-14 h-14">
              <fa-icon class="text-white text-xl" [icon]="People"></fa-icon>
            </div>
            <p class="text-white text-xl font-semibold my-5">Comunidad Unida</p>
            <p class="text-neutral-400">Conectamos a hinchas de todo el Perú, desde la capital hasta los rincones más remotos donde late el corazón del fútbol.</p>
          </div>
          <div class="bg-nightfall flex flex-col items-center p-5 w-full">
            <div class="bg-crimson flex justify-center items-center p-2 rounded-full w-14 h-14">
              <fa-icon class="text-white text-3xl" [icon]="Hand"></fa-icon>
            </div>
            <p class="text-white text-xl font-semibold my-5">Pasión Auténtica</p>
            <p class="text-neutral-400">Celebramos la pasión única del fútbol peruano, sus tradiciones y el espíritu que nos une como nación.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AboutComponent {
  Trophy = faTrophy;
  Signal = faBullseye;
  People = faUserGroup;
  Hand = faHandFist
}