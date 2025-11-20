import { Component, Input } from '@angular/core';
import { TeamFixture } from '../../interfaces/ui-models/team-fixture';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-fixture',
  imports: [RouterLink],
  template: `
    <div class="grid gap-x-3 sm:gap-x-5 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] max-w-screen-xl mx-auto duration-500 select-none">
      @for (item of teamFixture; track $index) {
        @if (item.free) {
          <div>
            <div class="flex relative top-4">
              <div class="bg-crimson w-24 px-3 text-center font-semibold flex items-center justify-center">Fecha {{ $index + 1 }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[32px] border-r-0 border-b-0 border-l-[32px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-crimson
              "></div>
            </div>
            <div class="bg-white dark:bg-nightfall py-12 px-3 duration-500 flex justify-center items-center gap-2">
              <img [routerLink]="['../', item.homeTeamId]" [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16 cursor-pointer"/>
              <p class="text-brightnight dark:text-white text-2xl font-bold duration-500">Descansa</p>
            </div>
          </div>
        } @else {
          <div>
            <div class="flex relative top-4">
              <div class="bg-crimson w-24 px-3 text-center font-semibold flex items-center justify-center">Fecha {{ $index + 1 }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[32px] border-r-0 border-b-0 border-l-[32px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-crimson
              "></div>
            </div>
            <div class="bg-white dark:bg-nightfall py-12 px-3 duration-500">
              <div class="flex justify-between mx-auto">
                <img [routerLink]="['../', item.homeTeamId]" [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16 cursor-pointer"/>
                <div class="flex items-center gap-1 font-bold text-5xl text-brightnight dark:text-white duration-500">
                  <p>{{ item.homeTeamScore }}</p>
                  <p>-</p>
                  <p>{{ item.awayTeamScore }}</p>
                </div>
                <img [routerLink]="['../', item.awayTeamId]" [src]="item.awayTeamLogo" [alt]="item.awayTeamAlt" class="w-16 cursor-pointer"/>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class TeamFixtureComponent {
  @Input() teamFixture!: TeamFixture[];
}