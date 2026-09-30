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

@Component({
  selector: 'app-cp-fixture',
  imports: [TitleComponent, NgClass, FixtureComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        @if (computedFixture && computedFixture.length > 0) {
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
          <app-fixture [data]="computedFixture[selectedPhaseIndex ? selectedPhaseIndex : 0]"></app-fixture>
        } @else {
          <div class="flex h-64 justify-center items-center select-none">
            <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
          </div>
        }
      </div>
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
  computedFixture: FixtureByDate[][] = [];

  constructor() {
    this.fixturesService.fetchFixtureCP();
    this.teamsMatchResultsService.fetchTeamsMatchResultsCP();

    combineLatest([
      this.divisionsService.divisionCP$,
      this.teamsService.teamsCP$,
      this.teamsMatchResultsService.teamsMatchResultsCP$,
      this.fixturesService.fixtureCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([divisionState, teamsState, matchResultsState, fixtureState]) => {
        const division = divisionState.data;
        this.selectedPhaseIndex = division?.phase1?.inGame ? division.phase1.inGame - 1 : 0;

        if (teamsState.data !== null && fixtureState.data !== null && matchResultsState.data !== null) {
          this.computedFixture = this.matchesService.transformDataForFixtureCP(teamsState.data, fixtureState.data.phase1, matchResultsState.data, 'phase1');
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}