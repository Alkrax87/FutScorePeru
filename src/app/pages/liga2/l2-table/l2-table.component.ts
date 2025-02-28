import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { SortDataTableService } from '../../../services/sort-data-table.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { TableComponent } from '../../../components/table/table.component';
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';
import { PerformanceDataL2 } from '../../../interfaces/api-models/performance-data-l2';
import { LastGamesDataL2 } from '../../../interfaces/api-models/last-games-data-l2';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l2-table',
  imports: [TitleComponent, TableComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-5">
      <div class="mx-4 md:mx-8 mb-5">
        <h3 class="text-4xl text-white font-bold">Grupo A</h3>
        <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
      </div>
      <app-table [config]="configGrupos" [headers]="headers" [classification]="classificationGrupos" [data]="dataRegionalN"></app-table>
      <div class="mx-4 md:mx-8 my-5">
        <h3 class="text-4xl text-white font-bold">Grupo B</h3>
        <div class="bg-crimson skew-x-50 h-2 w-44 my-3"></div>
      </div>
      <app-table [config]="configGrupos" [headers]="headers" [classification]="classificationGrupos" [data]="dataRegionalS"></app-table>
    </div>
  `,
  styles: ``,
})
export class L2TableComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private sortDataService: SortDataTableService
  ) {}

  private teamSubscription: Subscription | null = null;
  private performanceSubscription: Subscription | null = null;
  private lastGamesSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] = [];
  dataPerformance: PerformanceDataL2[] = [];
  dataLastGames: LastGamesDataL2[] = [];
  headers: string[] = [
    '',
    'Pos',
    'Club',
    'PTS',
    'PJ',
    'PG',
    'PE',
    'PP',
    'GF',
    'GC',
    'DIF',
    'Últimas 5 Fechas',
  ];
  dataRegionalN: TeamTable[] = [];
  dataRegionalS: TeamTable[] = [];
  configGrupos: { class: string; quantity: number }[] = [
    { class: 'bg-gpromotion', quantity: 5 },
    { class: '', quantity: 0 },
    { class: 'bg-grelegation', quantity: 3 },
  ];
  classificationGrupos = [
    {
      name: 'Grupo de Ascenso',
      image: 'assets/images/pages/Group-Promotion.svg',
      class: 'bg-gpromotion',
    },
    {
      name: 'Grupo de Descenso',
      image: 'assets/images/pages/Group-Relegation.svg',
      class: 'bg-grelegation',
    },
  ];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.performanceSubscription = this.performanceService.dataPerformanceL2$.subscribe({
      next: (data) => (this.dataPerformance = data)
    });
    this.lastGamesSubscription = this.lastGamesService.dataLastGamesL2$.subscribe({
      next: (data) => (this.dataLastGames = data)
    });

    if (this.dataTeams && this.dataPerformance && this.dataLastGames) {
      this.getDataForTable();
    }
  }

  getDataForTable() {
    const performanceMap = new Map(this.dataPerformance.map((performance) => [performance.teamId, performance]));
    const lastGamesMap = new Map(this.dataLastGames.map((lastGames) => [lastGames.teamId, lastGames]));

    let sortTeamsRegionalN: TeamTable[] = [];
    let sortTeamsRegionalS: TeamTable[] = [];

    for (const team of this.dataTeams) {
      const baseTeamData = {
        name: team.name,
        abbreviation: team.abbreviation,
        image: team.image,
        alt: team.alt,
        url: team.url,
      }
      const performance = performanceMap.get(team.teamId);
      const lastGames = lastGamesMap.get(team.teamId);

      if (!performance || !lastGames) return;

      switch (team.groupFirstPhase) {
        case "a":
          sortTeamsRegionalN.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional.slice(-5),
          });
          break;
        case "b":
          sortTeamsRegionalS.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional.slice(-5),
          });
          break;
        default:
          break;
      }
    }

    this.dataRegionalN = this.sortDataService.sortTeams(sortTeamsRegionalN);
    this.dataRegionalS = this.sortDataService.sortTeams(sortTeamsRegionalS);
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.performanceSubscription?.unsubscribe();
    this.lastGamesSubscription?.unsubscribe();
  }
}