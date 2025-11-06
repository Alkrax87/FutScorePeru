import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FixtureCompactCard } from '../../interfaces/ui-models/fixture-compact-card';

@Component({
  selector: 'app-division-fixture',
  imports: [RouterLink, FontAwesomeModule],
  template: `
    @if (fixture) {
      <div class="bg-night px-3 sm:px-5 select-none duration-500 h-20">
        <div class="relative w-full -top-10 md:-top-12 duration-500">
          <div class="flex carousel mb-2 overflow-x-hidden">
            <div class="flex gap-4 pr-4 group" [style.animation-duration]="animationDuration">
              @for (item of fixture; track $index) {
                <div class="bg-nightfall flex-shrink-0 w-44 md:w-60 duration-500">
                  <div class="bg-crimson h-1"></div>
                  <div class="flex justify-between p-3 gap-1">
                    <!-- Left -->
                    <div class="cursor-pointer" [routerLink]="['../club', item.homeTeamCategory, item.homeTeamId]">
                      <img [src]="item.homeTeamImageThumbnail" [alt]="item.homeTeamAlt" class="w-8 md:w-12 duration-500"/>
                      <p class="text-neutral-100 text-center text-xs md:text-sm font-semibold duration-500">{{ item.homeTeamAbbreviation }}</p>
                    </div>
                    <!-- Results -->
                    <div class="my-auto">
                      <div class="flex gap-1 text-xl md:text-3xl font-bold duration-500">
                        <div class="bg-brightnight text-white flex justify-center items-center w-8 md:w-12 h-8 md:h-12 duration-500">{{ item.homeTeamResult }}</div>
                        <div class="bg-brightnight text-white flex justify-center items-center w-8 md:w-12 h-8 md:h-12 duration-500">{{ item.awayTeamResult }}</div>
                      </div>
                    </div>
                    <!-- Right -->
                    <div class="cursor-pointer" [routerLink]="['../club', item.awayTeamCategory, item.awayTeamId]">
                      <img [src]="item.awayTeamImageThumbnail" [alt]="item.awayTeamAlt" class="w-8 md:w-12 duration-500"/>
                      <p class="text-neutral-100 text-center text-xs md:text-sm font-semibold duration-500">{{ item.awayTeamAbbreviation }}</p>
                     </div>
                  </div>
                </div>
              }
            </div>
            <div aria-hidden class="flex gap-4 pr-4 group" [style.animation-duration]="animationDuration">
              @for (item of fixture; track $index) {
                <div class="bg-nightfall flex-shrink-0 w-44 md:w-60 duration-500">
                  <div class="bg-crimson h-1"></div>
                  <div class="flex justify-between p-3 gap-1">
                    <!-- Left -->
                    <div class="cursor-pointer" [routerLink]="['../club', item.homeTeamCategory, item.homeTeamId]">
                      <img [src]="item.homeTeamImageThumbnail" [alt]="item.homeTeamAlt" class="w-8 md:w-12 duration-500"/>
                      <p class="text-neutral-100 text-center text-xs md:text-sm font-semibold duration-500">{{ item.homeTeamAbbreviation }}</p>
                    </div>
                    <!-- Results -->
                    <div class="my-auto">
                      <div class="flex gap-1 text-xl md:text-3xl font-bold duration-500">
                        <div class="bg-brightnight text-white flex justify-center items-center w-8 md:w-12 h-8 md:h-12 duration-500">{{ item.homeTeamResult }}</div>
                        <div class="bg-brightnight text-white flex justify-center items-center w-8 md:w-12 h-8 md:h-12 duration-500">{{ item.awayTeamResult }}</div>
                      </div>
                    </div>
                    <!-- Right -->
                    <div class="cursor-pointer" [routerLink]="['../club', item.awayTeamCategory, item.awayTeamId]">
                      <img [src]="item.awayTeamImageThumbnail" [alt]="item.awayTeamAlt" class="w-8 md:w-12 duration-500"/>
                      <p class="text-neutral-100 text-center text-xs md:text-sm font-semibold duration-500">{{ item.awayTeamAbbreviation }}</p>
                     </div>
                  </div>
                </div>
              }
            </div>
            <div aria-hidden class="flex gap-4 pr-4 group" [style.animation-duration]="animationDuration">
              @for (item of fixture; track $index) {
                <div class="bg-nightfall flex-shrink-0 w-44 md:w-60 duration-500">
                  <div class="bg-crimson h-1"></div>
                  <div class="flex justify-between p-3 gap-1">
                    <!-- Left -->
                    <div class="cursor-pointer" [routerLink]="['../club', item.homeTeamCategory, item.homeTeamId]">
                      <img [src]="item.homeTeamImageThumbnail" [alt]="item.homeTeamAlt" class="w-8 md:w-12 duration-500"/>
                      <p class="text-neutral-100 text-center text-xs md:text-sm font-semibold duration-500">{{ item.homeTeamAbbreviation }}</p>
                    </div>
                    <!-- Results -->
                    <div class="my-auto">
                      <div class="flex gap-1 text-xl md:text-3xl font-bold duration-500">
                        <div class="bg-brightnight text-white flex justify-center items-center w-8 md:w-12 h-8 md:h-12 duration-500">{{ item.homeTeamResult }}</div>
                        <div class="bg-brightnight text-white flex justify-center items-center w-8 md:w-12 h-8 md:h-12 duration-500">{{ item.awayTeamResult }}</div>
                      </div>
                    </div>
                    <!-- Right -->
                    <div class="cursor-pointer" [routerLink]="['../club', item.awayTeamCategory, item.awayTeamId]">
                      <img [src]="item.awayTeamImageThumbnail" [alt]="item.awayTeamAlt" class="w-8 md:w-12 duration-500"/>
                      <p class="text-neutral-100 text-center text-xs md:text-sm font-semibold duration-500">{{ item.awayTeamAbbreviation }}</p>
                     </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div class="font-bold text-xs md:text-sm flex justify-end duration-500">
            <span [routerLink]="'../fixture'" class="text-crimson hover:text-crimson-hover cursor-pointer">
              FIXTURE COMPLETO <fa-icon [icon]="Arrow"></fa-icon>
            </span>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .carousel::-webkit-scrollbar {
      display: none;
    }
    .group {
      animation: carousel infinite linear;
      will-change: transform;
    }
    @keyframes carousel {
      from { transform: translateX(0); }
      to { transform: translateX(-100%); }
    }
  `,
})
export class DivisionFixtureComponent {
  @Input() fixture!: FixtureCompactCard[];

  Left = faArrowLeft;
  Right = faArrowRight;
  Arrow = faAngleDoubleRight;

  get animationDuration(): string {
    return `${this.fixture.length * 10}s`;
  }
}