import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { FixtureComponent } from '../../../components/fixture/fixture.component';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ResultsData } from '../../../interfaces/api-models/results-data';
import { FixtureData } from '../../../interfaces/api-models/fixture-data';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';

@Component({
  selector: 'app-l3-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, CommonModule],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night p-3 sm:p-5 duration-500 select-none">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 px-4 md:px-0">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('final')" [active]="final">Fase Final</app-btn>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="w-full lg:w-5/6 xl:w-4/6 duration-500">
          @if (regional) {
            @if (filteredDataForFixtureRegional1 && filteredDataForFixtureRegional2 && filteredDataForFixtureRegional3 && filteredDataForFixtureRegional4) {
              <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
                Regional <span class="text-crimson">Fecha {{ selectedRoundRegionalIndex + 1 }}</span>
              </h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
                @for (round of filteredDataForFixtureRegional2; track $index) {
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
                    <h3 class="text-3xl text-white font-bold">Grupo 1</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureRegional1[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
                </div>
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo 2</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureRegional2[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
                </div>
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo 3</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureRegional3[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
                </div>
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo 4</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureRegional4[selectedRoundRegionalIndex ? selectedRoundRegionalIndex : 0]"></app-fixture>
                </div>
              </div>
            } @else {
              <div class="flex h-64 justify-center items-center select-none">
                <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
              </div>
            }
          }
          @if (final) {
            @if (filteredDataForFixtureFinalA && filteredDataForFixtureFinalB && filteredDataForFixtureFinalC && filteredDataForFixtureFinalD) {
              <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
                Final <span class="text-crimson">Fecha {{ selectedRoundFinalIndex + 1 }}</span>
              </h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
                @for (round of filteredDataForFixtureFinalA; track $index) {
                  <button (click)="selectedRoundFinalIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-xs bg-brightnight text-white hover:bg-crimson outline-none duration-300"
                    [ngClass]="{'bg-crimson': selectedRoundFinalIndex === $index}"
                  >
                    F{{ $index + 1 }}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full my-5"></div>
              <div class="flex flex-col gap-4">
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo Final 1</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureFinalA[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
                </div>
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo Final 2</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureFinalB[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
                </div>
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo Final 3</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureFinalC[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
                </div>
                <div>
                  <div class="w-fit">
                    <h3 class="text-3xl text-white font-bold">Grupo Final 4</h3>
                    <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
                  </div>
                  <app-fixture [data]="filteredDataForFixtureFinalD[selectedRoundFinalIndex ? selectedRoundFinalIndex : 0]"></app-fixture>
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
  dataTeams: TeamData[] = [];
  dataFixture: FixtureData | null = null;
  dataResults: ResultsData[] = [];
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
        if (data?.thirdPhase.status === true) {
          this.final = true;
        } else {
          this.regional = data ? data.firstPhase.status : false;
          this.final = data ? data.secondPhase.status : false;
        }
        this.selectedRoundRegionalIndex = data ? data.firstPhase.inGame - 1 : 0;
        this.selectedRoundFinalIndex = data ? data.secondPhase.inGame - 1 : 0;
      },
    });
    this.stadiumSubscription = this.stadiumService.dataStadiums$.subscribe({
      next: (data) => (this.dataStadium = data),
    });
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => (this.dataTeams = data),
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL3$.subscribe({
      next: (data) => (this.dataFixture = data),
    });
    this.resultsSubscription = this.resultsService.dataResultsL3$.subscribe({
      next: (data) => (this.dataResults = data),
    });
    if (this.dataStadium && this.dataTeams && this.dataFixture && this.dataResults) {
      this.getFixtureData();
    }
  }

  getFixtureData() {
    this.filteredDataForFixtureRegional1 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regional1,
      this.dataResults,
      this.dataStadium,
      'regional',
      3
    );
    this.filteredDataForFixtureRegional2 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regional2,
      this.dataResults,
      this.dataStadium,
      'regional',
      3
    );
    this.filteredDataForFixtureRegional3 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regional3,
      this.dataResults,
      this.dataStadium,
      'regional',
      3
    );
    this.filteredDataForFixtureRegional4 = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.regional4,
      this.dataResults,
      this.dataStadium,
      'regional',
      3
    );
    this.filteredDataForFixtureFinalA = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalA,
      this.dataResults,
      this.dataStadium,
      'final',
      3
    );
    this.filteredDataForFixtureFinalB = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalB,
      this.dataResults,
      this.dataStadium,
      'final',
      3
    );
    this.filteredDataForFixtureFinalC = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalC,
      this.dataResults,
      this.dataStadium,
      'final',
      3
    );
    this.filteredDataForFixtureFinalD = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.finalD,
      this.dataResults,
      this.dataStadium,
      'final',
      3
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