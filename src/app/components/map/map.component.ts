import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Map } from '../../interfaces/api-models/map';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  template: `
    <svg class="map" viewBox="-60 0 1100 1470" xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      @if (map) {
        @for (item of map; track $index) {
          <path
            [ngClass]="{'fill-crimson hover:fill-gold transition-colors duration-300 ease-in-out':item.mapStatus}"
            [id]="item.mapId"
            [attr.name]="item.mapName"
            [attr.d]="item.mapD"
          ></path>
        }
      }
    </svg>
  `,
  styles: `
    .map {
      fill: #dad8d9;
      fill-opacity: 1;
      stroke:#ffffff;
      stroke-opacity: 1;
      stroke-width: 3;
    }
  `,
})
export class MapComponent {
  @Input() map!: Map[];
}
