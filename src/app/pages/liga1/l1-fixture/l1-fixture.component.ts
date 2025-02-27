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
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { ResultsDataL1 } from '../../../interfaces/api-models/results-data-l1';
import { FixtureDataL1 } from '../../../interfaces/api-models/fixture-data-l1';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';

@Component({
  selector: 'app-l1-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, CommonModule],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night py-5">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid sm:grid-cols-1 md:grid-cols-2 md:space-x-6 px-8 pb-5">
          <app-btn (click)="setActiveTab('apertura')" [active]="apertura">Apertura</app-btn>
          <app-btn (click)="setActiveTab('clausura')" [active]="clausura">Clausura</app-btn>
        </div>
      </div>
      <div class="flex justify-center px-5">
        <div class="w-full lg:w-4/6">
          @if (apertura) {
            @if (filteredDataForFixtureApertura) {
              <h3 class="text-4xl text-white font-bold">Apertura Fecha {{ selectedRoundAperturaIndex + 1 }}</h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1 my-6">
                @for (round of filteredDataForFixtureApertura; track $index) {
                  <button (click)="selectedRoundAperturaIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson"
                    [ngClass]="{'bg-crimson': selectedRoundAperturaIndex === $index}"
                  >
                    F{{ $index + 1 }}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full mb-6"></div>
              <app-fixture [data]="filteredDataForFixtureApertura[selectedRoundAperturaIndex ? selectedRoundAperturaIndex : 0]"></app-fixture>
            } @else {
              <div class="flex h-64 justify-center items-center select-none">
                <h3 class="text-3xl text-white font-bold">Fixture por definir...</h3>
              </div>
            }
          }
          @if (clausura) {
            @if (filteredDataForFixtureClausura) {
              <h3 class="text-4xl text-white font-bold">Clausura Fecha {{ selectedRoundClausuraIndex + 1 }}</h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1 my-6">
                @for (round of filteredDataForFixtureClausura; track $index) {
                  <button (click)="selectedRoundClausuraIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson"
                    [ngClass]="{'bg-crimson': selectedRoundClausuraIndex === $index}"
                  >
                    F{{ $index + 1 }}
                  </button>
                }
              </div>
              <div class="bg-white skew-x-50 h-2 w-full mb-6"></div>
              <app-fixture [data]="filteredDataForFixtureClausura[selectedRoundClausuraIndex ? selectedRoundClausuraIndex : 0]"></app-fixture>
            } @else {
              <div class="flex h-64 justify-center items-center select-none">
                <h3 class="text-3xl text-white font-bold">Fixture por definir...</h3>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L1FixtureComponent {
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
  apertura: boolean = false;
  clausura: boolean = false;
  selectedRoundAperturaIndex: number = 0;
  selectedRoundClausuraIndex: number = 0;
  dataStadium: StadiumData[] = [];
  dataTeams: TeamDataL1[] = [];
  dataFixture: FixtureDataL1 | null = null;
  dataResults: ResultsDataL1[] = [];
  filteredDataForFixtureApertura: any;
  filteredDataForFixtureClausura: any;

  setActiveTab(tab: String) {
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
  }

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL1$.subscribe({
      next: (data) => {
        this.apertura = data ? data.stages[0].status : false;
        this.clausura = data ? data.stages[1].status : false;
        this.selectedRoundAperturaIndex = data ? data.stages[0].inGame - 1: 0;
        this.selectedRoundClausuraIndex = data ? data.stages[1].inGame - 1: 0;
      }
    });
    this.stadiumSubscription = this.stadiumService.dataStadiums$.subscribe({
      next: (data) => (this.dataStadium = data)
    });
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL1$.subscribe({
      next: (data) => (this.dataFixture = data)
    });
    this.resultsSubscription = this.resultsService.dataResultsL1$.subscribe({
      next: (data) => (this.dataResults = data)
    });
    if (this.dataStadium && this.dataTeams && this.dataFixture && this.dataResults) {
      this.getFixtureData();
    }
  }

  getFixtureData() {
    this.filteredDataForFixtureApertura = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.apertura,
      this.dataResults,
      this.dataStadium,
      'apertura'
    );
    this.filteredDataForFixtureClausura = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.clausura,
      this.dataResults,
      this.dataStadium,
      'clausura'
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