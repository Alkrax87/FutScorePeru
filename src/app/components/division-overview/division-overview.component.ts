import { Component, Input } from '@angular/core';
import { Division } from '../../interfaces/api-models/division';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-division-overview',
  imports: [FaIconComponent],
  template: `
    <div class="bg-night px-3 sm:px-5 py-12 md:py-24 select-none duration-500">
      <div class="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-3 sm:gap-5 duration-500">
        <!-- Summary -->
        <div class="w-full md:w-1/2 place-content-center">
          <div class="bg-main background-pattern text-light w-full text-center p-3 lg:p-5 duration-500">
            <p class="text-light font-bold text-3xl lg:text-4xl duration-500">
              @switch (division.category) {
                @case (1) { {{ division.category }}<sup class="text-xl lg:text-2xl duration-500">ra</sup> División }
                @case (2) { {{ division.category }}<sup class="text-xl lg:text-2xl duration-500">da</sup> División }
                @case (3) { {{ division.category }}<sup class="text-xl lg:text-2xl duration-500">ra</sup> División }
                @case (4) { {{ division.category }}<sup class="text-xl lg:text-2xl duration-500">ta</sup> División }
              }
            </p>
          </div>
          <div class="text-light flex gap-3 mt-3 duration-500">
            <div class=" bg-nightfall text-center w-1/2 p-3 lg:p-5 duration-500">
              <fa-icon [icon]="Calendar" class="text-2xl lg:text-3xl duration-500"></fa-icon>
              <p class="text-lg lg:text-xl font-semibold duration-500">{{ division.season }}</p>
              <p class="text-neutral-400 text-xs lg:text-sm duration-500">Temporada</p>
            </div>
            <div class=" bg-nightfall text-center w-1/2 p-3 lg:p-5 duration-500">
              <fa-icon [icon]="Shield" class="text-2xl lg:text-3xl duration-500"></fa-icon>
              <p class="text-lg lg:text-xl font-semibold duration-500">{{ division.teams }}</p>
              <p class="text-neutral-400 text-xs lg:text-sm duration-500">Equipos</p>
            </div>
          </div>
        </div>
        <!-- About -->
        <div class="w-full md:w-1/2 place-content-center">
          <div class="w-fit">
            <h3 class="text-2xl text-light font-bold">Acerca de</h3>
            <div class="bg-main skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <p class="text-neutral-300 my-4 text-justify">{{ division.description }}</p>
          <div class="flex flex-wrap gap-2">
            @for (tag of division.tags; track tag) {
              <p class="text-light px-4 py-0.5 text-sm rounded-full border-2 border-gold text-nowrap">{{ tag }}</p>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionOverviewComponent {
  @Input() division!: Division;

  Calendar = faCalendarAlt;
  Shield = faShieldHalved;
}