import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { SortDataTableService } from '../../../services/sort-data-table.service';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../../components/table/table.component';
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';
import { PerformanceDataL2 } from '../../../interfaces/api-models/performance-data-l2';
import { LastGamesDataL2 } from '../../../interfaces/api-models/last-games-data-l2';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l2-table',
  imports: [TableComponent],
  template: `
    <div class="bg-night py-5">
      <h3 class="text-4xl text-white font-bold mx-5 mb-5">Grupo Norte</h3>
      <app-table [config]="configGrupos" [headers]="headers" [classification]="classificationGrupos" [data]="dataRegionalN"></app-table>
      <h3 class="text-4xl text-white font-bold mx-5 my-5">Grupo Sur</h3>
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
    { class: 'bg-promotion', quantity: 6 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 2 },
  ];
  classificationGrupos = [
    {
      name: 'Grupo de Ascenso',
      image: 'assets/images/pages/Promotion.svg',
      class: 'bg-promotion',
    },
    {
      name: 'Grupo de Descenso',
      image: 'assets/images/pages/Relegation.svg',
      class: 'bg-relegation',
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

      switch (team.group) {
        case "norte":
          sortTeamsRegionalN.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional,
          });
          break;
        case "sur":
          sortTeamsRegionalS.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional,
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