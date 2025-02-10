import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { SortDataTableService } from '../../../services/sort-data-table.service';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../../components/table/table.component';
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';
import { PerformanceDataL3 } from '../../../interfaces/api-models/performance-data-l3';
import { LastGamesDataL3 } from '../../../interfaces/api-models/last-games-data-l3';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l3-table',
  imports: [TableComponent],
  template: `
    <div class="bg-night py-5">
      <h3 class="text-4xl text-white font-bold mx-5 my-5">Grupo Norte</h3>
      <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataGrupoNorte"></app-table>
      <h3 class="text-4xl text-white font-bold mx-5 my-5">Grupo Centro</h3>
      <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataGrupoCentro"></app-table>
      <h3 class="text-4xl text-white font-bold mx-5 my-5">Grupo Sur</h3>
      <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataGrupoSur"></app-table>
      <h3 class="text-4xl text-white font-bold mx-5 my-5">Grupo Metro-Selva</h3>
      <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataGrupoMetroSelva"></app-table>
    </div>
  `,
  styles: ``,
})
export class L3TableComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private sortDataService: SortDataTableService
  ) {}

  private teamSubscription: Subscription | null = null;
  private performanceSubscription: Subscription | null = null;
  private lastGamesSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] = [];
  dataPerformance: PerformanceDataL3[] = [];
    dataLastGames: LastGamesDataL3[] = [];
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
  dataGrupoNorte: TeamTable[] = [];
  dataGrupoCentro: TeamTable[] = [];
  dataGrupoSur: TeamTable[] = [];
  dataGrupoMetroSelva: TeamTable[] = [];
  configRegional: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 4 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 1 },
  ];
  classificationRegional = [
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
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.performanceSubscription = this.performanceService.dataPerformanceL3$.subscribe({
      next: (data) => (this.dataPerformance = data)
    });
    this.lastGamesSubscription = this.lastGamesService.dataLastGamesL3$.subscribe({
      next: (data) => (this.dataLastGames = data)
    });

    if (this.dataTeams && this.dataPerformance && this.dataLastGames) {
      this.getDataForTable();
    }
  }

  getDataForTable() {
    const performanceMap = new Map(this.dataPerformance.map((performance) => [performance.teamId, performance]));
    const lastGamesMap = new Map(this.dataLastGames.map((lastGames) => [lastGames.teamId, lastGames]));

    let sortTeamsN: TeamTable[] = [];
    let sortTeamsC: TeamTable[] = [];
    let sortTeamsS: TeamTable[] = [];
    let sortTeamsMS: TeamTable[] = [];

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
          sortTeamsN.push({
            ...baseTeamData,
            performance: performance.regular,
            lastgames: lastGames.regular,
          });
          break;
        case "centro":
          sortTeamsC.push({
            ...baseTeamData,
            performance: performance.regular,
            lastgames: lastGames.regular,
          });
          break;
        case "sur":
          sortTeamsS.push({
            ...baseTeamData,
            performance: performance.regular,
            lastgames: lastGames.regular,
          });
          break;
        case "metro-selva":
          sortTeamsMS.push({
            ...baseTeamData,
            performance: performance.regular,
            lastgames: lastGames.regular,
          });
          break;
        default:
          break;
      }
    }

    this.dataGrupoNorte = this.sortDataService.sortTeams(sortTeamsN);
    this.dataGrupoCentro = this.sortDataService.sortTeams(sortTeamsC);
    this.dataGrupoSur = this.sortDataService.sortTeams(sortTeamsS);
    this.dataGrupoMetroSelva = this.sortDataService.sortTeams(sortTeamsMS);
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.performanceSubscription?.unsubscribe();
    this.lastGamesSubscription?.unsubscribe();
  }
}