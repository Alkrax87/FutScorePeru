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
import { FixtureComponent } from "../../../components/fixture/fixture.component";
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';
import { ResultsDataL3 } from '../../../interfaces/api-models/results-data-l3';
import { FixtureDataL3 } from '../../../interfaces/api-models/fixture-data-l3';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';

@Component({
  selector: 'app-l3-fixture',
  imports: [TitleComponent, BtnComponent, CommonModule, FixtureComponent],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night py-5">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid sm:grid-cols-1 md:grid-cols-2 md:space-x-6 px-8 pb-5">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('final')" [active]="final">Fase Final</app-btn>
        </div>
      </div>
      <div class="flex justify-center px-5">
        <div class="w-full lg:2-4/6">
          @if (regional) {
            @if (filteredDataForFixtureRegional1.length > 0 && filteredDataForFixtureRegional2.length > 0 && filteredDataForFixtureRegional3.length > 0 && filteredDataForFixtureRegional4.length > 0) {
              <h3 class="text-4xl text-white font-bold">Regional Fecha {{ selectedRoundRegionalIndex + 1 }}</h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1 my-6">
                @for (round of filteredDataForFixtureRegional2; track $index) {
                  <button (click)="selectedRoundRegionalIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson"
                    [ngClass]="{'bg-crimson': selectedRoundRegionalIndex === $index}"
                  >
                    F{{ $index + 1}}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full mb-6"></div>
              <h3 class="text-4xl text-white font-bold">Grupo 1</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureRegional1[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo 2</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureRegional2[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo 3</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureRegional3[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo 4</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureRegional4[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
            }
          } @else {
            <div class="flex h-64 justify-center items-center select-none">
              <h3 class="text-3xl text-white font-bold">Fixture por definir...</h3>
            </div>
          }
          @if (final) {
            @if (filteredDataForFixtureFinalA.length > 0 && filteredDataForFixtureFinalB.length > 0 && filteredDataForFixtureFinalC.length > 0 && filteredDataForFixtureFinalD.length > 0) {
              <h3 class="text-4xl text-white font-bold">Final Fecha {{ selectedRoundFinalIndex + 1 }}</h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1 my-6">
                @for (round of filteredDataForFixtureFinalA; track $index) {
                  <button (click)="selectedRoundFinalIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson"
                    [ngClass]="{'bg-crimson': selectedRoundFinalIndex === $index}"
                  >
                    F{{ $index + 1}}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full mb-6"></div>
              <h3 class="text-4xl text-white font-bold">Grupo Final 1</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureFinalA[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo Final 2</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureFinalB[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo Final 3</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureFinalC[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
              <h3 class="text-4xl text-white font-bold">Grupo Final 4</h3>
              <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
              <app-fixture [data]="filteredDataForFixtureFinalD[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
            }
          } @else {
            <div class="flex h-64 justify-center items-center select-none">
              <h3 class="text-3xl text-white font-bold">Fixture por definir...</h3>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L3FixtureComponent {
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
  final: boolean = false;
  selectedRoundRegionalIndex: number = 0;
  selectedRoundFinalIndex: number = 0;
  dataStadium: StadiumData[] = [];
  dataTeams: TeamDataL3[] = [];
  dataFixture: FixtureDataL3 | null = null;
  dataResults: ResultsDataL3[] = [];
  filteredDataForFixtureRegional1: any[] = [];
  filteredDataForFixtureRegional2: any[] = [];
  filteredDataForFixtureRegional3: any[] = [];
  filteredDataForFixtureRegional4: any[] = [];
  filteredDataForFixtureFinalA: any[] = [];
  filteredDataForFixtureFinalB: any[] = [];
  filteredDataForFixtureFinalC: any[] = [];
  filteredDataForFixtureFinalD: any[] = [];

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.final = tab === 'final';
  }

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL3$.subscribe({
      next: (data) => {
        this.regional = data ? data.stages[0].status : false;
        this.final = data ? data.stages[1].status : false;
        this.selectedRoundRegionalIndex = data ? data.stages[0].inGame - 1 : 0;
        this.selectedRoundFinalIndex = data ? data.stages[1].inGame - 1 : 0;
      }
    });
    this.stadiumSubscription = this.stadiumService.dataStadiums$.subscribe({
      next: (data) => (this.dataStadium = data)
    });
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL3$.subscribe({
      next: (data) => (this.dataFixture = data)
    });
    this.resultsSubscription = this.resultsService.dataResultsL3$.subscribe({
      next: (data) => (this.dataResults = data)
    });
    if (this.dataStadium && this.dataTeams && this.dataFixture && this.dataResults) {
      this.getFixtureData();
    }
  }

  getFixtureData() {
    this.filteredDataForFixtureRegional1 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regular1,
      this.dataResults,
      this.dataStadium,
      "regional"
    );
    this.filteredDataForFixtureRegional2 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regular2,
      this.dataResults,
      this.dataStadium,
      "regional"
    );
    this.filteredDataForFixtureRegional3 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regular3,
      this.dataResults,
      this.dataStadium,
      "regional"
    );
    this.filteredDataForFixtureRegional4 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regular4,
      this.dataResults,
      this.dataStadium,
      "regional"
    );
    this.filteredDataForFixtureFinalA = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalA,
      this.dataResults,
      this.dataStadium,
      "final"
    );
    this.filteredDataForFixtureFinalB = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalB,
      this.dataResults,
      this.dataStadium,
      "final"
    );
    this.filteredDataForFixtureFinalC = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalC,
      this.dataResults,
      this.dataStadium,
      "final"
    );
    this.filteredDataForFixtureFinalD = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalD,
      this.dataResults,
      this.dataStadium,
      "final"
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