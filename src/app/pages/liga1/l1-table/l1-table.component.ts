import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { ApiService } from '../../../services/api.service';
import { forkJoin, map, mergeMap, Subscription } from 'rxjs';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { TeamTable } from '../../../interfaces/team-table';
import { BtnComponent } from "../../../components/btn/btn.component";
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { TeamDataL1 } from '../../../interfaces/team-data-l1';

@Component({
  selector: 'app-l1-table',
  imports: [TableComponent, BtnComponent],
  template: `
    <div class="bg-night py-5">
      <div class="w-full flex justify-center space-x-6 pb-5">
        <app-btn (click)="setActiveTab('acumulado')">Acumulado</app-btn>
        <app-btn (click)="setActiveTab('apertura')">Apertura</app-btn>
        <app-btn (click)="setActiveTab('clausura')">Clausura</app-btn>
      </div>
      @if (acumulado) {
        <app-table [config]="configAcumulado" [headers]="headers" [classification]="classificationAcumulado" [data]="dataAcumulado"></app-table>
      }
      @if (apertura) {
        <app-table [config]="configApertura" [headers]="headers" [classification]="classificationApertura" [data]="dataApertura"></app-table>
      }
      @if (clausura) {
        <app-table [config]="configClausura" [headers]="headers" [classification]="classificationClausura" [data]="dataClausura"></app-table>
      }
    </div>
  `,
  styles: ``,
})
export class L1TableComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private apiService: ApiService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;

  acumulado: boolean = true;
  apertura: boolean = false;
  clausura: boolean = false;

  setActiveTab(tab: String) {
    this.acumulado = tab === 'acumulado'
    this.apertura = tab === 'apertura'
    this.clausura = tab === 'clausura'
  }

  data: any;
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
  dataApertura: TeamTable[] = [];
  dataClausura: TeamTable[] = [];
  dataAcumulado: TeamTable[] = [];
  configApertura: { class: string; quantity: number }[] = [
    { class: 'bg-gold', quantity: 1 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  configClausura: { class: string; quantity: number }[] = [
    { class: 'bg-gold', quantity: 1 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  configAcumulado: { class: string; quantity: number }[] = [
    { class: 'bg-libertadores', quantity: 4 },
    { class: 'bg-sudamericana', quantity: 4 },
    { class: 'bg-relegation', quantity: 3 },
  ];
  classificationAcumulado = [
    {
      name: "Copa Libertadores",
      image: "assets/images/pages/Libertadores.webp",
      class: "bg-libertadores"
    },
    {
      name: "Copa Sudamericana",
      image: "assets/images/pages/Sudamericana.webp",
      class: "bg-sudamericana"
    },
    {
      name: "Descenso",
      image: "assets/images/pages/Liga-2.webp",
      class: "bg-relegation"
    },
  ]
  classificationApertura = [
    {
      name: "Ganador Apertura",
      image: "assets/images/pages/Libertadores.webp",
      class: "bg-gold"
    }
  ]
  classificationClausura = [
    {
      name: "Ganador Clausura",
      image: "assets/images/pages/Libertadores.webp",
      class: "bg-gold"
    }
  ]

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      }
    })

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
          this.splitTeams();
        },
        error: (error) => console.error('Error fetching data:', error),
        complete: () => console.log('Data fetch completed'),
      });
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
        },
      };

      // Equipo para Acumuñado
      const acumuladoTeam = {
        ...baseData,
        lastgames: team.lastgames.clausura,
        performance: {
          points: team.performance.apertura.points + team.performance.clausura.points - (team.performance.saction ?? 0),
          pj: team.performance.apertura.pj + team.performance.clausura.pj,
          pg: team.performance.apertura.pg + team.performance.clausura.pg,
          pe: team.performance.apertura.pe + team.performance.clausura.pe,
          pp: team.performance.apertura.pp + team.performance.clausura.pp,
          gf: team.performance.apertura.gf + team.performance.clausura.gf,
          gc: team.performance.apertura.gc + team.performance.clausura.gc,
          dg: team.performance.apertura.dg + team.performance.clausura.dg,
        },
      };

      // Agregar los equipos a sus respectivos arrays
      this.dataApertura.push(aperturaTeam);
      this.dataClausura.push(clausuraTeam);
      this.dataAcumulado.push(acumuladoTeam);
    });
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
