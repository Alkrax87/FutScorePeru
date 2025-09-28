import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { BtnComponent } from "../../../components/btn/btn.component";
import { FixtureComponent } from '../../../components/fixture/fixture.component';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ResultsData } from '../../../interfaces/api-models/results-data';
import { FixtureData } from '../../../interfaces/api-models/fixture-data';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';

@Component({
  selector: 'app-l2-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, CommonModule],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night p-5">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid sm:grid-cols-1 md:grid-cols-2 md:space-x-6 px-8">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('grupos')" [active]="grupos">Fase Grupos</app-btn>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="w-full lg:w-5/6 xl:w-4/6 duration-500">
          @if (regional) {
            @if (filteredDataForFixtureRegionalA && filteredDataForFixtureRegionalB) {
              <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
                Regional <span class="text-crimson">Fecha {{ selectedRoundRegionalIndex + 1 }}</span>
              </h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
                @for (round of filteredDataForFixtureRegionalB; track $index) {
                  <button (click)="selectedRoundRegionalIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                    [ngClass]="{'bg-crimson': selectedRoundRegionalIndex === $index}"
                  >
                    F{{ $index + 1}}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
              <h3 class="text-4xl text-white font-bold">Grupo A</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureRegionalA[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold mt-3">Grupo B</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureRegionalB[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
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
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                    [ngClass]="{'bg-crimson': selectedRoundGruposIndex === $index}"
                  >
                    F{{ $index + 1}}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
              <h3 class="text-4xl text-white font-bold">Grupo Ascenso 1</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureGruposPromotionA[selectedRoundGruposIndex ? selectedRoundGruposIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo Ascenso 2</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureGruposPromotionB[selectedRoundGruposIndex ? selectedRoundGruposIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo Descenso</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureGruposRelegation[selectedRoundGruposIndex ? selectedRoundGruposIndex : 0]"></app-fixture>
            } @else {
              <div class="flex h-64 justify-center items-center select-none">
                <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L2FixtureComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private fixtureService: FetchFixtureService,
    private resultsService: FetchResultsService,
    private stadiumService: FetchStadiumService,
    private matchesService: MatchesSetupService
  ) {}

  private divisionSubscription: Subscription | null = null;
  private stadiumSubscription: Subscription | null = null;
  private teamSubscription: Subscription | null = null;
  private fixtureSubscription: Subscription | null = null;
  private resultsSubscription: Subscription | null = null;
  regional: boolean = false;
  grupos: boolean = false;
  selectedRoundRegionalIndex: number = 0;
  selectedRoundGruposIndex: number = 0;
  dataStadium: StadiumData[] = [];
  dataTeams: TeamData[] = [];
  dataFixture: FixtureData | null = null;
  dataResults: ResultsData[] = [];
  filteredDataForFixtureRegionalA: any;
  filteredDataForFixtureRegionalB: any;
  filteredDataForFixtureGruposPromotionA: any;
  filteredDataForFixtureGruposPromotionB: any;
  filteredDataForFixtureGruposRelegation: any;

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
  }

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL2$.subscribe({
      next: (data) => {
        if (data?.thirdPhase.status === true) {
          this.grupos = true;
        } else {
          this.regional = data ? data.firstPhase.status : false;
          this.grupos = data ? data.secondPhase.status : false;
        }
        this.selectedRoundRegionalIndex = data ? data.firstPhase.inGame - 1: 0;
        this.selectedRoundGruposIndex = data ? data.secondPhase.inGame - 1: 0;
      }
    });
    this.stadiumSubscription = this.stadiumService.dataStadiums$.subscribe({
      next: (data) => (this.dataStadium = data)
    });
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL2$.subscribe({
      next: (data) => (this.dataFixture = data)
    });
    this.resultsSubscription = this.resultsService.dataResultsL2$.subscribe({
      next: (data) => (this.dataResults = data)
    });
    if (this.dataStadium && this.dataTeams && this.dataFixture && this.dataResults) {
      this.getFixtureData();
    }
  }

  getFixtureData() {
    this.filteredDataForFixtureRegionalA = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regionalA,
      this.dataResults,
      this.dataStadium,
      "regional",
      2
    );
    this.filteredDataForFixtureRegionalB = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regionalB,
      this.dataResults,
      this.dataStadium,
      "regional",
      2
    );
    this.filteredDataForFixtureGruposPromotionA = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.gruposPromotionA,
      this.dataResults,
      this.dataStadium,
      "grupos",
      2
    );
    this.filteredDataForFixtureGruposPromotionB = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.gruposPromotionB,
      this.dataResults,
      this.dataStadium,
      "grupos",
      2
    );
    this.filteredDataForFixtureGruposRelegation = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.gruposRelegation,
      this.dataResults,
      this.dataStadium,
      "grupos",
      2
    );
  }

  ngOnDestroy() {
    this.divisionSubscription?.unsubscribe();
    this.stadiumSubscription?.unsubscribe();
    this.teamSubscription?.unsubscribe();
    this.fixtureSubscription?.unsubscribe();
    this.resultsSubscription?.unsubscribe();
  }
}