import { Component, Input } from '@angular/core';
import { DivisionData } from '../../interfaces/api-models/division-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-division-info',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-night py-12 sm:py-20 px-5">
      <div class="flex flex-col md:flex-row w-full lg:w-4/5 xl:w-2/3 justify-center gap-10 mx-auto">
        <div class="w-full md:w-1/2">
          <div class="flex gap-5">
            <div class="bg-crimson flex justify-center items-center rounded-full p-5">
              <fa-icon [icon]="Trophy" class="text-white text-4xl"></fa-icon>
            </div>
            <div class="my-auto">
              <p class="text-white text-4xl font-semibold">{{ data?.name }}<sup>{{ data?.sup }}</sup> División</p>
            </div>
          </div>
          <div class="text-white flex flex-col sm:flex-row gap-5 mt-5">
            <div class=" bg-nightfall w-full place-items-center p-5">
              <fa-icon [icon]="Calendar" class="text-3xl"></fa-icon>
              <p class="text-xl font-semibold">{{ data?.season }}</p>
              <p class="text-neutral-400">Temporada</p>
            </div>
            <div class=" bg-nightfall w-full place-items-center p-5">
              <fa-icon [icon]="Shield" class="text-3xl"></fa-icon>
              <p class="text-xl font-semibold">{{ data?.teams }}</p>
              <p class="text-neutral-400">Equipos</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 place-content-center">
          <p class="text-white text-2xl font-semibold">Acerca de</p>
          <div class="bg-crimson skew-x-50 h-1.5 w-32 my-2"></div>
          <p class="text-neutral-300 my-5">{{ description }}</p>
          <div class="flex gap-3 flex-wrap">
            @for (item of tags; track $index) {
              <p class="text-neutral-200 px-4 pb-0.5 text-sm rounded-xl border-2 border-gold text-nowrap">{{ tags[$index] }}</p>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionInfoComponent {
  @Input() data!: DivisionData | null;
  @Input() description!: string;
  @Input() tags!: string[];
  Trophy = faTrophy;
  Calendar = faCalendarAlt;
  Shield = faShieldHalved;
}