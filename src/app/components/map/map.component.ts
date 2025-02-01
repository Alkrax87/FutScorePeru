import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MapElement } from '../../interfaces/api-models/map-element';
import { TeamMap } from '../../interfaces/ui-models/team-map';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  template: `
    <svg class="map" viewBox="-60 0 1100 1470" xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      @if (map) {
        @for (item of map; track $index) {
          <path
            [ngClass]="{'fill-crimson hover:fill-gold cursor-pointer transition-colors duration-300 ease-in-out':item.mapStatus}"
            [id]="item.mapId"
            [attr.name]="item.mapName"
            [attr.d]="item.mapD"
            (click)="showTooltip($event, item)"
          ></path>
        }
      }
    </svg>

    @if (selected) {
      <div class="bg-nightfall absolute p-2 border-gold border-2 bg-opacity-90 -translate-x-1/2" [ngStyle]="{'top.px': position?.y, 'left.px': position?.x}">
        <div class="flex justify-center">
          <p class="text-base md:text-lg text-nowrap text-ellipsis">{{ content }}</p>
        </div>
        <div class="flex w-full justify-center">
          @for (item of toolTipData; track $index) {
            <img class="w-8 md:w-10" [src]="item.imageThumbnail" [alt]="item.alt">
          }
        </div>
      </div>
    }
  `,
  styles: `
    .map {
      fill: #dad8d9;
      fill-opacity: 1;
      stroke:#ffffff;
      stroke-opacity: 1;
      stroke-width: 5;
    }
  `,
})
export class MapComponent {
  @Input() map!: MapElement[];
  @Input() dataTeamsMap!: TeamMap[];
  position: { x: number, y: number } | null = null;
  content: string = '';
  selected: boolean = false;
  private timeoutHandle: any;
  toolTipData: TeamMap[] = [];

  showTooltip(event: MouseEvent, item: MapElement) {
    this.content = '';
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    const { pageX, pageY } = event;

    if (!item.mapStatus) {
      if (this.selected) {
        this.selected = false;
      }
      return;
    }

    if (item.mapName === this.content && this.selected) {
      return;
    }

    this.filterSelectedMap(item.mapName);

    this.position = { x: pageX, y: pageY };
    this.content = item.mapName;
    this.selected = true;
    this.timeoutHandle = setTimeout(() => this.selected = false, 6000);
  }

  filterSelectedMap(mapLocation: string) {
    this.toolTipData = this.dataTeamsMap.filter((item) => item.location === mapLocation);
  }
}
