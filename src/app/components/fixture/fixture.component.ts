import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { FixtureByDate } from '../../interfaces/ui-models/fixture-models';

@Component({
  selector: 'app-fixture',
  imports: [RouterLink, DatePipe, TitleCasePipe, NgClass],
  template: `
    <div class="select-none flex flex-col gap-8">
      @for (item of data; track $index) {
        <div>
          <!-- Date -->
          <div class="flex items-center text-light font-bold text-sm gap-2 mb-2">
            <div class="bg-brightnight h-0.5 rounded-full w-full"></div>
            @if (item.date) {
              <p class="bg-main px-4 py-1 min-w-fit truncate">{{ item.date | date: 'EEEE d MMMM' | titlecase }}</p>
            } @else {
              <p class="bg-main px-4 py-1 min-w-fit truncate">Por Definir</p>
            }
            <div class="bg-brightnight h-0.5 rounded-full w-full"></div>
          </div>
          <!-- Matches -->
          <div class="flex flex-col gap-2">
            @for (match of item.matches; track $index) {
              <div>
                <!-- Group -->
                @if (match.group) {
                  <div class="flex justify-center">
                    <div class="relative border-r-[18px] border-t-[18px] border-r-transparent border-t-night bg-light"></div>
                    <div class="bg-light w-fit text-xs px-4 font-semibold text-center">Grupo {{ formatText(match.group) }}</div>
                    <div class="relative border-l-[18px] border-t-[18px] border-l-transparent border-t-night bg-light"></div>
                  </div>
                }
                <!-- Match -->
                <div class="bg-nightfall text-light flex justify-center gap-2 p-1">
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
                    <div class="flex items-center" [ngClass]="{ 'cursor-pointer': match.away.category !== 4 }" [routerLink]="match.away.category !== 4 ? ['../', 'club', match.away.category, match.away.teamId] : null">
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

  formatText(texto: string) {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}