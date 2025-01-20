import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { Subscription } from 'rxjs';
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';
import { TeamTable } from '../../../interfaces/ui-models/team-table';
import { TableComponent } from '../../../components/table/table.component';

@Component({
  selector: 'app-l2-table',
  imports: [TableComponent],
  template: `
    <div class="bg-night py-5">
      <h3 class="text-4xl text-white font-bold mx-5 mb-5">Grupo Norte</h3>
      <app-table [config]="configGrupos" [headers]="headers" [classification]="classificationGrupos" [data]="dataGrupoNorte"></app-table>
      <h3 class="text-4xl text-white font-bold mx-5 my-5">Grupo Sur</h3>
      <app-table [config]="configGrupos" [headers]="headers" [classification]="classificationGrupos" [data]="dataGrupoSur"></app-table>
    </div>
  `,
  styles: ``,
})
export class L2TableComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private performanceService: FetchPerformanceService,
    private lastgamesService: FetchLastGamesService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;

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
  dataGrupoSur: TeamTable[] = [];
  configGrupos: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 6 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 2 },
  ];
  classificationGrupos = [
    {
      name: 'Grupo de Ascenso',
      image: 'assets/images/pages/Ascenso.webp',
      class: 'bg-promotion',
    },
    {
      name: 'Grupo de Descenso',
      image: 'assets/images/pages/Descenso.webp',
      class: 'bg-relegation',
    },
  ]

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
        this.getDataForTable();
      },
    });
  }

  async getDataForTable() {
    const mergedData = [];

    if (this.dataTeams) {
      for (const team of this.dataTeams) {
        const performance = await this.performanceService.fetchPerformanceL2(team.performance.url);
        const lastgames = await this.lastgamesService.fetchLastGamesL2(team.lastgames.url);
        mergedData.push({
          group: team.group,
          name: team.name,
          abbreviation: team.abbreviation,
          image: team.image,
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          url: team.url,
          lastgames: lastgames,
          performance: performance,
        })
      }
    }

    this.splitData(mergedData);
  }

  splitData(data: any) {
    for (const team of data) {
      const baseData = {
        name: team.name,
        abbreviation: team.abbreviation,
        image: team.image,
        imageThumbnail: team.imageThumbnail,
        alt: team.alt,
        url: team.url,
      };

      switch (team.group) {
        case "norte":
          this.dataGrupoNorte.push({
            ...baseData,
            lastgames: team.lastgames.grupos,
            performance: {
              points: team.performance.grupos.points - (team.performance.grupos.saction ?? 0),
              pj: team.performance.grupos.pj,
              pg: team.performance.grupos.pg,
              pe: team.performance.grupos.pe,
              pp: team.performance.grupos.pp,
              gf: team.performance.grupos.gf,
              gc: team.performance.grupos.gc,
              dg: team.performance.grupos.dg,
            },
          });
          break;
        case "sur":
          this.dataGrupoSur.push({
            ...baseData,
            lastgames: team.lastgames.grupos,
            performance: {
              points: team.performance.grupos.points - (team.performance.grupos.saction ?? 0),
              pj: team.performance.grupos.pj,
              pg: team.performance.grupos.pg,
              pe: team.performance.grupos.pe,
              pp: team.performance.grupos.pp,
              gf: team.performance.grupos.gf,
              gc: team.performance.grupos.gc,
              dg: team.performance.grupos.dg,
            },
          });
          break;

        default:
          break;
      }
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
