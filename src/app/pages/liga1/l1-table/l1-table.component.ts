import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { SortDataTableService } from '../../../services/sort-data-table.service';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../../components/table/table.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { PerformanceDataL1 } from '../../../interfaces/api-models/performance-data-l1';
import { LastGamesDataL1 } from '../../../interfaces/api-models/last-games-data-l1';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

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
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private sortDataService: SortDataTableService,
  ) {}

  private teamSubscription: Subscription | null = null;
  private performanceSubscription: Subscription | null = null;
  private lastGamesSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] = [];
  dataPerformance: PerformanceDataL1[] = [];
  dataLastGames: LastGamesDataL1[] = [];
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
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.performanceSubscription = this.performanceService.dataPerformanceL1$.subscribe({
      next: (data) => (this.dataPerformance = data)
    });
    this.lastGamesSubscription = this.lastGamesService.dataLastGamesL1$.subscribe({
      next: (data) => (this.dataLastGames = data)
    });

    if (this.dataTeams && this.dataPerformance && this.dataLastGames) {
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
        name: team.name,
        abbreviation: team.abbreviation,
        image: team.image,
        alt: team.alt,
        url: team.url,
      }
      const performance = performanceMap.get(team.teamId);
      const lastGames = lastGamesMap.get(team.teamId);

      if (!performance || !lastGames) return;

      sortTeamsApertura.push({
        ...baseTeamData,
        performance: performance.apertura,
        lastgames: lastGames.apertura,
      });
      sortTeamsClausura.push({
        ...baseTeamData,
        performance: performance.clausura,
        lastgames: lastGames.clausura,
      });
      sortTeamsAcumulado.push({
        ...baseTeamData,
        performance: performance.acumulado,
        lastgames: lastGames.acumulado,
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
  }
}