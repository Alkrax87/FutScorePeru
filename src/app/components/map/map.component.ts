import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MapElement } from '../../interfaces/api-models/map-element';
import { TeamMap } from '../../interfaces/ui-models/team-map';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-map',
  imports: [CommonModule, RouterLink],
  template: `
    <svg class="fill-map-light dark:fill-map-dark duration-500 opacity-100 stroke-white stroke-map" viewBox="-60 0 1100 1470" xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      @if (map) {
        @for (item of map; track $index) {
          <path
            [ngClass]="{'fill-crimson hover:fill-gold cursor-pointer transition-colors duration-500 ease-in-out':item.mapStatus}"
            [id]="item.mapId"
            [attr.name]="item.mapName"
            [attr.d]="item.mapD"
            (click)="showTooltip($event, item)"
          ></path>
        }
      }
    </svg>

    @if (selected) {
      <div class="bg-nightfall absolute px-2 pb-2 border-gold border-2 bg-opacity-90 -translate-x-1/2 select-none" [ngStyle]="{'top.px': position?.y, 'left.px': position?.x}">
        <div class="flex justify-center">
          <p class="text-white text-base md:text-lg text-center">{{ content }}</p>
        </div>
        <div class="flex flex-wrap justify-center">
          @for (item of toolTipData; track $index) {
            <a [routerLink]="['../', 'club', item.category, item.teamId]">
              <img loading="lazy" class="w-8 md:w-10" [src]="item.imageThumbnail" [alt]="item.alt">
            </a>
          }
        </div>
      </div>
    }
  `,
  styles: ``,
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
