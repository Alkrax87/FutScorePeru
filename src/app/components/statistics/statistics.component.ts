import { Component, Input } from '@angular/core';
import { StatisticCard } from '../../interfaces/ui-models/statistic-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-statistics',
  imports: [FontAwesomeModule, RouterModule],
  template: `
    <div class="my-3">
      @for (item of data; track $index) {
        @if ($index == 0) {
          <a routerLink="/club/{{ item.teamId }}">
            <div class="bg-crimson hover:bg-crimson-hover h-[136px] image rounded-t-xl flex justify-between p-2">
              <div class="flex flex-col justify-between">
                <div>
                  <p class="font-bold text-xs">{{ $index + 1 }}</p>
                  <p class="font-bold text-lg">{{ item.name }}</p>
                </div>
                <p class="font-bold text-5xl">{{ item.value }}</p>
              </div>
              <div class="my-auto">
                <img loading="lazy" [src]="item.image" [alt]="item.alt" class="h-24 w-24"/>
              </div>
            </div>
          </a>
        } @else {
          <a routerLink="/club/{{ item.teamId }}">
            <div class="bg-nightfall hover:bg-brightnight flex justify-between py-1.5 px-2">
              <div class="flex w-full">
                <div class="text-xs font-semibold mr-3 my-auto">{{ $index + 1 }}</div>
                <div class="flex gap-2">
                  <img loading="lazy" [src]="item.image" [alt]="item.alt" class="h-6 w-6"/>
                  <p class="my-auto text-sm font-semibold">{{ item.name }}</p>
                </div>
              </div>
              <div class="w-10 font-semibold text-lg flex justify-between">
                <fa-icon class="flex items-center text-xxs text-gold my-1" [icon]="Arrow"></fa-icon>
                <p class="mx-auto">{{ item.value }}</p>
              </div>
            </div>
          </a>
        }
      }
    </div>
  `,
  styles: `
    .image {
      background-image: url('/assets/images/pages/Background-pattern.png');
      background-size: cover;
      font-size: 61px;
    }
  `,
})
export class StatisticsComponent {
  @Input() data!:StatisticCard[];
  Arrow = faChevronRight;
}
