import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { StatisticCard } from '../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-statistics-card',
  imports: [FontAwesomeModule, RouterModule],
  template: `
    <div>
      @for (item of data; track $index) {
        @if ($index == 0) {
          <div>
            <div class="flex">
              <div class="bg-crimson w-fit h-7 text-sm font-bold px-2 flex items-center">{{ cardTitle }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[28px] border-r-0 border-b-0 border-l-[28px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-crimson
              "></div>
            </div>
            <div [routerLink]="['../', 'club', item.category, item.teamId]" class="bg-crimson hover:bg-crimson-hover background-pattern h-32 cursor-pointer flex justify-between p-2">
              <div class="flex flex-col justify-between truncate">
                <div>
                  <p class="font-bold text-xs">{{ $index + 1 }}</p>
                  <p class="font-bold text-xl truncate">{{ item.name }}</p>
                </div>
                <p class="font-bold text-6xl">{{ item.value }}</p>
              </div>
              <div class="my-auto min-w-fit">
                <img loading="lazy" [src]="item.image" [alt]="item.alt" class="h-24 w-24"/>
              </div>
            </div>
          </div>
        } @else {
          <div [routerLink]="['../', 'club', item.category, item.teamId]" class="bg-nightfall hover:bg-brightnight flex justify-between py-1.5 px-2 cursor-pointer">
            <div class="flex w-full">
              <div class="text-xs font-semibold mr-3 my-auto">{{ $index + 1 }}</div>
              <div class="flex gap-2">
                <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="h-6 w-6"/>
                <p class="my-auto text-sm font-semibold">{{ item.name }}</p>
              </div>
            </div>
            <div class="w-10 font-semibold text-lg flex justify-between">
              <fa-icon class="text-xxs text-gold" [icon]="Arrow"></fa-icon>
              <p class="mx-auto">{{ item.value }}</p>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class StatisticsCardComponent {
  @Input() cardTitle!: string;
  @Input() data!: StatisticCard[];
  Arrow = faChevronRight;
}