import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FixtureCard } from '../../interfaces/ui-models/fixture-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fixture',
  imports: [FontAwesomeModule, RouterLink],
  template: `
    <div class="bg-night select-none">
      @for (item of data; track $index) {
        <div class="py-1">
          <div class="flex justify-center">
            <div class="relative flex-none border-r-[18px] border-t-[18px] border-r-transparent border-t-night bg-white"></div>
            <div class="bg-white w-52 text-xs font-semibold text-center">
              <fa-icon [icon]="Location"></fa-icon>
              {{ item.stadium }}
            </div>
            <div class="relative flex-none border-l-[18px] border-t-[18px] border-l-transparent border-t-night bg-white"></div>
          </div>
          <div class="bg-nightfall text-white flex justify-center gap-1 h-[50px]">
            <div class="w-full flex justify-end">
              <div class="cursor-pointer flex items-center" [routerLink]="['../', 'club', item.category, item.homeTeamId]">
                <p>
                  <span class="hidden md:block">{{ item.homeTeamName }}</span>
                  <span class="block md:hidden font-bold">{{ item.homeTeamAbbreviation }}</span>
                </p>
                <img [src]="item.homeTeamImageThumbnail" [alt]="item.homeTeamAlt" class="w-9 mx-2"/>
              </div>
            </div>
            <div class="bg-brightnight flex justify-center items-center font-bold text-3xl min-w-11 max-w-11">
              <p>{{ item.homeTeamResult }}</p>
            </div>
            <div class="bg-brightnight flex justify-center items-center font-bold text-3xl min-w-11 max-w-11">
              <p>{{ item.awayTeamResult }}</p>
            </div>
            <div class="w-full flex justify-start">
              <div class="cursor-pointer flex items-center" [routerLink]="['../', 'club', item.category, item.awayTeamId]">
                <img [src]="item.awayTeamImageThumbnail" [alt]="item.awayTeamAlt" class="w-9 mx-2"/>
                <p>
                  <span class="hidden md:block">{{ item.awayTeamName }}</span>
                  <span class="block md:hidden font-bold">{{ item.awayTeamAbbreviation }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class FixtureComponent {
  @Input() data!: FixtureCard[];
  Location = faLocationDot;
}