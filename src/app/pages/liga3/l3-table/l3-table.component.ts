import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { TeamTable } from '../../../interfaces/ui-models/team-table';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';

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
    private lastGamesService: FetchLastGamesService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] | null = null;
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
  classificationRegional = []

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
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
        const performance = await this.performanceService.fetchPerformanceL3(team.performance.url);
        const lastgames = await this.lastGamesService.fetchLastGamesL3(team.lastgames.url);
        mergedData.push({
          group: team.group,
          name: team.name,
          abbreviation: team.abbreviation,
          image: team.imageThumbnail,
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          url: team.url,
          lastgames: lastgames,
          performance: performance,
        });
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
            lastgames: team.lastgames.regular,
            performance: {
              points: team.performance.regular.points - (team.performance.regular.saction ?? 0),
              pj: team.performance.regular.pj,
              pg: team.performance.regular.pg,
              pe: team.performance.regular.pe,
              pp: team.performance.regular.pp,
              gf: team.performance.regular.gf,
              gc: team.performance.regular.gc,
              dg: team.performance.regular.dg,
            },
          });
          break;
        case "centro":
          this.dataGrupoCentro.push({
            ...baseData,
            lastgames: team.lastgames.regular,
            performance: {
              points: team.performance.regular.points - (team.performance.regular.saction ?? 0),
              pj: team.performance.regular.pj,
              pg: team.performance.regular.pg,
              pe: team.performance.regular.pe,
              pp: team.performance.regular.pp,
              gf: team.performance.regular.gf,
              gc: team.performance.regular.gc,
              dg: team.performance.regular.dg,
            },
          });
          break;
        case "sur":
          this.dataGrupoSur.push({
            ...baseData,
            lastgames: team.lastgames.regular,
            performance: {
              points: team.performance.regular.points - (team.performance.regular.saction ?? 0),
              pj: team.performance.regular.pj,
              pg: team.performance.regular.pg,
              pe: team.performance.regular.pe,
              pp: team.performance.regular.pp,
              gf: team.performance.regular.gf,
              gc: team.performance.regular.gc,
              dg: team.performance.regular.dg,
            },
          });
          break;
        case "metro-selva":
          this.dataGrupoMetroSelva.push({
            ...baseData,
            lastgames: team.lastgames.regular,
            performance: {
              points: team.performance.regular.points - (team.performance.regular.saction ?? 0),
              pj: team.performance.regular.pj,
              pg: team.performance.regular.pg,
              pe: team.performance.regular.pe,
              pp: team.performance.regular.pp,
              gf: team.performance.regular.gf,
              gc: team.performance.regular.gc,
              dg: team.performance.regular.dg,
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
