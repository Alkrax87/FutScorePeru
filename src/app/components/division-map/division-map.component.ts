import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { CityCardComponent } from '../city-card/city-card.component';
import { MapComponent } from '../map/map.component';
import { MapElement } from '../../interfaces/api-models/map-element';
import { TeamMap } from '../../interfaces/ui-models/team-map';
import { SubtitleComponent } from '../subtitle/subtitle.component';

@Component({
  selector: 'app-division-map',
  imports: [CityCardComponent, FaIconComponent, MapComponent, SubtitleComponent],
  template: `

    <div class="bg-light dark:bg-nightfall dark:text-light px-2 sm:px-4 py-12 md:py-20 select-none duration-500">
      <div class="flex flex-col sm:flex-row max-w-screen-xl gap-6 mx-auto">
        <!-- Regions -->
        <div class="place-content-center w-full sm:w-1/2 xl:w-3/5 duration-500">
          <app-subtitle><div class="text-dark dark:text-light duration-500">Distribución Geográfica</div></app-subtitle>
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-1 justify-center mt-4 mb-2">
            @for (region of regions; track region.name) {
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
        <div class="place-content-center w-full sm:w-1/2 xl:w-2/5 duration-500">
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