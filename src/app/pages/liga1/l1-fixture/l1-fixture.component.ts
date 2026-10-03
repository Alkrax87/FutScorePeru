import { Component, inject } from '@angular/core';
import { NgClass, ViewportScroller } from '@angular/common';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsMatchResultsService } from '../../../services/fetch-teams-match-results.service';
import { FetchFixturesService } from '../../../services/fetch-fixtures.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { FixtureComponent } from '../../../components/fixture/fixture.component';
import { FixtureByDate } from '../../../interfaces/ui-models/fixture-models';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-l1-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, NgClass, SubtitleComponent, FaIconComponent],
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
        <!-- Switch -->
        <div class="max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
          <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Apertura</app-btn>
          <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Clausura</app-btn>
        </div>
        <!-- Content -->
        <div class="max-w-screen-xl mx-auto">
          <!-- Phase 1 -->
          @if (phase1) {
            @if (computedFixturePhase1.length > 0) {
              <app-subtitle>Apertura <span class="text-main">Fecha {{ selectedPhase1Index + 1 }}</span></app-subtitle>
              <div class="flex flex-wrap justify-center gap-1 my-4 duration-500">
                @for (round of computedFixturePhase1; track $index) {
                  <button (click)="selectedPhase1Index = $index"
                    class="w-12 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-main outline-none duration-300"
                    [ngClass]="{'bg-main': selectedPhase1Index === $index}"
                  >
                    F{{ $index + 1 }}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full my-4"></div>
              @if (computedFixturePhase1[selectedPhase1Index].length) {
                <app-fixture [data]="computedFixturePhase1[selectedPhase1Index]"></app-fixture>
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
          }
          <!-- Phase 2 -->
          @if (phase2) {
            @if (computedFixturePhase2.length > 0) {
              <app-subtitle>Clausura <span class="text-main">Fecha {{ selectedPhase2Index + 1 }}</span></app-subtitle>
              <div class="flex flex-wrap justify-center gap-1 my-4 duration-500">
                @for (round of computedFixturePhase2; track $index) {
                  <button (click)="selectedPhase2Index = $index"
                    class="w-12 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-main outline-none duration-300"
                    [ngClass]="{'bg-main': selectedPhase2Index === $index}"
                  >
                    F{{ $index + 1 }}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full my-4"></div>
              @if (computedFixturePhase2[selectedPhase2Index].length) {
                <app-fixture [data]="computedFixturePhase2[selectedPhase2Index]"></app-fixture>
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
          }
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class L1FixtureComponent {
  private viewPortScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private fixturesService = inject(FetchFixturesService);
  private matchesService = inject(MatchesSetupService);

  phase1: boolean = false;
  phase2: boolean = false;
  selectedPhase1Index: number = 0;
  selectedPhase2Index: number = 0;

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  computedFixturePhase1: FixtureByDate[][] = [];
  computedFixturePhase2: FixtureByDate[][] = [];

  Fixture = faWindowRestore;
  Error = faTriangleExclamation;

  constructor() {
    this.fixturesService.fetchFixtureL1();
    this.teamsMatchResultsService.fetchTeamsMatchResultsL1();

    combineLatest([
      this.divisionsService.divisionL1$,
      this.teamsService.teamsL1$,
      this.teamsMatchResultsService.teamsMatchResultsL1$,
      this.fixturesService.fixtureL1$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([divisionState, teamsState, teamsMatchResultsState, fixtureState]) => {
        if (
          divisionState.status === 'success' && teamsState.status === 'success' && teamsMatchResultsState.status === 'success' && fixtureState.status === 'success' &&
          divisionState.data !== null && teamsState.data !== null && teamsMatchResultsState.data !== null && fixtureState.data !== null
        ) {
          this.phase1 = divisionState.data.phase1.status || false;
          this.phase2 = divisionState.data.phase2.status || divisionState.data.phase3.status || false;
          this.selectedPhase1Index = divisionState.data.phase1.inGame ? divisionState.data.phase1.inGame - 1 : 0;
          this.selectedPhase2Index = divisionState.data.phase2.inGame ? divisionState.data.phase2.inGame - 1 : 0;

          this.computedFixturePhase1 = this.matchesService.transformDataForFixture(teamsState.data, fixtureState.data.phase1, teamsMatchResultsState.data, 'phase1');
          this.computedFixturePhase2 = this.matchesService.transformDataForFixture(teamsState.data, fixtureState.data.phase2, teamsMatchResultsState.data, 'phase2');
          this.loadingState = 'success';
        } else if (divisionState.status === 'error' || teamsState.status === 'error' || teamsMatchResultsState.status === 'error' || fixtureState.status === 'error') {
          this.loadingState = 'error';
        } else {
          this.loadingState = 'loading';
        }
      },
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}