import { Component, inject, Input } from '@angular/core';
import { TeamFixture } from '../../interfaces/ui-models/team-fixture';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FetchPageProfileService } from '../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-team-fixture',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  template: `
    <div class="grid gap-x-3 sm:gap-x-5 grid-cols-[repeat(auto-fit,_minmax(306px,_1fr))] max-w-screen-xl mx-auto duration-500 select-none">
      @for (item of teamFixture; track $index) {
        @if (item.free) {
          <div>
            <div class="flex relative top-4">
              <div class="bg-crimson text-white w-24 px-2 text-center font-semibold flex items-center justify-center">Fecha {{ item.round }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[32px] border-r-0 border-b-0 border-l-[32px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-crimson
              "></div>
            </div>
            <div class="bg-white dark:bg-nightfall h-44 px-3 duration-500 flex justify-center items-center gap-2">
              <img [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16"/>
              <p class="text-brightnight dark:text-white text-xl font-bold duration-500">Descansa</p>
            </div>
          </div>
        } @else {
          <div>
            <div class="flex relative top-4">
              <div class="bg-crimson text-white w-24 px-2 text-center font-semibold flex items-center justify-center">Fecha {{ item.round }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[32px] border-r-0 border-b-0 border-l-[32px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-crimson
              "></div>
            </div>
            <div class="bg-white dark:bg-nightfall min-h-40 py-8 px-3 duration-500">
              @if (item.postponed) {
                <div class="skew-x-50 bg-crimson w-fit text-white mx-auto"><div class="-skew-x-50 text-xs px-4 font-semibold">Pospuesto</div></div>
              } @else {
                <div class="skew-x-50 bg-gold w-fit text-white mx-auto"><div class="-skew-x-50 text-xs px-4 font-semibold">{{ item.date ? (item.date | date:'EEEE d MMMM' | titlecase) : 'Por Definir' }}</div></div>
              }
              <div class="flex w-full h-24 items-center justify-between mx-auto">
                <div class="flex flex-col items-center w-1/3">
                  @if (teamId === item.homeTeamId) {
                    <img [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16"/>
                    <p class="text-xs font-semibold text-center dark:text-white duration-500">{{ item.homeTeamName }}</p>
                  } @else {
                    <img [routerLink]="['../../', item.homeTeamId]" [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16 cursor-pointer"/>
                    <p [routerLink]="['../../', item.homeTeamId]" class="text-xs font-semibold text-center dark:text-white cursor-pointer duration-500">{{ item.homeTeamName }}</p>
                  }
                </div>
                <div class="flex w-1/3 items-center justify-center gap-1 font-bold text-5xl text-brightnight dark:text-white duration-500">
                  <p>{{ item.homeTeamScore }}</p>
                  <p>-</p>
                  <p>{{ item.awayTeamScore }}</p>
                </div>
                <div class="flex flex-col items-center w-1/3">
                  @if (teamId === item.awayTeamId) {
                    <img [src]="item.awayTeamLogo" [alt]="item.awayTeamAlt" class="w-16"/>
                    <p class="text-xs font-semibold text-center dark:text-white duration-500">{{ item.awayTeamName }}</p>
                  } @else {
                    <img [routerLink]="['../../', item.awayTeamId]" [src]="item.awayTeamLogo" [alt]="item.awayTeamAlt" class="w-16 cursor-pointer"/>
                    <p [routerLink]="['../../', item.awayTeamId]" class="text-xs font-semibold text-center dark:text-white cursor-pointer duration-500">{{ item.awayTeamName }}</p>
                  }
                </div>
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

  private fetchPageProfile = inject(FetchPageProfileService);
  teamId!: string;

  constructor() {
    this.fetchPageProfile.team$.pipe(takeUntilDestroyed()).subscribe({
      next: (team) => (this.teamId = team!.teamData.teamId),
    });
  }
}