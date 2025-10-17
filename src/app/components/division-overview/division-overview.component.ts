import { Component, Input } from '@angular/core';
import { DivisionData } from '../../interfaces/api-models/division-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-division-overview',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-night px-3 sm:px-5 py-10 md:py-24 select-none duration-500">
      <div class="flex flex-col sm:flex-row w-full lg:w-5/6 xl:w-2/3 duration-500 gap-5 mx-auto">
        <!-- Summary -->
        <div class="w-full sm:w-1/2 place-content-center">
          <div class="bg-crimson text-white w-full text-center image p-3 md:p-5 duration-500">
            <p class="text-white font-bold text-3xl md:text-4xl duration-500">
              {{ data?.divisionId }}<sup class="text-xl md:text-2xl duration-500">{{ data?.sup }}</sup> División
            </p>
          </div>
          <div class="text-white flex gap-3 mt-3 duration-500">
            <div class=" bg-nightfall text-center w-1/2 p-3 md:p-5 duration-500">
              <fa-icon [icon]="Calendar" class="text-2xl md:text-3xl duration-500"></fa-icon>
              <p class="text-lg md:text-xl font-semibold duration-500">{{ data?.season }}</p>
              <p class="text-neutral-400 text-xs md:text-sm duration-500">Temporada</p>
            </div>
            <div class=" bg-nightfall text-center w-1/2 p-3 md:p-5 duration-500">
              <fa-icon [icon]="Shield" class="text-2xl md:text-3xl duration-500"></fa-icon>
              <p class="text-lg md:text-xl font-semibold duration-500">{{ data?.teams }}</p>
              <p class="text-neutral-400 text-xs md:text-sm duration-500">Equipos</p>
            </div>
          </div>
        </div>
        <!-- About -->
        <div class="w-full sm:w-1/2 place-content-center">
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Acerca de</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <p class="text-neutral-300 my-4 text-justify">{{ description }}</p>
          <div class="flex flex-wrap gap-3">
            @for (item of tags; track $index) {
              <p class="text-neutral-200 px-4 text-sm rounded-full border-2 border-gold text-nowrap">{{ tags[$index] }}</p>
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
export class DivisionOverviewComponent {
  @Input() data!: DivisionData | null;
  @Input() description!: string;
  @Input() tags!: string[];

  Calendar = faCalendarAlt;
  Shield = faShieldHalved;
}