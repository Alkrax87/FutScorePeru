import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { PerformanceData } from '../../../interfaces/api-models/performance-data';
import { LastGamesData } from '../../../interfaces/api-models/last-games-data';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l3-table',
  imports: [TitleComponent, TableComponent, BtnComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-5">
      <div class="place-items-center">
        <div class="w-full md:w-5/6 lg:w-9/12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-5 px-8 md:px-0">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('final')" [active]="final">Fase Final</app-btn>
          <app-btn (click)="setActiveTab('playOff')" [active]="playOff">PlayOffs</app-btn>
        </div>
      </div>
      @if (regional) {
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo 1</h3>
          <div class="bg-crimson skew-x-50 h-2 w-36 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional1"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo 2</h3>
          <div class="bg-crimson skew-x-50 h-2 w-36 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional3"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo 3</h3>
          <div class="bg-crimson skew-x-50 h-2 w-36 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional4"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo 4</h3>
          <div class="bg-crimson skew-x-50 h-2 w-36 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional2"></app-table>
      }
      @if (final) {
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo A</h3>
          <div class="bg-crimson skew-x-50 h-2 w-40 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalA"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo B</h3>
          <div class="bg-crimson skew-x-50 h-2 w-40 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalB"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo C</h3>
          <div class="bg-crimson skew-x-50 h-2 w-40 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalC"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo D</h3>
          <div class="bg-crimson skew-x-50 h-2 w-40 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalD"></app-table>
      }
      @if (playOff) {
        <div class="flex h-64 justify-center items-center select-none">
          <h3 class="text-2xl text-white font-bold">PlayOffs por definir...</h3>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class L3TableComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private divisionSubscription: Subscription | null = null;
  private teamSubscription: Subscription | null = null;
  private performanceSubscription: Subscription | null = null;
  private lastGamesSubscription: Subscription | null = null;
  dataDivision: DivisionData | null = null;
  dataTeams: TeamData[] = [];
  dataPerformance: PerformanceData[] = [];
  dataLastGames: LastGamesData[] = [];
  regional: boolean = false;
  final: boolean = false;
  playOff: boolean = false;

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.final = tab === 'final';
    this.playOff = tab === 'playOff';
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
  dataRegional1: TeamTable[] = [];
  dataRegional2: TeamTable[] = [];
  dataRegional3: TeamTable[] = [];
  dataRegional4: TeamTable[] = [];
  dataFinalA: TeamTable[] = [];
  dataFinalB: TeamTable[] = [];
  dataFinalC: TeamTable[] = [];
  dataFinalD: TeamTable[] = [];
  configRegional: { class: string; quantity: number }[] = [
    { class: 'bg-gpromotion', quantity: 4 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 1 },
  ];
  configFinal: { class: string; quantity: number }[] = [
    { class: 'bg-quarter', quantity: 2 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  classificationRegional = [
    {
      name: 'Grupos de Ascenso',
      image: 'assets/images/pages/Group-Promotion.svg',
      class: 'bg-gpromotion',
    },
    {
      name: 'Descenso',
      image: 'assets/images/pages/Relegation.svg',
      class: 'bg-relegation',
    },
  ];
  classificationFinal = [
    {
      name: 'PlayOffs',
      image: 'assets/images/pages/Bracket-Quarter.svg',
      class: 'bg-quarter',
    },
  ];

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL3$.subscribe({
      next: (data) => {
        this.regional = data ? data.firstPhase.status : false;
        this.final = data ? data.secondPhase.status : false;
        this.playOff = data ? data.thirdPhase.status : false;
      }
    });
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
      this.dataRegional1 = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'regional',
        '1'
      );
      this.dataRegional2 = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'regional',
        '2'
      );
      this.dataRegional3 = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'regional',
        '3'
      );
      this.dataRegional4 = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'regional',
        '4'
      );
      this.dataFinalA = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'final',
        "f1"
      );
      this.dataFinalB = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'final',
        "f2"
      );
      this.dataFinalC = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'final',
        "f3"
      );
      this.dataFinalD = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'final',
        "f4"
      );
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.performanceSubscription?.unsubscribe();
    this.lastGamesSubscription?.unsubscribe();
    this.divisionSubscription?.unsubscribe();
  }
}