import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { ApiService } from '../../../services/api.service';
import { forkJoin, map, mergeMap } from 'rxjs';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';

@Component({
  selector: 'app-l1-table',
  imports: [TableComponent],
  template: `
    <div class="bg-neutral-800 py-5">
      <app-table
        [config]="config"
        [headers]="headers"
        [data]="dataApertura"
      ></app-table>
      <app-table
        [config]="config"
        [headers]="headers"
        [data]="dataClausura"
      ></app-table>
    </div>
  `,
  styles: ``,
})
export class L1TableComponent {
  constructor(
    private apiService: ApiService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService
  ) {}

  data: any;
  dataApertura: any[] = [];
  dataClausura: any[] = [];
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
  config: { class: string; quantity: number }[] = [
    { class: 'bg-libertadores', quantity: 4 },
    { class: 'bg-sudamericana', quantity: 4 },
    { class: 'bg-relegation', quantity: 3 },
  ];

  ngOnInit() {
    this.apiService
      .fetchDataTeamsL1()
      .pipe(
        mergeMap((teams: any[]) => {
          // Para cada equipo, realizar las subconsultas y unir los resultados
          const enrichedTeams = teams.map((team) => {
            const lastGames$ = this.lastGamesService.fetchLastGamesL1(
              team.lastgames.url
            );
            const performance$ = this.performanceService.fetchPerformanceL1(
              team.performance.url
            );
            // Combinar los resultados y reemplazar los datos
            return forkJoin([lastGames$, performance$]).pipe(
              map(([lastGamesData, performanceData]) => ({
                ...team, // Mantener los datos originales
                lastgames: lastGamesData, // Reemplazar la URL con los datos reales
                performance: performanceData,
              }))
            );
          });
          // Esperar a que todas las subconsultas terminen antes de emitir los datos enriquecidos
          return forkJoin(enrichedTeams);
        })
      )
      .subscribe({
        next: (response) => {
          this.data = response;
          console.log(this.data);
        },
        error: (error) => console.error('Error fetching data:', error),
        complete: () => console.log('Data fetch completed'),
      });

    this.splitTeams();
  }

  splitTeams() {
    this.data.forEach((team: any) => {
      const baseData = {
        name: team.name,
        abbreviation: team.abbreviation,
        image: team.image,
        imageThumbnail: team.imageThumbnail,
        alt: team.alt,
        url: team.url,
      };

      // Equipo para Apertura
      const aperturaTeam = {
        ...baseData,
        lastgames: team.lastgames.apertura,
        performance: {
          points: team.performance.apertura.points,
          pj: team.performance.apertura.pj,
          pg: team.performance.apertura.pg,
          pe: team.performance.apertura.pe,
          pp: team.performance.apertura.pp,
          gf: team.performance.apertura.gf,
          gc: team.performance.apertura.gc,
          dg: team.performance.apertura.dg,
          sanction: team.performance.saction ?? 0,
        },
      };

      // Equipo para Clausura
      const clausuraTeam = {
        ...baseData,
        lastgames: team.lastgames.clausura,
        performance: {
          points: team.performance.clausura.points,
          pj: team.performance.clausura.pj,
          pg: team.performance.clausura.pg,
          pe: team.performance.clausura.pe,
          pp: team.performance.clausura.pp,
          gf: team.performance.clausura.gf,
          gc: team.performance.clausura.gc,
          dg: team.performance.clausura.dg,
          sanction: team.performance.saction ?? 0,
        },
      };

      // Agregar los equipos a sus respectivos arrays
      this.dataApertura.push(aperturaTeam);
      this.dataClausura.push(clausuraTeam);
    });
  }
}
