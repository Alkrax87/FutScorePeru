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
            (click)="showTooltip($event, item)"
          ></path>
        }
      }
    </svg>

    <div class="tooltip" [ngStyle]="{'top.px': position?.y, 'left.px': position?.x}" *ngIf="visible">
      <div class="flex justify-center">
        <p class="text-lg">{{ content }}</p>
      </div>
      <div class="flex w-full justify-center">
        @for (item of data; track $index) {
          <img class="w-10" [src]="item.src" alt="">
        }
      </div>
    </div>
  `,
  styles: `
    .map {
      position: relative;
      fill: #dad8d9;
      fill-opacity: 1;
      stroke:#ffffff;
      stroke-opacity: 1;
      stroke-width: 3;
    }
    .tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      transform: translate(-50%, 0%);
    }
  `,
})
export class MapComponent {
  @Input() map!: Map[];
  @Input() data!: {name:string, alt: string, src: string, location: string}[]

  position: { x: number, y: number } | null = null;
  content: string = '';
  visible: boolean = false;
  private timeoutHandle: any;

  showTooltip(event: MouseEvent, item: any): void {
    this.content = '';
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
    const { clientX, clientY } = event;

    if (!item.mapStatus) {
      if (this.visible) {
        this.visible = false;
      }
      return;
    }

    if (item.mapName === this.content && this.visible) {
      return;
    }

    this.position = { x: clientX, y: clientY };
    this.content = item.mapName;
    this.visible = true;

    this.timeoutHandle = setTimeout(() => this.visible = false, 5000);
  }
}
