import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  imports: [],
  template: `
    <div class="bg-night w-full">
      <ul class="flex overflow-x-auto space-x-3 px-5">
        @for (item of data; track $index) {
          <li class="bg-nightfall min-w-40 w-full text-white rounded-t-2xl">
            <div class="px-5 pt-5">
              <div class="flex pb-4">
                <img loading="lazy" [src]="item.image" [alt]="item.alt" class="w-14"/>
                <span class="w-32 text-5xl font-semibold text-right">{{ item.value }}</span>
              </div>
              <div class="w-full h-1 bg-gray-400 dark:bg-dark-1 rounded-md"></div>
              <div class="flex justify-center items-center text-center min-h-14 px-4 font-semibold">
                {{ item.name }}
              </div>
            </div>
            <div class="w-full h-1 bg-crimson"></div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class StatisticsComponent {
  @Input() data!:{name: string, image: string, alt:string, value: number, url:string, color: string}[];
}
