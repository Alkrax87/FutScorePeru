import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { FixtureByDate } from '../../interfaces/ui-models/fixture-models';

@Component({
  selector: 'app-fixture',
  imports: [RouterLink, DatePipe, TitleCasePipe, NgClass],
  template: `
    <div class="select-none flex flex-col gap-4">
      @for (item of data; track $index) {
        <div>
          <!-- Date -->
          <div class="flex justify-center items-center mb-2">
            @if (item.date) {
              <span class="bg-main text-white px-5 text-sm font-semibold py-1">{{ item.date | date: 'EEEE d MMMM' | titlecase }}</span>
            } @else {
              <span class="bg-main text-white px-5 text-sm font-semibold py-1">Por Definir</span>
            }
          </div>
          <!-- Matches -->
          <div class="flex flex-col gap-1.5">
            @for (match of item.matches; track $index) {
              <div>
                <!-- Group -->
                @if (match.group) {
                  <div class="flex justify-center">
                    <div class="relative border-r-[18px] border-t-[18px] border-r-transparent border-t-night bg-white"></div>
                    <div class="bg-white w-fit text-xs px-4 font-semibold text-center">Grupo {{ match.group.toUpperCase() }}</div>
                    <div class="relative border-l-[18px] border-t-[18px] border-l-transparent border-t-night bg-white"></div>
                  </div>
                }
                <!-- Match -->
                <div class="bg-nightfall text-white flex justify-center gap-1 p-1">
                  <!-- Left Team-->
                  <div class="w-full flex justify-end">
                    <div class="flex items-center" [ngClass]="{ 'cursor-pointer': match.home.category !== 4 }" [routerLink]="match.home.category !== 4 ? ['../', 'club', match.home.category, match.home.teamId] : null">
                      <p class="text-sm">
                        <span class="hidden sm:block font-semibold">{{ match.home.name }}</span>
                        <span class="block sm:hidden font-bold">{{ match.home.abbreviation }}</span>
                      </p>
                      <img loading="lazy" [src]="match.home.imageThumbnail" [alt]="match.home.alt" class="w-10 h-10 ml-2" />
                    </div>
                  </div>
                  <!-- Match Results -->
                  <div class="flex min-w-24 gap-1">
                    @if (match.home.result !== null && match.away.result !== null) {
                      <div class="bg-brightnight flex justify-center items-center font-bold -my-1 text-3xl w-full">
                        <p>{{ match.home.result }}</p>
                      </div>
                      <div class="bg-brightnight flex justify-center items-center font-bold -my-1 text-3xl w-full">
                        <p>{{ match.away.result }}</p>
                      </div>
                    } @else {
                      <div class="flex items-center justify-center -my-1 text-center font-bold w-full">{{ match.date ? (match.date | date: 'H:mm') : '-' }}</div>
                    }
                  </div>
                  <!-- Right Team-->
                  <div class="w-full flex justify-start">
                    <div class="flex items-center" [ngClass]="{ 'cursor-pointer': match.away.category }" [routerLink]="match.away.category !== 4 ? ['../', 'club', match.away.category, match.away.teamId] : null">
                      <img loading="lazy" [src]="match.away.imageThumbnail" [alt]="match.away.alt" class="w-10 h-10 mr-2" />
                      <p class="text-sm">
                        <span class="block sm:hidden font-bold">{{ match.away.abbreviation }}</span>
                        <span class="hidden sm:block font-semibold">{{ match.away.name }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class FixtureComponent {
  @Input() data: FixtureByDate[] = [];
}