import { Component, Input } from '@angular/core';
import { StatisticCard } from '../../interfaces/ui-models/statistic-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics',
  imports: [FontAwesomeModule],
  template: `
    <ul class="flex overflow-x-auto space-x-3 px-5 pt-5 select-none">
      @for (item of data; track $index) {
        <li class="bg-nightfall min-w-32 w-full text-white rounded-t-2xl mb-3">
          <div class="pt-5 pb-3">
            <div class="justify-items-center">
              <div class="flex space-x-2">
                <img loading="lazy" [src]="item.image" [alt]="item.alt" class="h-10 w-10"/>
                <p class="flex items-center font-semibold text-xl">{{item.abbreviation}}</p>
              </div>
              <fa-icon class="flex items-center text-xs text-gold my-1" [icon]="Arrow"></fa-icon>
              <span class="text-4xl font-semibold text-right">{{ item.value }}</span>
            </div>
          </div>
          <div class="w-full h-1 bg-crimson"></div>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class StatisticsComponent {
  @Input() data!:StatisticCard[];
  Arrow = faChevronDown;
}
