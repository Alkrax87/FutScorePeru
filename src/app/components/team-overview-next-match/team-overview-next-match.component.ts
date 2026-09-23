import { Component, DestroyRef, inject, Input } from '@angular/core';
import { DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../services/fetch-teams.service';
import { FetchTeamsMatchResultsService } from '../../services/fetch-teams-match-results.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { combineLatest, Subscription } from 'rxjs';
import { TeamPageProfile } from '../../interfaces/api-models/teamPageProfile';
import { NextMatch } from '../../interfaces/ui-models/team-overview';

@Component({
  selector: 'app-team-overview-next-match',
  imports: [DatePipe, TitleCasePipe, RouterLink, NgClass],
  template: `
    @if (computedNextMatchData && computedNextMatchData.valid) {
      <div class="bg-light flex flex-col md:flex-row justify-between w-full min-h-fit md:h-96">
        <!-- 1 -->
        <div class="flex flex-col md:flex-row h-auto">
          <div class="bg-nightfall text-light p-4 flex flex-row md:flex-col gap-4 md:gap-2 justify-center items-center md:items-start w-full h-full font-bold text-3xl lg:text-4xl duration-500">
            @switch (category) {
              @case (1) { <img src="assets/images/pages/liga-1.webp" alt="L1-Logo" class="bg-white rounded-full p-1 h-10 w-10"> }
              @case (2) { <img src="assets/images/pages/liga-2.webp" alt="L2-Logo" class="bg-white rounded-full p-1 h-10 w-10"> }
              @case (3) { <img src="assets/images/pages/liga-3.webp" alt="L3-Logo" class="bg-white rounded-full p-1 h-10 w-10"> }
            }
            <div class="flex flex-col">
              <p>PRÓXIMO PARTIDO</p>
            </div>
          </div>
          <div class="
            hidden md:block relative right-[0.1px] w-0 h-0 border-solid
            border-b-[384px] border-r-0 border-t-0 border-l-[96px]
            border-b-transparent border-r-transparent border-t-transparent border-l-nightfall
          "></div>
        </div>
        <!-- 2 -->
        <div class="w-full flex flex-col gap-4 text-night justify-center items-center py-8">
          <div class="bg-gold text-white w-fit px-6 py-1 skew-x-30">
            <p class="-skew-x-30 font-semibold text-sm sm:text-base duration-500">Fecha {{ computedNextMatchData.round }}</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- HomeTeam -->
            <div class="w-fit sm:w-40 lg:w-60 duration-500" [routerLink]="teamId !== computedNextMatchData.homeTeamId ? ['../../', computedNextMatchData.homeTeamId] : null" [ngClass]="{'cursor-pointer': teamId !== computedNextMatchData.homeTeamId}">
              <img [src]="computedNextMatchData.homeTeamImage" [alt]="computedNextMatchData.homeTeamAlt" class="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mx-auto duration-500" />
              <div class="hidden sm:block text-center font-bold text-lg lg:text-xl duration-500">{{ computedNextMatchData.homeTeamName }}</div>
              <div class="sm:hidden text-center font-bold text-xl">{{ computedNextMatchData.homeTeamAbbreviation }}</div>
            </div>
            <!-- Score -->
            @if (computedNextMatchData.homeTeamScore !== null && computedNextMatchData.awayTeamScore !== null) {
              <div class="flex gap-2 font-bold text-4xl sm:text-5xl lg:text-6xl place-content-center truncate duration-500">
                <span>{{ computedNextMatchData.homeTeamScore }}</span>
                <span>-</span>
                <span>{{ computedNextMatchData.awayTeamScore }}</span>
              </div>
            } @else {
              <span class="font-bold text-lg sm:text-xl lg:text-2xl bg-neutral-200 p-2 md:p-4 rounded-full duration-500">VS</span>
            }
            <!-- AwayTeam -->
            <div class="w-fit sm:w-40 lg:w-60 duration-500" [routerLink]="teamId !== computedNextMatchData.awayTeamId ? ['../../', computedNextMatchData.awayTeamId] : null" [ngClass]="{'cursor-pointer': teamId !== computedNextMatchData.awayTeamId}">
              <img [src]="computedNextMatchData.awayTeamImage" [alt]="computedNextMatchData.awayTeamAlt" class="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mx-auto duration-500" />
              <div class="hidden sm:block text-center font-bold text-lg lg:text-xl duration-500">{{ computedNextMatchData.awayTeamName }}</div>
              <div class="sm:hidden text-center font-bold text-xl">{{ computedNextMatchData.awayTeamAbbreviation }}</div>
            </div>
          </div>
          <!-- Date -->
          <div class="text-center">
            <p class="font-semibold text-sm sm:text-base md:text-lg duration-500">{{ computedNextMatchData.date | date:'EEEE d - MMMM' | titlecase }}</p>
            <p class="font-bold text-lg sm:text-xl md:text-2xl -mt-2 duration-500">{{ computedNextMatchData.date | date:'HH:mm'}}</p>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class TeamOverviewNextMatchComponent {
  @Input() nextMatchData!: TeamPageProfile['teamOverviewData']['nextMatch'];
  @Input() category!: number;
  @Input() teamId!: string;

  private divisionService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private uiDataMapperService = inject(UiDataMapperService);
  private destroyRef = inject(DestroyRef);
  private loadDataSub?: Subscription;

  matchDate!: Date;
  computedNextMatchData!: NextMatch;

  ngOnChanges() {
    if (this.nextMatchData && this.category && this.teamId) {
      this.loadData();
    }
  }

  loadData() {
    let division$;
    let teams$;
    let results$;

    switch (this.category) {
      case 1:
        division$ = this.divisionService.divisionL1$;
        teams$ = this.teamsService.teamsL1$;
        results$ = this.teamsMatchResultsService.teamsMatchResultsL1$;
        break;
      case 2:
        division$ = this.divisionService.divisionL2$;
        teams$ = this.teamsService.teamsL2$;
        results$ = this.teamsMatchResultsService.teamsMatchResultsL2$;
        break;
      case 3:
        division$ = this.divisionService.divisionL3$;
        teams$ = this.teamsService.teamsL3$;
        results$ = this.teamsMatchResultsService.teamsMatchResultsL3$;
        break;
      default:
        return;
    }

    if (division$ && teams$ && results$) {
      this.loadDataSub?.unsubscribe();

      this.loadDataSub = combineLatest([division$, teams$, results$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: ([division, teams, results]) => {
          if (division?.phase3.status === true) {
            this.computedNextMatchData = this.uiDataMapperService.overviewNextMatchMapper(teams, this.nextMatchData, results, 'phase2')
          } else if (division?.phase2.status === true) {
            this.computedNextMatchData = this.uiDataMapperService.overviewNextMatchMapper(teams, this.nextMatchData, results, 'phase2')
          } else if (division?.phase1.status === true) {
            this.computedNextMatchData = this.uiDataMapperService.overviewNextMatchMapper(teams, this.nextMatchData, results, 'phase1')
          }
        }
      });
    }
  }
}