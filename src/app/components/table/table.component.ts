import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TeamTable } from '../../interfaces/ui-models/team-table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  template: `
    <div class="bg-nightfall rounded-3xl font-semibold select-none">
      <div class="pt-5 md:pt-8 px-0 md:px-5 pb-2 overflow-x-auto">
        <table class="w-full">
          <thead class="text-gray-300 border-b-4 text-xxs md:text-xs border-[#585858]">
            <tr class="h-8 md:h-10">
              @for (header of headers; track $index) {
                @if ($index === 0) {
                  <th class="w-1 min-w-1 max-w-1">{{ header }}</th>
                } @else if ($index === 1) {
                  <th class="w-10 min-w-10 max-w-10">{{ header }}</th>
                } @else if ($index === 2) {
                  <th class="min-w-20 sm:min-w-52 md:min-w-64 text-start">{{ header }}</th>
                } @else if ($index === 3) {
                  <th class="bg-brightnight rounded-t-lg min-w-14 md:min-w-16">{{ header }}</th>
                } @else if ($index === 11) {
                  <th class="w-72 min-w-40">{{ header }}</th>
                } @else {
                  <th class="min-w-10 md:min-w-12">{{ header }}</th>
                }
              }
            </tr>
          </thead>
          <tbody class="text-gray-200">
            @if (data.length > 0) {
              @for (item of data; track $index) {
                <tr [routerLink]="['../club', item.category, item.teamId]" class="h-9 md:h-12 cursor-pointer text-center hover:bg-gray-200 hover:text-night">
                  @if ($index >= 0 && $index < config[0].quantity) {
                    <td [ngClass]="config[0].class"></td>
                  } @else if ($index >= config[0].quantity && $index < (config[0].quantity + config[1].quantity)) {
                    <td [ngClass]="config[1].class"></td>
                  } @else if ($index >= (data.length - config[2].quantity)) {
                    <td [ngClass]="config[2].class"></td>
                  } @else {
                    <td></td>
                  }
                  <td class="text-xs md:text-sm">{{ $index + 1 }}</td>
                  <td>
                    <div class="flex text-sm md:text-lg">
                      <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="w-7 md:w-8">
                      <span class="hidden sm:block ml-2 truncate my-auto">{{ item.name }}</span>
                      <span class="sm:hidden ml-3 font-bold flex items-center text-center my-auto">{{ item.abbreviation }}</span>
                    </div>
                  </td>
                  <td class="bg-brightnight text-gray-200 font-bold text-sm md:text-lg">{{ item.performance.points }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.pj }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.pg }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.pe }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.pp }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.gf }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.gc }}</td>
                  <td class="text-sm md:text-lg">{{ item.performance.dg > 0 ? "+" + item.performance.dg : item.performance.dg }}</td>
                  <td class="flex justify-center items-center h-9 md:h-12 gap-2 md:text-xl">
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
                  </td>
                </tr>
              }
            } @else {
              <tr>
                <td colspan="12">
                  <div class="h-16 flex justify-center items-center text-2xl">
                    Datos de la tabla por definir...
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="flex flex-col gap-0.5 pb-5 md:pb-8 px-0 md:px-5 pt-2">
        @for (item of classification; track $index) {
          <div class="flex gap-2 h-8">
            <div class="w-1" [ngClass]="item.class"></div>
            <img loading="lazy" [src]="item.image" alt="classification-logo" class="h-full">
            <p class="text-gray-200 flex items-center my-auto">{{ item.name }}</p>
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
