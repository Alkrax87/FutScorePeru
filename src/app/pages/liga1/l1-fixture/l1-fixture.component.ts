import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { Subscription } from 'rxjs';
import { FixtureComponent } from "../../../components/fixture/fixture.component";
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { FixtureCard } from '../../../interfaces/ui-models/fixture-card';
import { ResultsDataL1 } from '../../../interfaces/api-models/results-data-l1';

@Component({
  selector: 'app-l1-fixture',
  imports: [FixtureComponent],
  template: `
    <div class="bg-night w-full flex justify-center p-5">
      <div class="w-full lg:w-4/6">
        <h3 class="text-white text-4xl font-bold">Fecha {{ selectedRoundIndex + 1 }}</h3>
        <div class="flex flex-wrap justify-center gap-1 mt-4">
          @for (round of filteredDataForFixtureApertura; track $index) {
            <button (click)="selectedRoundIndex = $index" class="w-10 h-10 bg-brightnight text-white rounded-full hover:bg-crimson">
              F{{ $index + 1 }}
            </button>
          }
        </div>
        <div class="bg-white skew-x-50 h-2 w-full my-6"></div>
        <app-fixture [data]="filteredDataForFixtureApertura[selectedRoundIndex]"></app-fixture>
      </div>
    </div>
  `,
  styles: ``,
})
export class L1FixtureComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private fixtureService: FetchFixtureService,
    private resultsService: FetchResultsService,
    private stadiumService: FetchStadiumService
  ) {}

  private teamSubscription: Subscription | null = null;
  private fixtureSubscription: Subscription | null = null;
  private resultsSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  dataFixtureApertura: any;
  dataFixtureClausura: any;
  dataResults: ResultsDataL1[] = [];
  filteredDataForFixtureApertura: any;
  filteredDataForFixtureClausura: any;
  selectedRoundIndex: number = 0;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL1$.subscribe({
      next: (data) => {
        this.dataFixtureApertura = data[0].apertura;
        this.dataFixtureClausura = data[0].clausura;
      }
    });
    this.resultsSubscription = this.resultsService.dataResultsL1$.subscribe({
      next: (data) => (this.dataResults = data)
    });
    if (this.dataTeams && this.dataFixtureApertura && this.dataResults) {
      this.getDataForFixture();
    }
  }

  async getDataForFixture() {
    const mergedData = [];
    if (this.dataTeams && this.dataFixtureApertura && this.dataResults) {
      const teamMap = new Map(this.dataTeams.map((team) => [team.teamId, team]));
      const resultsMap = new Map(this.dataResults.map((result:any) => [result.teamId, result]));

      let index = 0;

      for (const key of this.dataFixtureApertura) {
        const rounds: FixtureCard[] = [];

        for (const element of key) {
          const homeTeam = teamMap.get(element.home);
          const awayTeam = teamMap.get(element.away);
          if (homeTeam && awayTeam) {
            // const stadium = await this.stadiumService.fetchStadium(homeTeam.stadium.url);
            const stadium = {name: "In Development"}

            const homeResults = resultsMap.get(homeTeam.teamId);
            const awayResults = resultsMap.get(awayTeam.teamId);

            const resultHome = homeResults.apertura[index]?.score ?? "";
            const resultAway = awayResults.apertura[index]?.score ?? "";

            rounds.push({
              stadium: stadium.name,
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
        if (rounds.length > 0) {
          mergedData.push(rounds);
        }
        index++;
      }
    }

    this.filteredDataForFixtureApertura = mergedData;
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.fixtureSubscription?.unsubscribe();
    this.resultsSubscription?.unsubscribe();
  }
}