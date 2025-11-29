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
  selector: 'app-l2-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, CommonModule],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 px-4 md:px-0">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('grupos')" [active]="grupos">Fase Grupos</app-btn>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto">
        @if (regional) {
          @if (filteredDataForFixtureRegionalA && filteredDataForFixtureRegionalB) {
            <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
              Regional <span class="text-crimson">Fecha {{ selectedRoundRegionalIndex + 1 }}</span>
            </h3>
            <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
              @for (round of filteredDataForFixtureRegionalB; track $index) {
                <button (click)="selectedRoundRegionalIndex = $index"
                  class="w-10 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                  [ngClass]="{'bg-crimson': selectedRoundRegionalIndex === $index}"
                >
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
            <div class="flex flex-col gap-4">
              <div>
                <div class="w-fit">
                  <h3 class="text-3xl text-white font-bold">Grupo A</h3>
                  <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                </div>
                <app-fixture [data]="filteredDataForFixtureRegionalA[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
              </div>
              <div>
                <div class="w-fit">
                  <h3 class="text-3xl text-white font-bold">Grupo B</h3>
                  <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                </div>
                <app-fixture [data]="filteredDataForFixtureRegionalB[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
              </div>
            </div>
          } @else {
            <div class="flex h-64 justify-center items-center select-none">
              <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
            </div>
          }
        }
        @if (grupos) {
          @if (filteredDataForFixtureGruposPromotionA && filteredDataForFixtureGruposPromotionB && filteredDataForFixtureGruposRelegation) {
            <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
              Grupos <span class="text-crimson">Fecha {{ selectedRoundGruposIndex + 1 }}</span>
            </h3>
            <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
              @for (round of filteredDataForFixtureGruposPromotionA; track $index) {
                <button (click)="selectedRoundGruposIndex = $index"
                  class="w-10 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                  [ngClass]="{'bg-crimson': selectedRoundGruposIndex === $index}"
                >
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
            <div class="flex flex-col gap-4">
              <div>
                <div class="w-fit">
                  <h3 class="text-3xl text-white font-bold">Grupo Ascenso 1</h3>
                  <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                </div>
                <app-fixture [data]="filteredDataForFixtureGruposPromotionA[selectedRoundGruposIndex ? selectedRoundGruposIndex : 0]"></app-fixture>
              </div>
              <div>
                <div class="w-fit">
                  <h3 class="text-3xl text-white font-bold">Grupo Ascenso 2</h3>
                  <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                </div>
                <app-fixture [data]="filteredDataForFixtureGruposPromotionB[selectedRoundGruposIndex ? selectedRoundGruposIndex : 0]"></app-fixture>
              </div>
              <div>
                <div class="w-fit">
                  <h3 class="text-3xl text-white font-bold">Grupo Descenso</h3>
                  <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                </div>
                <app-fixture [data]="filteredDataForFixtureGruposRelegation[selectedRoundGruposIndex ? selectedRoundGruposIndex : 0]"></app-fixture>
              </div>
            </div>
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
export class L2FixtureComponent {
  private divisionService = inject(FetchDivisionService);
  private teamsService = inject(FetchTeamDataService);
  private fixtureService = inject(FetchFixtureService);
  private resultsService = inject(FetchResultsService);
  private stadiumService = inject(FetchStadiumService);
  private matchesService = inject(MatchesSetupService);

  regional: boolean = false;
  grupos: boolean = false;
  selectedRoundRegionalIndex: number = 0;
  selectedRoundGruposIndex: number = 0;
  filteredDataForFixtureRegionalA: any;
  filteredDataForFixtureRegionalB: any;
  filteredDataForFixtureGruposPromotionA: any;
  filteredDataForFixtureGruposPromotionB: any;
  filteredDataForFixtureGruposRelegation: any;

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.fixtureService.dataFixtureL2$,
      this.resultsService.dataResultsL2$,
      this.stadiumService.dataStadiums$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, fixture, results, stadiums]) => {
        if (division?.thirdPhase.status === true) {
          this.grupos = true;
        } else {
          this.regional = division ? division.firstPhase.status : false;
          this.grupos = division ? division.secondPhase.status : false;
        }
        this.selectedRoundRegionalIndex = division ? division.firstPhase.inGame - 1 : 0;
        this.selectedRoundGruposIndex = division ? division.secondPhase.inGame - 1 : 0;
        this.filteredDataForFixtureRegionalA = this.matchesService.transformDataForFixture(teams, fixture?.regionalA, results, stadiums, 'regional', 2);
        this.filteredDataForFixtureRegionalB = this.matchesService.transformDataForFixture(teams, fixture?.regionalB, results, stadiums, 'regional', 2);
        this.filteredDataForFixtureGruposPromotionA = this.matchesService.transformDataForFixture(teams, fixture?.gruposPromotionA, results, stadiums, 'grupos', 2);
        this.filteredDataForFixtureGruposPromotionB = this.matchesService.transformDataForFixture(teams, fixture?.gruposPromotionB, results, stadiums, 'grupos', 2);
        this.filteredDataForFixtureGruposRelegation = this.matchesService.transformDataForFixture(teams, fixture?.gruposRelegation, results, stadiums, 'grupos', 2);
      }
    });
  }

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
  }
}