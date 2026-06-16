import { Component, inject, Input } from '@angular/core';
import { NextMatch } from '../../interfaces/ui-models/team-overview';
import { FetchPageProfileService } from '../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-overview-next-match',
  imports: [DatePipe, TitleCasePipe, RouterLink],
  template: `
    @if (matchData && matchData.valid) {
      <div class="bg-neutral-100 flex justify-between w-full h-96">
        <!-- 1 -->
        <div class="flex h-full">
          <div class="bg-nightfall text-white py-5 pl-5 flex flex-col gap-2 justify-center w-full h-full font-bold text-4xl">
            @switch (category) {
              @case (1) { <img src="assets/images/pages/liga-1.webp" alt="Logo" class="bg-white rounded-full p-1 h-10 w-10"> }
              @case (2) { <img src="assets/images/pages/liga-2.webp" alt="Logo" class="bg-white rounded-full p-1 h-10 w-10"> }
              @case (3) { <img src="assets/images/pages/liga-3.webp" alt="Logo" class="bg-white rounded-full p-1 h-10 w-10"> }
            }
            <p>PRÓXIMO PARTIDO</p>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2 w-32"></div>
          </div>
          <div class="
            relative right-[0.1px] w-0 h-0 border-solid
            border-b-[384px] border-r-0 border-t-0 border-l-[96px]
            border-b-transparent  border-r-transparent border-t-transparent border-l-nightfall
          "></div>
        </div>
        <!-- 2 -->
        <div class="w-full flex flex-col gap-5 text-night justify-center items-center">
          <div class="bg-gold text-white w-fit px-6 py-0.5 skew-x-30 -mb-5">
            <p class="-skew-x-30 font-semibold text-sm sm:text-base duration-500">Fecha {{ matchData.round }}</p>
          </div>
          <div class="flex items-center gap-5">
            @if (teamId === matchData.homeTeamId) {
              <div class="w-60">
                <img [src]="matchData.homeTeamImage" [alt]="matchData.homeTeamAlt" class="w-40 mx-auto"/>
                <div class="hidden sm:block text-center font-bold text-xl">{{ matchData.homeTeamName }}</div>
                <div class="sm:hidden text-center font-bold text-xl">{{ matchData.homeTeamAbbreviation }}</div>
              </div>
            } @else {
              <div [routerLink]="['../../', matchData.homeTeamId]" class="cursor-pointer w-60">
                <img [src]="matchData.homeTeamImage" [alt]="matchData.homeTeamAlt" class="w-40 mx-auto"/>
                <div class="hidden sm:block text-center font-bold text-xl">{{ matchData.homeTeamName }}</div>
                <div class="sm:hidden text-center font-bold text-xl">{{ matchData.homeTeamAbbreviation }}</div>
              </div>
            }
            <span class="font-bold text-2xl bg-neutral-200 p-4 rounded-full">VS</span>
            @if (teamId === matchData.awayTeamId) {
              <div class="w-60">
                <img [src]="matchData.awayTeamImage" [alt]="matchData.awayTeamAlt" class="w-40 mx-auto"/>
                <div class="hidden sm:block text-center font-bold text-xl">{{ matchData.awayTeamName }}</div>
                <div class="sm:hidden text-center font-bold text-xl">{{ matchData.awayTeamAbbreviation }}</div>
              </div>
            } @else {
              <div [routerLink]="['../../', matchData.awayTeamId]" class="cursor-pointer w-60">
                <img [src]="matchData.awayTeamImage" [alt]="matchData.awayTeamAlt" class="w-40 mx-auto"/>
                <div class="hidden sm:block text-center font-bold text-xl">{{ matchData.awayTeamName }}</div>
                <div class="sm:hidden text-center font-bold text-xl">{{ matchData.awayTeamAbbreviation }}</div>
              </div>
            }
          </div>
          <div class="text-center">
            <p class="font-bold text-xl">{{ matchData.date | date:'EEEE d, MMMM' | titlecase}}</p>
            <p class="font-bold text-3xl">{{ matchData.date | date:'HH:mm'}}</p>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class TeamOverviewNextMatchComponent {
  @Input() matchData!: NextMatch;

  private fetchPageProfile = inject(FetchPageProfileService);
  teamId!: string;
  category!: number;
  matchDate!: Date;

  constructor() {
    this.fetchPageProfile.team$.pipe(takeUntilDestroyed()).subscribe({
      next: (team) => {
        this.teamId = team!.teamData.teamId;
        this.category = team!.teamData.category;
      },
    });
  }
}
