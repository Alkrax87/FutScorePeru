import { Component, inject } from '@angular/core';
import { NgClass, ViewportScroller } from '@angular/common';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';
import { FetchTeamsMatchResultsService } from '../../../services/fetch-teams-match-results.service';
import { FetchFixturesService } from '../../../services/fetch-fixtures.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from "../../../components/title/title.component";
import { FixtureComponent } from "../../../components/fixture/fixture.component";
import { FixtureByDate } from '../../../interfaces/ui-models/fixture-models';

@Component({
  selector: 'app-cp-fixture',
  imports: [TitleComponent, NgClass, FixtureComponent],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        @if (computedFixture && computedFixture.length > 0) {
          <h3 class="text-white text-3xl sm:text-4xl font-bold mb-5 text-center md:text-start duration-500">
            Cruces Zonales <span class="text-crimson">Fecha {{ selectedPhaseIndex + 1 }}</span>
          </h3>
          <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
            @for (round of computedFixture; track $index) {
              <button (click)="selectedPhaseIndex = $index"
                class="w-10 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                [ngClass]="{'bg-crimson': selectedPhaseIndex === $index}"
              >
                F{{ $index + 1 }}
              </button>
            }
          </div>
          <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
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
  private teamsCPService = inject(FetchTeamsCPService);
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
      this.teamsCPService.teamsCP$,
      this.teamsMatchResultsService.teamsMatchResultsCP$,
      this.fixturesService.fixtureCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, matchResults, fixtures]) => {
        this.selectedPhaseIndex = division ? division.phase1.inGame - 1 : 0;

        if (teams && fixtures && matchResults) {
          this.computedFixture = this.matchesService.transformDataForFixtureCP(teams, fixtures.phase1, matchResults, 'phase1');
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}