import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { CityCardComponent } from '../city-card/city-card.component';
import { MapComponent } from '../map/map.component';
import { MapElement } from '../../interfaces/api-models/map-element';
import { TeamMap } from '../../interfaces/ui-models/team-map';

@Component({
  selector: 'app-division-map',
  imports: [CityCardComponent, FontAwesomeModule, MapComponent],
  template: `
    <div class="bg-neutral-100 dark:bg-nightfall dark:text-white px-3 sm:px-5 py-10 md:py-24 select-none duration-500">
      <div class="flex flex-col sm:flex-row w-full lg:w-5/6 xl:w-2/3 duration-500 gap-5 mx-auto">
        <!-- Regions -->
        <div class="place-content-center w-full sm:w-1/2 xl:w-3/5">
          <div class="w-fit mx-auto">
            <h3 class="text-2xl font-bold">Distribución Geográfica</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-1 justify-center my-2">
            @for (region of regions; track $index) {
              <div class="grid-cols-1">
                <app-city-card [city]="region"></app-city-card>
              </div>
            }
          </div>
          <div class="flex gap-1 justify-center text-xs text-neutral-400">
            <fa-icon [icon]="Shield"></fa-icon>
            <p>Cantidad de equipos</p>
          </div>
        </div>
        <!-- Map -->
        <div class="place-content-center w-full sm:w-1/2 xl:w-2/5">
          <div class="bg-night w-full p-5">
            <app-map [mapConstructor]="mapConstructor" [dataMap]="dataMap"></app-map>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionMapComponent {
  @Input() regions!: { name: string; teams: number }[];
  @Input() mapConstructor!: MapElement[];
  @Input() dataMap!: TeamMap[];
  Shield = faShieldHalved;
}