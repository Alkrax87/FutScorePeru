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

@Component({
  selector: 'app-l3-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, NgClass, SubtitleComponent],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Switch -->
      <div class="max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
        <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Fase Regional</app-btn>
        <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Fase Final</app-btn>
      </div>
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        <!-- Phase 1 -->
        @if (phase1) {
          @if (computedFixturePhase1 && computedFixturePhase1.length > 0) {
            <app-subtitle>Fase Regional <span class="text-main">Fecha {{ selectedPhase1Index + 1 }}</span></app-subtitle>
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
            <app-fixture [data]="computedFixturePhase1[selectedPhase1Index ? selectedPhase1Index : 0]"></app-fixture>
          } @else {
            <div class="flex h-64 justify-center items-center select-none">
              <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
            </div>
          }
        }
        <!-- Phase 2 -->
        @if (phase2) {
          @if (computedFixturePhase2 && computedFixturePhase2.length > 0) {
            <app-subtitle>Fase Final <span class="text-main">Fecha {{ selectedPhase2Index + 1 }}</span></app-subtitle>
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
            <app-fixture [data]="computedFixturePhase2[selectedPhase2Index ? selectedPhase2Index : 0]"></app-fixture>
          } @else {
            <div class="flex h-64 justify-center items-center select-none">
              <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L3FixtureComponent {
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
  computedFixturePhase1: FixtureByDate[][] = [];
  computedFixturePhase2: FixtureByDate[][] = [];

  constructor() {
    this.fixturesService.fetchFixtureL3();
    this.teamsMatchResultsService.fetchTeamsMatchResultsL3();

    combineLatest([
      this.divisionsService.divisionL3$,
      this.teamsService.teamsL3$,
      this.teamsMatchResultsService.teamsMatchResultsL3$,
      this.fixturesService.fixtureL3$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, teamsMatchResults, fixture]) => {
        this.phase1 = division?.phase1.status || false;
        this.phase2 = division?.phase2.status || division?.phase3.status || false;
        this.selectedPhase1Index = division?.phase1?.inGame ? division.phase1.inGame - 1 : 0;
        this.selectedPhase2Index = division?.phase2?.inGame ? division.phase2.inGame - 1 : 0;

        if (teams && fixture && teamsMatchResults) {
          this.computedFixturePhase1 = this.matchesService.transformDataForFixture(teams, fixture.phase1, teamsMatchResults, 'phase1');
          this.computedFixturePhase2 = this.matchesService.transformDataForFixture(teams, fixture.phase2, teamsMatchResults, 'phase2');
        }
      }
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