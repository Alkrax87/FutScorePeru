import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { BtnComponent } from "../../../components/btn/btn.component";
import { FixtureComponent } from "../../../components/fixture/fixture.component";
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { FixtureCard } from '../../../interfaces/ui-models/fixture-card';
import { ResultsDataL1 } from '../../../interfaces/api-models/results-data-l1';
import { FixtureDataL1 } from '../../../interfaces/api-models/fixture-data-l1';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';

@Component({
  selector: 'app-l1-fixture',
  imports: [TitleComponent, FixtureComponent, BtnComponent],
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
          @if (apertura && filteredDataForFixtureApertura) {
            <h3 class="text-4xl text-white font-bold">Apertura Fecha {{ selectedRoundAperturaIndex + 1 }}</h3>
            <div class="flex flex-wrap justify-center gap-1 my-6">
              @for (round of filteredDataForFixtureApertura; track $index) {
                <button (click)="selectedRoundAperturaIndex = $index" class="w-10 h-10 bg-brightnight text-white rounded-full hover:bg-crimson">
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full mb-6"></div>
            <app-fixture [data]="filteredDataForFixtureApertura[selectedRoundAperturaIndex ? selectedRoundAperturaIndex : 0]"></app-fixture>
          }
          @if (clausura && filteredDataForFixtureClausura) {
            <h3 class="text-4xl text-white font-bold">Clausura Fecha {{ selectedRoundClausuraIndex + 1 }}</h3>
            <div class="flex flex-wrap justify-center gap-1 my-6">
              @for (round of filteredDataForFixtureClausura; track $index) {
                <button (click)="selectedRoundClausuraIndex = $index" class="w-10 h-10 bg-brightnight text-white rounded-full hover:bg-crimson">
                  F{{ $index + 1 }}
                </button>
              }
            </div>
            <div class="bg-white skew-x-50 h-2 w-full mb-6"></div>
            <app-fixture [data]="filteredDataForFixtureClausura[selectedRoundClausuraIndex ? selectedRoundClausuraIndex : 0]"></app-fixture>
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
    private stadiumService: FetchStadiumService
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
      this.getDataForFixture();
    }
  }

  async getDataForFixture() {
    if (!this.dataTeams || !this.dataFixture || !this.dataResults) return;

    const stadiumMap = new Map(this.dataStadium.map((stadium) => [stadium.stadiumId, stadium]));
    const teamMap = new Map(this.dataTeams.map((team) => [team.teamId, team]));
    const resultsMap = new Map(this.dataResults.map((result) => [result.teamId, result]));

    let indexApertura = 0;
    let indexClausura = 0;
    const mergedDataApertura = [];
    const mergedDataClausura = [];

    for (const key of this.dataFixture.apertura) {
      const rounds: FixtureCard[] = [];

      for (const element of key) {
        const homeTeam = teamMap.get(element.home);
        const awayTeam = teamMap.get(element.away);

        if (homeTeam && awayTeam) {
          const stadium = stadiumMap.get(homeTeam.stadium);
          const homeResults = resultsMap.get(homeTeam.teamId);
          const awayResults = resultsMap.get(awayTeam.teamId);

          const resultHome = homeResults?.apertura[indexApertura] ?? "";
          const resultAway = awayResults?.apertura[indexApertura] ?? "";

          rounds.push({
            stadium: stadium?.name ? stadium.name : "Sin Determinar",
            team1: homeTeam.name,
            team2: awayTeam.name,
            abbreviation1: homeTeam.abbreviation,
            abbreviation2: awayTeam.abbreviation,
            logo1: homeTeam.image,
            logo2: awayTeam.image,
            alt1: homeTeam.alt,
            alt2: awayTeam.alt,
            result1: resultHome,
            result2: resultAway,
          });
        }
      }
      if (rounds.length > 0) { mergedDataApertura.push(rounds) }
      indexApertura++;
    }

    for (const key of this.dataFixture.clausura) {
      const rounds: FixtureCard[] = [];

      for (const element of key) {
        const homeTeam = teamMap.get(element.home);
        const awayTeam = teamMap.get(element.away);

        if (homeTeam && awayTeam) {
          const stadium = stadiumMap.get(homeTeam.stadium);
          const homeResults = resultsMap.get(homeTeam.teamId);
          const awayResults = resultsMap.get(awayTeam.teamId);

          const resultHome = homeResults?.clausura[indexClausura] ?? "";
          const resultAway = awayResults?.clausura[indexClausura] ?? "";

          rounds.push({
            stadium: stadium?.name ? stadium.name : "Sin Determinar",
            team1: homeTeam.name,
            team2: awayTeam.name,
            abbreviation1: homeTeam.abbreviation,
            abbreviation2: awayTeam.abbreviation,
            logo1: homeTeam.image,
            logo2: awayTeam.image,
            alt1: homeTeam.alt,
            alt2: awayTeam.alt,
            result1: resultHome,
            result2: resultAway,
          });
        }
      }
      if (rounds.length > 0) { mergedDataClausura.push(rounds) }
      indexClausura++;
    }

    this.filteredDataForFixtureApertura = mergedDataApertura;
    this.filteredDataForFixtureClausura = mergedDataClausura;
  }

  ngOnDestroy() {
    this.divisionSubscription?.unsubscribe();
    this.stadiumSubscription?.unsubscribe();
    this.teamSubscription?.unsubscribe();
    this.fixtureSubscription?.unsubscribe();
    this.resultsSubscription?.unsubscribe();
  }
}