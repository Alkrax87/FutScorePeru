import { Component, Input } from '@angular/core';
import { DivisionData } from '../../interfaces/api-models/division-data';

@Component({
  selector: 'app-division-info',
  imports: [],
  template: `
    <div class="h-2 bg-crimson"></div>
    <div class="bg-gray-50 py-2 sm:py-0 grid grid-cols-1 sm:grid-cols-4 gap-2">
      <div class="flex justify-center items-center">
        <div class="justify-items-center">
          <p class="italic text-xs">Temporada</p>
          <p class="font-bold">{{ data?.season }}</p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="justify-items-center">
          <p class="italic text-xs">Equipos</p>
          <p class="font-bold">{{ data?.teams }}</p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="justify-items-center">
          <p class="italic text-xs">Categoría</p>
          <p class="font-bold">{{ data?.name }}<sup>{{ data?.sup }}</sup> División</p>
        </div>
      </div>
      <div class="flex justify-center md:justify-end items-center">
        <img [src]="data?.image" alt="Division-Logo" class="h-16">
      </div>
    </div>
    <div class="h-2 bg-crimson"></div>
  `,
  styles: ``,
})
export class DivisionInfoComponent {
  @Input() data!: DivisionData | null;
}