import { Component, inject } from '@angular/core';
import { NgClass, ViewportScroller } from '@angular/common';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsMatchResultsService } from '../../../services/fetch-teams-match-results.service';
import { FetchFixturesService } from '../../../services/fetch-fixtures.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from "../../../components/title/title.component";
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { FixtureComponent } from "../../../components/fixture/fixture.component";
import { FixtureByDate } from '../../../interfaces/ui-models/fixture-models';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cp-fixture',
  imports: [TitleComponent, NgClass, FixtureComponent, SubtitleComponent, FaIconComponent],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      @if (loadingState === 'idle' || loadingState === 'loading') {
        <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-main"></div>
          <p class="font-semibold">Cargando fixture...</p>
        </div>
      } @else if (loadingState === 'error') {
        <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
          <fa-icon [icon]="Error" class="text-4xl text-main"></fa-icon>
          <p class="font-semibold">No se pudo cargar el fixture.</p>
        </div>
      } @else {
        <!-- Content -->
        <div class="max-w-screen-xl mx-auto">
          @if (computedFixture.length > 0) {
            <app-subtitle>Cruces Zonales <span class="text-main">Fecha {{ selectedPhaseIndex + 1 }}</span></app-subtitle>
            <div class="flex flex-wrap justify-center gap-1 my-4 duration-500">
              @for (round of computedFixture; track $index) {
                <button (click)="selectedPhaseIndex = $index"
                  class="w-12 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-main outline-none duration-300"
                  [ngClass]="{'bg-main': selectedPhaseIndex === $index}"
                >
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full my-4"></div>
            @if (computedFixture[selectedPhaseIndex].length) {
              <app-fixture [data]="computedFixture[selectedPhaseIndex]"></app-fixture>
            } @else {
              <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
                <fa-icon [icon]="Fixture" class="text-4xl text-main"></fa-icon>
                <p class="font-semibold">Partidos por definir.</p>
              </div>
            }
          } @else {
            <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
              <fa-icon [icon]="Fixture" class="text-4xl text-main"></fa-icon>
              <p class="font-semibold">Fixture por definir.</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class CpFixtureComponent {
  private viewPortScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private fixturesService = inject(FetchFixturesService);
  private matchesService = inject(MatchesSetupService);

  selectedPhaseIndex: number = 0;

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  computedFixture: FixtureByDate[][] = [];

  Fixture = faWindowRestore;
  Error = faTriangleExclamation;

  constructor() {
    this.fixturesService.fetchFixtureCP();
    this.teamsMatchResultsService.fetchTeamsMatchResultsCP();

    combineLatest([
      this.divisionsService.divisionCP$,
      this.teamsService.teamsCP$,
      this.teamsMatchResultsService.teamsMatchResultsCP$,
      this.fixturesService.fixtureCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([divisionState, teamsState, teamsMatchResultsState, fixtureState]) => {
        if (
          divisionState.status === 'success' && teamsState.status === 'success' && teamsMatchResultsState.status === 'success' && fixtureState.status === 'success' &&
          divisionState.data !== null && teamsState.data !== null && teamsMatchResultsState.data !== null && fixtureState.data !== null
        ) {
          this.selectedPhaseIndex = divisionState.data.phase1.inGame ? divisionState.data.phase1.inGame - 1 : 0;

          this.computedFixture = this.matchesService.transformDataForFixtureCP(teamsState.data, fixtureState.data.phase1, teamsMatchResultsState.data, 'phase1');
          this.loadingState = 'success';
        } else if (divisionState.status === 'error' || teamsState.status === 'error' || teamsMatchResultsState.status === 'error' || fixtureState.status === 'error') {
          this.loadingState = 'error';
        } else {
          this.loadingState = 'loading';
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}