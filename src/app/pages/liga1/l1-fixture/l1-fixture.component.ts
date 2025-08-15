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
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ResultsData } from '../../../interfaces/api-models/results-data';
import { FixtureData } from '../../../interfaces/api-models/fixture-data';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';

@Component({
  selector: 'app-l1-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent, CommonModule],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <div class="bg-night p-5">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-6/12 grid sm:grid-cols-1 md:grid-cols-2 md:space-x-6 px-8">
          <app-btn (click)="setActiveTab('apertura')" [active]="apertura">Apertura</app-btn>
          <app-btn (click)="setActiveTab('clausura')" [active]="clausura">Clausura</app-btn>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="w-full lg:w-5/6 xl:w-4/6 duration-500">
          @if (apertura) {
            @if (filteredDataForFixtureApertura) {
              <h3 class="text-white text-3xl sm:text-4xl font-bold my-5 text-center md:text-start duration-500">
                Apertura <span class="text-crimson">Fecha {{ selectedRoundAperturaIndex + 1 }}</span>
              </h3>
              <div class="flex flex-wrap md:flex-nowrap justify-center gap-1">
                @for (round of filteredDataForFixtureApertura; track $index) {
                  <button (click)="selectedRoundAperturaIndex = $index"
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson outline-none duration-300"
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
                    class="w-10 h-10 md:w-full max-w-16 text-sm bg-brightnight text-white hover:bg-crimson outline-none duration-300"
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
  dataTeams: TeamData[] = [];
  dataFixture: FixtureData | null = null;
  dataResults: ResultsData[] = [];
  filteredDataForFixtureApertura: any;
  filteredDataForFixtureClausura: any;

  setActiveTab(tab: String) {
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
  }

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL1$.subscribe({
      next: (data) => {
        this.apertura = data ? data.firstPhase.status : false;
        this.clausura = data ? data.secondPhase.status : false;
        this.selectedRoundAperturaIndex = data ? data.firstPhase.inGame - 1: 0;
        this.selectedRoundClausuraIndex = data ? data.secondPhase.inGame - 1: 0;
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
      'apertura',
      1
    );
    this.filteredDataForFixtureClausura = this.matchesService.transformDataForFixture(
      this.dataTeams,
      this.dataFixture?.clausura,
      this.dataResults,
      this.dataStadium,
      'clausura',
      1
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