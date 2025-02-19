import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FixtureCard } from '../../interfaces/ui-models/fixture-card';

@Component({
  selector: 'app-fixture',
  imports: [FontAwesomeModule],
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
            <div class="w-full flex justify-end items-center">
              <p>
                <span class="hidden md:block">{{ item.team1 }}</span>
                <span class="block md:hidden font-bold">{{ item.abbreviation1 }}</span>
              </p>
              <img [src]="item.logo1" [alt]="item.alt1" class="w-9 mx-2"/>
            </div>
            <div class="bg-brightnight flex justify-center items-center font-bold text-3xl min-w-11 max-w-11">
              <p>{{ item.result1 }}</p>
            </div>
            <div class="bg-brightnight flex justify-center items-center font-bold text-3xl min-w-11 max-w-11">
              <p>{{ item.result2 }}</p>
            </div>
            <div class="w-full flex justify-start items-center">
              <img [src]="item.logo2" [alt]="item.alt2" class="w-9 mx-2"/>
              <p>
                <span class="hidden md:block">{{ item.team2 }}</span>
                <span class="block md:hidden font-bold">{{ item.abbreviation2 }}</span>
              </p>
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
