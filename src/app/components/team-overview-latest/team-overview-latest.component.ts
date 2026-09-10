import { Component, DestroyRef, inject, Input } from '@angular/core';
import { TeamPageProfile } from '../../interfaces/api-models/teamPageProfile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHome, faPlane } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../services/fetch-teams.service';
import { FetchTeamsMatchResultsService } from '../../services/fetch-teams-match-results.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { combineLatest, Subscription } from 'rxjs';
import { LatestsMatches } from '../../interfaces/ui-models/team-overview';

@Component({
  selector: 'app-team-overview-latest',
  imports: [RouterLink, FaIconComponent],
  template: `
    <div class="flex flex-col text-white">
      <div class="flex">
        <div class="bg-crimson h-8 font-bold px-2 flex items-center w-fit text-nowrap">Últimos partidos</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[32px] border-r-0 border-b-0 border-l-[24px]
          border-t-neutral-100 border-r-neutral-100 border-b-neutral-100 border-l-crimson
        "></div>
        <div class="bg-neutral-100 text-night font-semibold px-2 flex items-center truncate">{{ title }}</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[32px] border-r-0 border-b-0 border-l-[24px]
          border-t-transparent border-r-transparent border-b-transparent border-l-neutral-100
        "></div>
      </div>
      <div class="bg-nightfall w-full text-white grid grid-cols-[repeat(auto-fit,_minmax(95px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-y-5 mx-auto py-5">
        @if (computedLatests.length > 0) {
          @for (item of computedLatests; track $index) {
            <div class="flex flex-col items-center gap-2 w-fit mx-auto">
              <p class="text-sm font-semibold -mb-1">Fecha {{ item.round }}</p>
              @if (item.free) {
                <div class="bg-gold px-3 rounded-full font-semibold">Descansa</div>
              } @else {
                @if (item.homeTeamScore != null && item.awayTeamScore != null) {
                  @if (item.home) {
                    @if (item.homeTeamScore > item.awayTeamScore) {
                      <!-- Gana Local -->
                      <div class="bg-green-600 px-3 rounded-full font-semibold">{{ item.homeTeamScore }} - {{ item.awayTeamScore }}</div>
                    } @else if (item.homeTeamScore < item.awayTeamScore) {
                      <!-- Gana Visita -->
                      <div class="bg-red-600 px-3 rounded-full font-semibold">{{ item.homeTeamScore }} - {{ item.awayTeamScore }}</div>
                    } @else {
                      <!-- Empate -->
                      <div class="bg-neutral-300 text-night px-3 rounded-full font-semibold">{{ item.homeTeamScore }} - {{ item.awayTeamScore }}</div>
                    }
                  } @else {
                    @if (item.awayTeamScore > item.homeTeamScore) {
                      <!-- Gana Visita -->
                      <div class="bg-green-600 px-3 rounded-full font-semibold">{{ item.homeTeamScore }} - {{ item.awayTeamScore }}</div>
                    } @else if (item.awayTeamScore < item.homeTeamScore) {
                      <!-- Gana Local -->
                      <div class="bg-red-600 px-3 rounded-full font-semibold">{{ item.homeTeamScore }} - {{ item.awayTeamScore }}</div>
                    } @else {
                      <!-- Empate -->
                      <div class="bg-neutral-300 text-night px-3 rounded-full font-semibold">{{ item.homeTeamScore }} - {{ item.awayTeamScore }}</div>
                    }
                  }
                }
              }
              @if (item.free) {
                <img [src]="item.homeTeamLogo" [alt]="item.homeTeamAlt" class="w-16"/>
              } @else {
                <a [routerLink]="['../../', item.rivalTeamId]">
                  <img [src]="item.rivalTeamLogo" [alt]="item.rivalTeamAlt" class="w-16"/>
                </a>
              }
              @if (item.home) {
                <div class="bg-brightnight w-8 rounded-full py-1 text-center"><fa-icon [icon]="Home"></fa-icon></div>
              } @else {
                <div class="bg-brightnight w-8 rounded-full py-1 text-center"><fa-icon [icon]="Away"></fa-icon></div>
              }
            </div>
          }
        }
      </div>
      <div class="flex gap-2 mt-2 justify-center text-xs text-neutral-100">
        <div class="bg-nightfall flex gap-2 px-4 py-2 rounded-full">
          <fa-icon [icon]="Home"></fa-icon>
          <p>Local</p>
        </div>
        <div class="bg-nightfall flex gap-2 px-4 py-2 rounded-full">
          <fa-icon [icon]="Away"></fa-icon>
          <p>Visita</p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamOverviewLatestComponent {
  @Input() latestData!: TeamPageProfile['teamOverviewData']['latest'];
  @Input() category!: number;
  @Input() teamId!: string;

  private divisionService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private uiDataMapperService = inject(UiDataMapperService);
  private destroyRef = inject(DestroyRef);
  private loadDataSub?: Subscription;

  title: string = '';
  computedLatests: LatestsMatches[] = [];

  Home = faHome;
  Away = faPlane;

  ngOnChanges() {
    if (this.latestData && this.category && this.teamId) {
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
            this.title = division.phase2.name;
            this.computedLatests = this.uiDataMapperService.overviewLatestMapper(teams, this.latestData.phase2, results, this.teamId, 'phase2')
          } else if (division?.phase2.status === true) {
            this.title = division.phase2.name;
            this.computedLatests = this.uiDataMapperService.overviewLatestMapper(teams, this.latestData.phase2, results, this.teamId, 'phase2')
          } else if (division?.phase1.status === true) {
            this.title = division.phase1.name;
            this.computedLatests = this.uiDataMapperService.overviewLatestMapper(teams, this.latestData.phase1, results, this.teamId, 'phase1')
          }
        }
      });
    }
  }
}