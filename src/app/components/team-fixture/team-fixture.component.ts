import { Component, inject, Input } from '@angular/core';
import { TeamFixture } from '../../interfaces/ui-models/team-fixture';
import { RouterLink } from '@angular/router';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { FetchPageProfileService } from '../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-team-fixture',
  imports: [RouterLink, DatePipe, TitleCasePipe, NgClass],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 duration-500">
      @for (item of teamFixture; track $index) {
        @if (item.free) {
          <div>
            <div class="flex relative top-4">
              <div class="bg-main text-white w-24 px-2 text-center font-semibold flex items-center justify-center">Fecha {{ item.round }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[32px] border-r-0 border-b-0 border-l-[32px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-main
              "></div>
            </div>
            <div class="bg-white dark:bg-nightfall h-48 px-2 duration-500 flex justify-center items-center gap-2">
              <img [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16"/>
              <p class="text-brightnight dark:text-white text-xl font-bold duration-500">Descansa</p>
            </div>
          </div>
        } @else {
          <div>
            <div class="flex relative top-4">
              <div class="bg-main text-white w-24 px-2 text-center font-semibold flex items-center justify-center">Fecha {{ item.round }}</div>
              <div class="
                relative right-[0.1px] w-0 h-0 border-solid
                border-t-[32px] border-r-0 border-b-0 border-l-[32px]
                border-t-transparent  border-r-transparent border-b-transparent border-l-main
              "></div>
            </div>
            <div class="bg-white dark:bg-nightfall text-brightnight dark:text-light min-h-40 py-9 px-2 sm:px-4 duration-500">
              @if (item.postponed) {
                <div class="skew-x-30 bg-main w-fit text-white mx-auto"><div class="-skew-x-30 text-xs px-4 py-1 font-semibold">Pospuesto</div></div>
              } @else {
                <div class="skew-x-30 bg-gold w-fit text-white mx-auto"><div class="-skew-x-30 text-xs px-4 py-1 font-semibold">{{ item.date ? (item.date | date:'EEEE d MMMM' | titlecase) : 'Por Definir' }}</div></div>
              }
              <div class="flex w-full h-24 items-center">
                <!-- HomeTeam -->
                <div class="flex flex-col items-center text-center w-1/3" [ngClass]="{ 'cursor-pointer': teamId !== item.homeTeamId }" [routerLink]="teamId !== item.homeTeamId ? ['../../', item.homeTeamId] : null">
                  <img [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16 h-16" />
                  <p class="text-xs font-semibold">{{ item.homeTeamName }}</p>
                </div>
                <!-- Score -->
                @if (item.homeTeamScore !== null && item.awayTeamScore !== null) {
                  <div class="flex w-1/3 items-center justify-center gap-1 font-bold text-5xl">
                    <span>{{ item.homeTeamScore }}</span>
                    <span>-</span>
                    <span>{{ item.awayTeamScore }}</span>
                  </div>
                } @else {
                  <div class="flex w-1/3 items-center justify-center">
                    <span class="flex items-center justify-center font-bold text-lg bg-neutral-200 dark:bg-brightnight dark:text-light w-12 h-12 rounded-full duration-500">VS</span>
                  </div>
                }
                <!-- AwayTeam -->
                <div class="flex flex-col items-center text-center w-1/3" [ngClass]="{ 'cursor-pointer': teamId !== item.awayTeamId }" [routerLink]="teamId !== item.awayTeamId ? ['../../', item.awayTeamId] : null">
                  <img [src]="item.awayTeamLogo" [alt]="item.awayTeamAlt" class="w-16 h-16" />
                  <p class="text-xs font-semibold">{{ item.awayTeamName }}</p>
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