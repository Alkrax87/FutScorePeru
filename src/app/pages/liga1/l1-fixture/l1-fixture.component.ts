import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { combineLatest } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { FixtureComponent } from '../../../components/fixture/fixture.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-l1-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, CommonModule],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 px-4 md:px-0">
          <app-btn (click)="setActiveTab('apertura')" [active]="apertura">Apertura</app-btn>
          <app-btn (click)="setActiveTab('clausura')" [active]="clausura">Clausura</app-btn>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto">
        @if (apertura) {
          @if (filteredDataForFixtureApertura) {
            <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
              Apertura <span class="text-crimson">Fecha {{ selectedRoundAperturaIndex + 1 }}</span>
            </h3>
            <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
              @for (round of filteredDataForFixtureApertura; track $index) {
                <button (click)="selectedRoundAperturaIndex = $index"
                  class="w-10 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                  [ngClass]="{'bg-crimson': selectedRoundAperturaIndex === $index}"
                >
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
            <app-fixture [data]="filteredDataForFixtureApertura[selectedRoundAperturaIndex ? selectedRoundAperturaIndex : 0]"></app-fixture>
          } @else {
            <div class="flex h-64 justify-center items-center select-none">
              <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
            </div>
          }
        }
        @if (clausura) {
          @if (filteredDataForFixtureClausura) {
            <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
              Clausura <span class="text-crimson">Fecha {{ selectedRoundClausuraIndex + 1 }}</span>
            </h3>
            <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
              @for (round of filteredDataForFixtureClausura; track $index) {
                <button (click)="selectedRoundClausuraIndex = $index"
                  class="w-10 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                  [ngClass]="{'bg-crimson': selectedRoundClausuraIndex === $index}"
                >
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
            <app-fixture [data]="filteredDataForFixtureClausura[selectedRoundClausuraIndex ? selectedRoundClausuraIndex : 0]"></app-fixture>
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
export class L1FixtureComponent {
  private divisionService = inject(FetchDivisionService);
  private teamsService = inject(FetchTeamDataService);
  private fixtureService = inject(FetchFixtureService);
  private resultsService = inject(FetchResultsService);
  private stadiumService = inject(FetchStadiumService);
  private matchesService = inject(MatchesSetupService);

  apertura: boolean = false;
  clausura: boolean = false;
  selectedRoundAperturaIndex: number = 0;
  selectedRoundClausuraIndex: number = 0;
  filteredDataForFixtureApertura: any;
  filteredDataForFixtureClausura: any;

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.fixtureService.dataFixtureL1$,
      this.resultsService.dataResultsL1$,
      this.stadiumService.dataStadiums$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, fixture, results, stadiums]) => {
        this.apertura = division ? division.firstPhase.status : false;
        this.clausura = division ? division.secondPhase.status : false;
        this.selectedRoundAperturaIndex = division ? division.firstPhase.inGame - 1 : 0;
        this.selectedRoundClausuraIndex = division ? division.secondPhase.inGame - 1 : 0;
        this.filteredDataForFixtureApertura = this.matchesService.transformDataForFixture(teams, fixture?.apertura, results, stadiums, 'apertura', 1);
        this.filteredDataForFixtureClausura = this.matchesService.transformDataForFixture(teams, fixture?.clausura, results, stadiums, 'clausura', 1);
      }
    });
  }

  setActiveTab(tab: String) {
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
  }
}