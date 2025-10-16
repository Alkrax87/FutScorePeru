import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MapElement } from '../../interfaces/api-models/map-element';
import { TeamMap } from '../../interfaces/ui-models/team-map';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-map',
  imports: [CommonModule, RouterLink],
  template: `
    <svg class="fill-map-light dark:fill-map-dark duration-500 opacity-100 stroke-white stroke-map" viewBox="0 0 1000 1474" xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      @if (mapConstructor) {
        @for (mapItem of mapConstructor; track $index) {
          <path
            [ngClass]="{'fill-crimson hover:fill-gold cursor-pointer transition-colors duration-500 ease-in-out': mapItem.mapStatus}"
            [id]="mapItem.mapId"
            [attr.name]="mapItem.mapName"
            [attr.d]="mapItem.mapD"
            (click)="showTooltip($event, mapItem)"
          ></path>
        }
      }
    </svg>

    @if (selected) {
      <div class="bg-nightfall absolute px-2 pb-2 border-gold border-2 bg-opacity-90 -translate-x-1/2 select-none" [ngStyle]="{'top.px': position?.y, 'left.px': position?.x}">
        <p class="text-white text-base text-center font-semibold">{{ region }}</p>
        <div class="flex flex-wrap justify-center">
          @for (item of toolTipData; track $index) {
            @if (item.category === 4) {
              <img loading="lazy" class="w-8 md:w-10" [src]="item.imageThumbnail ? item.imageThumbnail : 'assets/images/pages/no-team.webp'" [alt]="item.alt">
            } @else {
              <img [routerLink]="['../', 'club', item.category, item.teamId]" loading="lazy" class="w-8 md:w-10 cursor-pointer" [src]="item.imageThumbnail ? item.imageThumbnail : 'assets/images/pages/no-team.webp'" [alt]="item.alt">
            }
          }
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class MapComponent {
  @Input() mapConstructor!: MapElement[];
  @Input() dataMap!: TeamMap[];
  position: { x: number, y: number } | null = null;
  region: string = '';
  selected: boolean = false;
  private timeoutHandle: any;
  toolTipData: TeamMap[] = [];

  showTooltip(event: MouseEvent, item: MapElement) {
    this.region = '';
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

    if (item.mapName === this.region && this.selected) {
      return;
    }

    this.filterSelectedMap(item.mapName);

    this.position = { x: pageX, y: pageY };
    this.region = item.mapName;
    this.selected = true;
    this.timeoutHandle = setTimeout(() => this.selected = false, 6000);
  }

  filterSelectedMap(mapLocation: string) {
    this.toolTipData = this.dataMap.filter((item) => item.location === mapLocation);
  }
}