import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { SortDataTableService } from '../../../services/sort-data-table.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { PerformanceData } from '../../../interfaces/api-models/performance-data';
import { LastGamesData } from '../../../interfaces/api-models/last-games-data';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l1-table',
  imports: [TitleComponent, TableComponent, BtnComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-5">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-9/12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:space-x-6 px-8 pb-5">
          <app-btn (click)="setActiveTab('acumulado')" [active]="acumulado">Acumulado</app-btn>
          <app-btn (click)="setActiveTab('apertura')" [active]="apertura">Apertura</app-btn>
          <app-btn (click)="setActiveTab('clausura')" [active]="clausura">Clausura</app-btn>
        </div>
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
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private sortDataService: SortDataTableService,
  ) {}

  private divisionSubscription: Subscription | null = null;
  private teamSubscription: Subscription | null = null;
  private performanceSubscription: Subscription | null = null;
  private lastGamesSubscription: Subscription | null = null;
  dataDivision: DivisionData | null = null;
  dataTeams: TeamData[] = [];
  dataPerformance: PerformanceData[] = [];
  dataLastGames: LastGamesData[] = [];
  acumulado: boolean = true;
  apertura: boolean = false;
  clausura: boolean = false;

  setActiveTab(tab: String) {
    this.acumulado = tab === 'acumulado';
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
  }

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
      name: 'Copa Libertadores',
      image: 'assets/images/pages/Libertadores.webp',
      class: 'bg-libertadores',
    },
    {
      name: 'Copa Sudamericana',
      image: 'assets/images/pages/Sudamericana.webp',
      class: 'bg-sudamericana',
    },
    {
      name: 'Descenso',
      image: 'assets/images/pages/Relegation.svg',
      class: 'bg-relegation',
    },
  ];
  classificationApertura = [
    {
      name: 'Ganador Apertura',
      image: 'assets/images/pages/Plate.svg',
      class: 'bg-gold',
    },
  ];
  classificationClausura = [
    {
      name: 'Ganador Clausura',
      image: 'assets/images/pages/Plate.svg',
      class: 'bg-gold',
    },
  ];

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL1$.subscribe({
      next: (data) => (this.dataDivision = data)
    });
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.performanceSubscription = this.performanceService.dataPerformanceL1$.subscribe({
      next: (data) => (this.dataPerformance = data)
    });
    this.lastGamesSubscription = this.lastGamesService.dataLastGamesL1$.subscribe({
      next: (data) => (this.dataLastGames = data)
    });

    if (this.dataDivision && this.dataTeams && this.dataPerformance && this.dataLastGames) {
      this.getDataForTable();
    }
  }

  getDataForTable() {
    const performanceMap = new Map(this.dataPerformance.map((performance) => [performance.teamId, performance]));
    const lastGamesMap = new Map(this.dataLastGames.map((lastGames) => [lastGames.teamId, lastGames]));

    let sortTeamsApertura:TeamTable[] = [];
    let sortTeamsClausura:TeamTable[] = [];
    let sortTeamsAcumulado:TeamTable[] = [];

    for (const team of this.dataTeams) {
      const baseTeamData = {
        teamId: team.teamId,
        name: team.name,
        abbreviation: team.abbreviation,
        image: team.image,
        alt: team.alt,
      }
      const performance = performanceMap.get(team.teamId);
      const lastGames = lastGamesMap.get(team.teamId);

      if (!performance?.apertura || !performance.clausura || !performance.acumulado || !lastGames?.apertura || !lastGames.clausura) return;

      sortTeamsApertura.push({
        ...baseTeamData,
        performance: performance.apertura,
        lastgames: lastGames.apertura.slice(-5),
      });
      sortTeamsClausura.push({
        ...baseTeamData,
        performance: performance.clausura,
        lastgames: lastGames.clausura.slice(-5),
      });
      sortTeamsAcumulado.push({
        ...baseTeamData,
        performance: performance.acumulado,
        lastgames: this.dataDivision?.stages[0].status
        ? lastGames.apertura.slice(-5) as string[]
        : lastGames.clausura.slice(-5) as string[],
      });
    }

    this.dataApertura = this.sortDataService.sortTeams(sortTeamsApertura);
    this.dataClausura = this.sortDataService.sortTeams(sortTeamsClausura);
    this.dataAcumulado = this.sortDataService.sortTeams(sortTeamsAcumulado);
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.performanceSubscription?.unsubscribe();
    this.lastGamesSubscription?.unsubscribe();
    this.divisionSubscription?.unsubscribe();
  }
}