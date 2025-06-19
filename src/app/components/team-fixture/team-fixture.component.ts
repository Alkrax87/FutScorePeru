import { Component, Input } from '@angular/core';
import { TeamFixture } from '../../interfaces/ui-models/team-fixture';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-fixture',
  imports: [RouterLink],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      @for (item of teamFixture; track $index) {
        @if (item.free) {
          <div>
            <div class="flex flex-col items-center">
              <p class="font-semibold text-lg">Fecha {{ $index + 1 }}</p>
              <div class="bg-crimson skew-x-50 h-1 w-28 mb-2"></div>
            </div>
            <div class="bg-nightfall text-white flex gap-1 h-11">
              <div class="w-full flex justify-center items-center font-semibold">
                <img [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-8 mx-1"/> Descansa
              </div>
            </div>
          </div>
        } @else {
          <div>
            <div class="flex flex-col items-center">
              <p class="font-semibold text-lg">Fecha {{ $index + 1 }}</p>
              <div class="bg-crimson skew-x-50 h-1 w-28 mb-2"></div>
            </div>
            <div class="bg-nightfall text-white flex gap-1 h-11">
              <div class="w-full flex justify-end items-center">
                <img [routerLink]="['../', item.homeTeamId]" [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-8 mx-1 cursor-pointer"/>
              </div>
              <div class="bg-brightnight flex justify-center items-center font-bold text-3xl min-w-10 max-w-10">
                <p>{{ item.homeTeamScore }}</p>
              </div>
              <div class="bg-brightnight flex justify-center items-center font-bold text-3xl min-w-10 max-w-10">
                <p>{{ item.awayTeamScore }}</p>
              </div>
              <div class="w-full flex justify-start items-center">
                <img [routerLink]="['../', item.awayTeamId]" [src]="item.awayTeamLogo" [alt]="item.awayTeamAlt" class="w-8 mx-1 cursor-pointer"/>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``
})
export class TeamFixtureComponent {
  @Input() teamFixture!:TeamFixture[];
}