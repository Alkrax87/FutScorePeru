import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { TeamTable } from '../../interfaces/ui-models/team-table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [FaIconComponent, RouterLink, NgClass],
  template: `
    <div class="bg-nightfall flex flex-col gap-2 md:gap-4 font-semibold px-0 sm:px-4 py-2 sm:py-4 duration-500">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="text-neutral-300 border-b-4 text-xs border-neutral-600 duration-500">
            <tr class="h-8 duration-500">
              @for (header of headers; track $index) {
                @if ($index === 0) {
                  <th scope="col" class="bg-nightfall w-1 min-w-1 max-w-1 sticky left-0 z-20">{{ header }}</th>
                } @else if ($index === 1) {
                  <th scope="col" class="bg-nightfall w-8 min-w-8 max-w-8 sticky left-1 z-20">{{ header }}</th>
                } @else if ($index === 2) {
                  <th scope="col" class="bg-nightfall group-hover:bg-white min-w-10 w-10 duration-500 sticky left-9 z-20">{{ header }}</th>
                } @else if ($index === 3) {
                  <th scope="col" class="min-w-48 md:min-w-72 text-start duration-500">{{ header }}</th>
                } @else if ($index === 4) {
                  <th scope="col" class="bg-brightnight min-w-14 duration-500">{{ header }}</th>
                } @else if ($index === headers.length - 1) {
                  <th scope="col" class="w-72 min-w-40">{{ header }}</th>
                } @else {
                  @if (isCPTable && $index === headers.length - 2) {
                    <th scope="col" class="bg-brightnight min-w-10 duration-500">{{ header }}</th>
                  } @else {
                    <th scope="col" class="min-w-10 md:min-w-12 duration-500">{{ header }}</th>
                  }
                }
              }
            </tr>
          </thead>
          <tbody class="text-sm md:text-base duration-500">
            @if (data.length > 0) {
              @for (item of data; track $index) {
                <tr [routerLink]="!isCPTable ? ['../club', item.category, item.teamId] : undefined" [ngClass]="{ 'cursor-pointer': !isCPTable }" class="group text-center text-light hover:bg-neutral-200 hover:text-night">
                  @if (config[0] && config[0].active && $index >= 0 && $index < config[0].quantity!) {
                    <td [ngClass]="config[0].class" class="sticky left-0 z-30"></td>
                  } @else if (config[1] && config[1].active && $index >= config[0].quantity! && $index < (config[0].quantity! + config[1].quantity!)) {
                    <td [ngClass]="config[1].class" class="sticky left-0 z-30"></td>
                  } @else if (config[2] && config[2].active && $index >= (data.length - config[2].quantity!)) {
                    <td [ngClass]="config[2].class" class="sticky left-0 z-30"></td>
                  } @else {
                    <td class="bg-nightfall group-hover:bg-neutral-200 sticky left-0 z-30"></td>
                  }
                  <td class="bg-nightfall group-hover:bg-neutral-200 text-xs sticky left-1 z-30">{{ $index + 1 }}</td>
                  <td class="bg-nightfall group-hover:bg-neutral-200 sticky left-9 z-30">
                    <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="w-8 h-8" />
                  </td>
                  <td class="text-start">
                    <span class="m-1 truncate my-auto">{{ item.name }}</span>
                  </td>
                  <td class="bg-brightnight group-hover:bg-white group-hover:text-night group-hover:duration-0 font-bold ">{{ item.performance.points }}</td>
                  <td>{{ item.performance.played }}</td>
                  <td>{{ item.performance.w }}</td>
                  <td>{{ item.performance.d }}</td>
                  <td>{{ item.performance.l }}</td>
                  <td>{{ item.performance.gf }}</td>
                  <td>{{ item.performance.ga }}</td>
                  <td [ngClass]="{ 'text-promotion': item.performance.gd > 0, 'text-relegation': item.performance.gd < 0 }">{{ item.performance.gd > 0 ? '+' + item.performance.gd : item.performance.gd }}</td>
                  @if (isCPTable) {
                    <td class="bg-brightnight group-hover:bg-white group-hover:text-night group-hover:duration-0 font-bold">{{ item.performance.rp }}</td>
                  }
                  <td class="flex justify-center items-center h-12 gap-1 md:gap-2 text-lg md:text-xl duration-500">
                    @for (item of item.form; track $index) {
                      @switch (item) {
                        @case ("w") { <fa-icon class="text-green-600" [icon]="Win"></fa-icon> }
                        @case ("d") { <fa-icon class="text-neutral-300" [icon]="Draw"></fa-icon> }
                        @case ("l") { <fa-icon class="text-red-600" [icon]="Lose"></fa-icon> }
                        @default { <fa-icon class="text-neutral-500" [icon]="Default"></fa-icon> }
                      }
                    }
                  </td>
                </tr>
              }
            } @else {
              <tr>
                <td colspan="12" class="h-12 text-center text-neutral-400 text-sm">
                  <fa-icon [icon]="Database"></fa-icon> Datos de la tabla por definir..
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <!-- Notes -->
      <div class="flex flex-col gap-0.5">
        @for (item of config; track $index) {
          @if (item.active) {
            <div class="flex gap-2 h-6 md:h-8 duration-500">
              <div class="w-1" [ngClass]="item.class"></div>
              <img loading="lazy" [src]="item.image" alt="classification-logo" class="w-6 md:w-8 h-6 md:h-8 duration-500" />
              <p class="text-light text-sm flex items-center my-auto">{{ item.name }}</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class TableComponent {
  @Input() config: { active: boolean; name?: string; image?: string; class?: string; quantity?: number }[] = [];
  @Input() headers: string[] = [];
  @Input() isCPTable: boolean = false;
  @Input() data: TeamTable[] = [];

  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;
  Database = faDatabase;
}