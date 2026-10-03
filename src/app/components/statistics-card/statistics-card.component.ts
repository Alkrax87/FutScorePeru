import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { StatisticCard } from '../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-statistics-card',
  imports: [FaIconComponent, RouterLink],
  template: `
    <div>
      <div class="flex">
        <div class="bg-main w-fit h-7 text-sm font-bold px-2 flex items-center">{{ cardTitle }}</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[28px] border-r-0 border-b-0 border-l-[28px]
          border-t-transparent border-r-transparent border-b-transparent border-l-main
        "></div>
      </div>
      @if (data.length === 0) {
        <div class="bg-main background-pattern text-light h-32 flex items-center font-bold justify-center p-4 text-lg text-center">No hay datos disponibles para esta estadística.</div>
        <div class="bg-nightfall h-[280px] flex flex-col gap-2 items-center justify-center p-4">
          <fa-icon class="text-3xl" [icon]="Database"></fa-icon>
          <span class="font-semibold text-center">Sin Datos</span>
        </div>
      } @else {
        @for (item of data; track item.teamId) {
          @if ($index === 0) {
            <a [routerLink]="['../', 'club', item.category, item.teamId]" class="bg-main hover:bg-main-hover background-pattern h-32 cursor-pointer flex justify-between p-2">
              <div class="flex flex-col justify-between truncate">
                <div>
                  <p class="font-bold text-xs">{{ $index + 1 }}</p>
                  <p class="font-bold text-xl truncate">{{ item.name }}</p>
                </div>
                <p class="font-bold text-6xl">{{ item.value }}</p>
              </div>
              <div class="my-auto min-w-fit">
                <img loading="lazy" [src]="item.image" [alt]="item.alt" class="h-24 w-24" />
              </div>
            </a>
          } @else {
            <a [routerLink]="['../', 'club', item.category, item.teamId]" class="bg-nightfall hover:bg-brightnight flex justify-between py-1.5 px-2 cursor-pointer">
              <div class="flex w-full">
                <div class="text-xs font-semibold mr-3 my-auto">{{ $index + 1 }}</div>
                <div class="flex gap-2">
                  <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="h-6 w-6" />
                  <p class="my-auto text-sm font-semibold">{{ item.name }}</p>
                </div>
              </div>
              <div class="w-10 font-semibold text-lg flex justify-between">
                <fa-icon class="text-xs text-gold my-auto" [icon]="Arrow"></fa-icon>
                <p class="mx-auto">{{ item.value }}</p>
              </div>
            </a>
          }
        }
      }
    </div>
  `,
  styles: ``,
})
export class StatisticsCardComponent {
  @Input() cardTitle: string = "";
  @Input() data: StatisticCard[] = [];

  Database = faDatabase;
  Arrow = faChevronRight;
}