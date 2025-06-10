import { Component, Input } from '@angular/core';
import { DivisionData } from '../../interfaces/api-models/division-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-division-info',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-night px-5 py-10 md:py-24 select-none">
      <div class="flex flex-col md:flex-row w-full lg:w-4/5 xl:w-2/3 justify-center gap-10 mx-auto">
        <div class="w-full md:w-1/2 place-content-center">
          <div class="bg-crimson text-white w-full text-center image p-5">
            <p class="text-white text-4xl font-bold">{{ data?.category }}<sup class="text-2xl">{{ data?.sup }}</sup> División</p>
          </div>
          <div class="text-white flex gap-4 mt-4">
            <div class=" bg-nightfall w-1/2 place-items-center p-5">
              <fa-icon [icon]="Calendar" class="text-3xl"></fa-icon>
              <p class="text-xl font-semibold">{{ data?.season }}</p>
              <p class="text-neutral-400">Temporada</p>
            </div>
            <div class=" bg-nightfall w-1/2 place-items-center p-5">
              <fa-icon [icon]="Shield" class="text-3xl"></fa-icon>
              <p class="text-xl font-semibold">{{ data?.teams }}</p>
              <p class="text-neutral-400">Equipos</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 place-content-center">
          <p class="text-white text-2xl font-semibold">Acerca de</p>
          <div class="bg-crimson skew-x-50 h-1.5 w-32 mt-2"></div>
          <p class="text-neutral-300 my-4 text-justify">{{ description }}</p>
          <div class="flex flex-wrap gap-3">
            @for (item of tags; track $index) {
              <p class="text-neutral-200 px-4 pb-0.5 text-sm rounded-full border-2 border-gold text-nowrap">{{ tags[$index] }}</p>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .image {
      background-image: url('/assets/images/pages/Background-pattern.png');
      background-size: cover;
    }
  `,
})
export class DivisionInfoComponent {
  @Input() data!: DivisionData | null;
  @Input() description!: string;
  @Input() tags!: string[];
  Trophy = faTrophy;
  Calendar = faCalendarAlt;
  Shield = faShieldHalved;
}