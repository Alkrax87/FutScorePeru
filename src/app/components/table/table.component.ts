import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TeamTable } from '../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule, CommonModule],
  template: `
    <div class="bg-nightfall rounded-3xl font-semibold">
      <div class="py-5 px-0 sm:py-8 sm:px-8 overflow-x-auto select-none">
        @if (!headers || !config || !data || !classification) {
          <div class="text-white w-full flex justify-center">
            <p>Datos para la tabla por definir...</p>
          </div>
        } @else {
          <table class="w-full">
            <thead class="text-gray-300 border-b-4 border-[#585858]" style="font-size: 12px;">
              <tr class="h-10">
                @for (header of headers; track $index) {
                  @if ($index === 0) {
                    <th class="w-1 min-w-1 max-w-1">{{ header }}</th>
                  } @else if ($index === 1) {
                    <th class="w-10 min-w-10 max-w-10">{{ header }}</th>
                  } @else if ($index === 2) {
                    <th class="min-w-24 sm:min-w-64 text-start">{{ header }}</th>
                  } @else if ($index === 3) {
                    <th class="bg-brightnight rounded-t-lg min-w-16">{{ header }}</th>
                  } @else if ($index === 11) {
                    <th class="w-72 min-w-40">{{ header }}</th>
                  } @else {
                    <th class="min-w-12">{{ header }}</th>
                  }
                }
              </tr>
            </thead>
            <tbody class="text-gray-200">
              @for (item of data; track $index) {
                <tr class="h-12 text-lg text-center hover:bg-gray-200 hover:text-night">
                  @if ($index >= 0 && $index < config[0].quantity) {
                    <td [ngClass]="config[0].class"></td>
                  } @else if ($index >= config[0].quantity && $index < (config[0].quantity + config[1].quantity)) {
                    <td [ngClass]="config[1].class"></td>
                  } @else if ($index >= (data.length - config[2].quantity)) {
                    <td [ngClass]="config[2].class"></td>
                  } @else {
                    <td></td>
                  }
                  <td class="text-sm">{{ $index + 1 }}</td>
                  <td>
                    <div class="flex">
                      <img loading="lazy" [src]="item.image" [alt]="item.alt" class="w-8">
                      <span class="hidden sm:block ml-3 truncate">{{ item.name }}</span>
                      <span class="sm:hidden ml-3 font-bold">{{ item.abbreviation }}</span>
                    </div>
                  </td>
                  <td class="bg-brightnight text-gray-200 font-bold">{{ item.performance.points }}</td>
                  <td>{{ item.performance.pj}}</td>
                  <td>{{ item.performance.pg }}</td>
                  <td>{{ item.performance.pe }}</td>
                  <td>{{ item.performance.pp }}</td>
                  <td>{{ item.performance.gf }}</td>
                  <td>{{ item.performance.gc }}</td>
                  <td>{{ item.performance.gf - item.performance.gc }}</td>
                  <td class="flex">
                    <div class="w-full flex items-center justify-center h-11 space-x-2 text-xl">
                      @for (lastGame of item.lastgames; track $index) {
                        @switch (lastGame) {
                          @case ("w") {
                            <fa-icon class="text-green-600" [icon]="Win"></fa-icon>
                          }
                          @case ("d") {
                            <fa-icon class="text-neutral-300" [icon]="Draw"></fa-icon>
                          }
                          @case ("l") {
                            <fa-icon class="text-red-600" [icon]="Lose"></fa-icon>
                          }
                          @default {
                            <fa-icon class="text-neutral-400" [icon]="Default"></fa-icon>
                          }
                        }
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          <div class="mt-8">
            @for (item of classification; track $index) {
              <div class="flex my-2">
                <div class="h-8 w-1" [ngClass]="item.class"></div>
                <div class="h-8">
                  <img loading="lazy" [src]="item.image" alt="classification-logo" class="h-full px-2">
                </div>
                <div class="h-8 text-gray-200 flex items-center">
                  {{ item.name }}
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class TableComponent {
  @Input() config!: { class: string; quantity: number }[];
  @Input() headers!: string[];
  @Input() data!: TeamTable[];
  @Input() classification!: { name: string, image: string, class:string }[]
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;
}
