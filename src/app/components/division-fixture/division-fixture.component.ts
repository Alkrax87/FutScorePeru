import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Division } from '../../interfaces/api-models/division';
import { Fixture } from '../../interfaces/api-models/fixture';
import { Team } from '../../interfaces/api-models/team';
import { TeamCP } from '../../interfaces/api-models/team-cp';
import { TeamMatchResults } from '../../interfaces/api-models/teamMatchResults';
import { LoadState } from '../../interfaces/async-state/load-state';
import { FixtureByDate, FixtureMatch } from '../../interfaces/ui-models/fixture-models';
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { FetchFixturesService } from '../../services/fetch-fixtures.service';
import { FetchTeamsMatchResultsService } from '../../services/fetch-teams-match-results.service';
import { FetchTeamsService } from '../../services/fetch-teams.service';
import { MatchesSetupService } from '../../services/matches-setup.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

type CompetitionPhase = 'phase1' | 'phase2';

interface MatchdayPreview {
  round: number | null;
  phaseName: string;
  hasFixture: boolean;
  results: FixtureByDate[];
  upcoming: FixtureByDate[];
}

const idleMatchdayState = (): LoadState<MatchdayPreview> => ({
  status: 'idle',
  data: null,
  error: null,
});

@Component({
  selector: 'app-division-fixture',
  imports: [DatePipe, RouterLink, TitleCasePipe, NgClass, FaIconComponent],
  template: `
    <div class="max-w-screen-xl mx-auto">
      @if (matchdayState.status === 'idle' || matchdayState.status === 'loading') {
        <div class="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-dark" aria-live="polite">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-neutral-700 border-t-main"></div>
          <p class="font-semibold">Cargando la jornada...</p>
        </div>
      } @else if (matchdayState.status === 'error') {
        <div class="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-dark">
          <p class="font-semibold">No se pudo cargar la jornada.</p>
          <button type="button" (click)="loadCategory()" class="font-bold text-main hover:text-main-hover">Reintentar</button>
        </div>
      } @else if (matchdayState.data !== null && !matchdayState.data.hasFixture) {
        <div class="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-dark">
          <p class="text-main text-2xl font-bold">Jornada por definir</p>
          <p class="mt-2 text-sm text-neutral-300">Aún no hay una jornada vigente disponible para esta competencia.</p>
        </div>
      } @else if (matchdayState.data !== null) {
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
          <div>
            <p class="text-sm font-bold text-main">{{ matchdayState.data.phaseName }}</p>
            <h2 class="font-black text-3xl">Fecha {{ matchdayState.data.round }}</h2>
          </div>
        </div>
        <div class="space-y-4">
          @if (matchdayState.data.results.length > 0) {
            <section>
              <h3 class="font-bold text-xl pb-2">Últimos resultados</h3>
              <div class="flex flex-col gap-2">
                @for (group of matchdayState.data.results; track $index) {
                  <div>
                    @if (group.date) {
                      <p class="text-neutral-700 text-sm font-bold">{{ group.date | date: 'EEEE d MMMM' | titlecase }}</p>
                    } @else {
                      <p class="text-neutral-700 text-sm font-bold">Por Definir</p>
                    }
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      @for (match of group.matches; track $index) {
                        <div class="bg-white flex justify-center gap-2 p-2">
                          <!-- Left Team -->
                          <div class="w-full flex justify-end">
                            <a class="flex items-center" [ngClass]="{ 'cursor-pointer': match.home.category !== 4 }" [routerLink]="teamRoute(match.home)">
                              <p class="text-sm">
                                <span class="font-bold">{{ match.home.abbreviation }}</span>
                              </p>
                              <img loading="lazy" [src]="match.home.imageThumbnail" [alt]="match.home.alt" class="w-10 h-10 ml-2" />
                            </a>
                          </div>
                          <!-- Match Result -->
                          <div class="flex min-w-24 gap-1">
                            @if (match.home.result !== null && match.away.result !== null) {
                              <div class="bg-neutral-100 flex justify-center items-center font-bold -my-1 text-3xl w-full">
                                <p>{{ match.home.result }}</p>
                              </div>
                              <div class="bg-neutral-100 flex justify-center items-center font-bold -my-1 text-3xl w-full">
                                <p>{{ match.away.result }}</p>
                              </div>
                            } @else {
                              <div class="flex items-center justify-center -my-1 text-center font-bold w-full">{{ match.date ? (match.date | date: 'H:mm') : '-' }}</div>
                            }
                          </div>
                          <!-- Right Team -->
                          <div class="w-full flex justify-start">
                            <a class="flex items-center" [ngClass]="{ 'cursor-pointer': match.away.category !== 4 }" [routerLink]="teamRoute(match.away)">
                              <img loading="lazy" [src]="match.away.imageThumbnail" [alt]="match.away.alt" class="w-10 h-10 mr-2" />
                              <p class="text-sm">
                                <span class="font-bold">{{ match.away.abbreviation }}</span>
                              </p>
                            </a>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </section>
          }
          @if (matchdayState.data.upcoming.length > 0) {
            <section>
              <h3 class="font-bold text-xl pb-2">Próximos partidos</h3>
              <div class="flex flex-col gap-2">
                @for (group of matchdayState.data.upcoming; track $index) {
                  <div>
                    @if (group.date) {
                      <p class="text-neutral-700 text-sm font-bold">{{ group.date | date: 'EEEE d MMMM' | titlecase }}</p>
                    } @else {
                      <p class="text-neutral-700 text-sm font-bold">Por Definir</p>
                    }
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      @for (match of group.matches; track $index) {
                        <div class="bg-white flex justify-center gap-2 p-2">
                          <!-- Left Team -->
                          <div class="w-full flex justify-end">
                            <a class="flex items-center" [ngClass]="{ 'cursor-pointer': match.home.category !== 4 }" [routerLink]="teamRoute(match.home)">
                              <p class="text-sm">
                                <span class="font-bold">{{ match.home.abbreviation }}</span>
                              </p>
                              <img loading="lazy" [src]="match.home.imageThumbnail" [alt]="match.home.alt" class="w-10 h-10 ml-2" />
                            </a>
                          </div>
                          <!-- Match Result -->
                          <div class="flex min-w-24 gap-1">
                            @if (match.home.result !== null && match.away.result !== null) {
                              <div class="bg-neutral-100 flex justify-center items-center font-bold -my-1 text-3xl w-full">
                                <p>{{ match.home.result }}</p>
                              </div>
                              <div class="bg-neutral-100 flex justify-center items-center font-bold -my-1 text-3xl w-full">
                                <p>{{ match.away.result }}</p>
                              </div>
                            } @else {
                              <div class="flex items-center justify-center -my-1 text-center font-bold w-full">{{ match.date ? (match.date | date: 'H:mm') : '-' }}</div>
                            }
                          </div>
                          <!-- Right Team -->
                          <div class="w-full flex justify-start">
                            <a class="flex items-center" [ngClass]="{ 'cursor-pointer': match.away.category !== 4 }" [routerLink]="teamRoute(match.away)">
                              <img loading="lazy" [src]="match.away.imageThumbnail" [alt]="match.away.alt" class="w-10 h-10 mr-2" />
                              <p class="text-sm">
                                <span class="font-bold">{{ match.away.abbreviation }}</span>
                              </p>
                            </a>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </section>
          }
          @if (matchdayState.data.results.length === 0 && matchdayState.data.upcoming.length === 0) {
            <div class="bg-nightfall px-4 py-10 text-center text-light">
              <p class="font-semibold">No hay partidos cargados para esta jornada.</p>
            </div>
          }
          <!-- full Fixture -->
          <div class="flex justify-end">
            @switch (category) {
              @case (1) { <a routerLink="liga1/fixture" class="inline-flex items-center gap-2 font-bold text-main">Fixture completo <fa-icon [icon]="Arrow"></fa-icon></a> }
              @case (2) { <a routerLink="liga2/fixture" class="inline-flex items-center gap-2 font-bold text-main">Fixture completo <fa-icon [icon]="Arrow"></fa-icon></a> }
              @case (3) { <a routerLink="liga3/fixture" class="inline-flex items-center gap-2 font-bold text-main">Fixture completo <fa-icon [icon]="Arrow"></fa-icon></a> }
              @case (4) { <a routerLink="copa-peru/fixture" class="inline-flex items-center gap-2 font-bold text-main">Fixture completo <fa-icon [icon]="Arrow"></fa-icon></a> }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class DivisionFixtureComponent implements OnChanges {
  @Input() category!: number;

  private destroyRef = inject(DestroyRef);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private fixturesService = inject(FetchFixturesService);
  private matchResultsService = inject(FetchTeamsMatchResultsService);
  private matchesSetupService = inject(MatchesSetupService);

  matchdayState: LoadState<MatchdayPreview> = idleMatchdayState();
  private matchdaySubscription?: Subscription;

  Arrow = faArrowRight;

  ngOnChanges(): void {
    this.loadCategory();
  }

  teamRoute(team: FixtureMatch['home']): string[] | null {
    if (team.category === 4) return null;
    return [`/liga${team.category}`, 'club', team.category.toString(), team.teamId];
  }

  loadCategory(): void {
    this.matchdaySubscription?.unsubscribe();
    this.matchdayState = { status: 'loading', data: null, error: null };

    switch (this.category) {
      case 1:
        this.divisionsService.fetchDivisionL1();
        this.teamsService.fetchTeamsL1();
        this.fixturesService.fetchFixtureL1();
        this.matchResultsService.fetchTeamsMatchResultsL1();
        this.watchMatchday(this.teamsService.teamsL1$, this.divisionsService.divisionL1$, this.fixturesService.fixtureL1$, this.matchResultsService.teamsMatchResultsL1$, false);
        break;
      case 2:
        this.divisionsService.fetchDivisionL2();
        this.teamsService.fetchTeamsL2();
        this.fixturesService.fetchFixtureL2();
        this.matchResultsService.fetchTeamsMatchResultsL2();
        this.watchMatchday(this.teamsService.teamsL2$, this.divisionsService.divisionL2$, this.fixturesService.fixtureL2$, this.matchResultsService.teamsMatchResultsL2$, false);
        break;
      case 3:
        this.divisionsService.fetchDivisionL3();
        this.teamsService.fetchTeamsL3();
        this.fixturesService.fetchFixtureL3();
        this.matchResultsService.fetchTeamsMatchResultsL3();
        this.watchMatchday(this.teamsService.teamsL3$, this.divisionsService.divisionL3$, this.fixturesService.fixtureL3$, this.matchResultsService.teamsMatchResultsL3$, false);
        break;
      case 4:
        this.divisionsService.fetchDivisionCP();
        this.teamsService.fetchTeamsCP();
        this.fixturesService.fetchFixtureCP();
        this.matchResultsService.fetchTeamsMatchResultsCP();
        this.watchMatchday(this.teamsService.teamsCP$, this.divisionsService.divisionCP$, this.fixturesService.fixtureCP$, this.matchResultsService.teamsMatchResultsCP$, true);
        break;
    }
  }

  private watchMatchday<T extends Team | TeamCP>(
    teams$: Observable<LoadState<T[]>>,
    division$: Observable<LoadState<Division>>,
    fixture$: Observable<LoadState<Fixture>>,
    results$: Observable<LoadState<TeamMatchResults[]>>,
    isCopaPeru: boolean,
  ): void {
    this.matchdaySubscription = combineLatest([teams$, division$, fixture$, results$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([teamsState, divisionState, fixtureState, resultsState]) => {
        const errorState = [teamsState, divisionState, fixtureState, resultsState].find(
          (state) => state.status === 'error' && state.data === null,
        );

        if (errorState?.status === 'error') {
          this.matchdayState = { status: 'error', data: null, error: errorState.error };
          return;
        }

        const teams = teamsState.data;
        const division = divisionState.data;
        const fixture = fixtureState.data;
        const results = resultsState.data;
        if (teams === null || division === null || fixture === null || results === null) {
          this.matchdayState = { status: 'loading', data: null, error: null };
          return;
        }

        const activePhase = this.resolveActivePhase(division, isCopaPeru);
        if (!activePhase) {
          this.showUndefinedMatchday();
          return;
        }

        const phaseRounds = fixture[activePhase.phase];
        const roundIndex = this.matchdayIndex(activePhase.inGame, activePhase.isActive);
        const matchday = roundIndex === null ? undefined : phaseRounds[roundIndex];
        if (roundIndex === null || !matchday) {
          this.showUndefinedMatchday(activePhase.name);
          return;
        }

        const mappedMatches = this.matchesSetupService.transformCurrentMatchday(teams as Team[] | TeamCP[], matchday, results, activePhase.phase, roundIndex);
        const matchdayMatches = mappedMatches.flatMap((group) => group.matches);
        const resultGroups = this.filterMatchGroups(mappedMatches, (match) => match.home.result !== null && match.away.result !== null);
        const upcomingGroups = this.filterMatchGroups(mappedMatches, (match) => match.home.result === null || match.away.result === null);

        this.matchdayState = {
          status: 'success',
          data: {
            round: matchday.round,
            phaseName: activePhase.name,
            hasFixture: matchdayMatches.length > 0,
            results: resultGroups,
            upcoming: upcomingGroups,
          },
          error: null,
        };
      });
  }

  private resolveActivePhase(division: Division, isCopaPeru: boolean): { phase: CompetitionPhase; inGame: number; name: string; isActive: boolean } | null {
    if (isCopaPeru) {
      return division.phase1?.status ? { phase: 'phase1', inGame: division.phase1.inGame, name: division.phase1.name, isActive: true } : null;
    }
    if (division.phase3?.status) {
      return { phase: 'phase2', inGame: division.phase2?.inGame, name: division.phase2?.name || division.phase3.name, isActive: true };
    }
    if (division.phase2?.status) {
      return { phase: 'phase2', inGame: division.phase2.inGame, name: division.phase2.name, isActive: true };
    }
    if (division.phase1?.status) {
      return { phase: 'phase1', inGame: division.phase1.inGame, name: division.phase1.name, isActive: true };
    }
    return null;
  }

  private matchdayIndex(inGame: number, phaseIsActive: boolean): number | null {
    if (inGame === 0) return phaseIsActive ? 0 : null;
    if (!Number.isInteger(inGame) || inGame < 1) return null;
    return inGame - 1;
  }

  private filterMatchGroups(groups: FixtureByDate[], include: (match: FixtureMatch) => boolean): FixtureByDate[] {
    return groups.map((group) => ({ ...group, matches: group.matches.filter(include) })).filter((group) => group.matches.length > 0);
  }

  private showUndefinedMatchday(phaseName = ''): void {
    this.matchdayState = {
      status: 'success',
      data: { round: null, phaseName, hasFixture: false, results: [], upcoming: [] },
      error: null,
    };
  }
}