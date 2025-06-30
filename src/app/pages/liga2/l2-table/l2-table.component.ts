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
  selector: 'app-l2-table',
  imports: [TitleComponent, TableComponent, BtnComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-5">
      <div class="place-items-center">
        <div class="w-full md:w-5/6 lg:w-9/12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-5 px-8 md:px-0">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('grupos')" [active]="grupos">Fase Grupos</app-btn>
          <app-btn (click)="setActiveTab('playOff')" [active]="playOff">PlayOffs</app-btn>
        </div>
      </div>
      @if (regional) {
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo A</h3>
          <div class="bg-crimson skew-x-50 h-2 w-40 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegionalA"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo B</h3>
          <div class="bg-crimson skew-x-50 h-2 w-40 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegionalB"></app-table>
      }
      @if (grupos) {
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo Ascenso 1</h3>
          <div class="bg-crimson skew-x-50 h-2 w-72 my-3"></div>
        </div>
        <app-table [config]="configGroupPromotion" [headers]="headers" [classification]="classificationPromotion" [data]="dataPromotion1"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo Ascenso 2</h3>
          <div class="bg-crimson skew-x-50 h-2 w-72 my-3"></div>
        </div>
        <app-table [config]="configGroupPromotion" [headers]="headers" [classification]="classificationPromotion" [data]="dataPromotion2"></app-table>
        <div class="m-5">
          <h3 class="text-4xl text-white font-bold">Grupo Descenso</h3>
          <div class="bg-crimson skew-x-50 h-2 w-72 my-3"></div>
        </div>
        <app-table [config]="configGroupRelegation" [headers]="headers" [classification]="classificationRelegation" [data]="dataRelegation"></app-table>
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
export class L2TableComponent {
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
  grupos: boolean = false;
  playOff: boolean = false;

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
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
  dataRegionalA: TeamTable[] = [];
  dataRegionalB: TeamTable[] = [];
  dataPromotion1: TeamTable[] = [];
  dataPromotion2: TeamTable[] = [];
  dataRelegation: TeamTable[] = [];
  configRegional: { class: string; quantity: number }[] = [
    { class: 'bg-gpromotion', quantity: 5 },
    { class: '', quantity: 0 },
    { class: 'bg-grelegation', quantity: 3 },
  ];
  configGroupPromotion: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 1 },
    { class: 'bg-quarter', quantity: 2 },
    { class: '', quantity: 0 },
  ];
  configGroupRelegation: { class: string; quantity: number }[] = [
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 1 },
  ];
  classificationRegional = [
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
  classificationPromotion = [
    {
      name: 'Semifinales',
      image: 'assets/images/pages/Bracket-Semifinalist.svg',
      class: 'bg-promotion',
    },
    {
      name: 'Cuartos de Final',
      image: 'assets/images/pages/Bracket-Quarter.svg',
      class: 'bg-quarter',
    },
  ];
  classificationRelegation = [
    {
      name: 'Descenso',
      image: 'assets/images/pages/Relegation.svg',
      class: 'bg-relegation',
    },
  ];

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL2$.subscribe({
      next: (data) => {
        this.regional = data ? data.stages[0].status : false;
        this.grupos = data ? data.stages[1].status : false;
        this.playOff = data ? data.stages[2].status : false;
      }
    });
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
      this.dataRegionalA = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'regional',
        'a'
      );
      this.dataRegionalB = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'regional',
        'b'
      );
      this.dataPromotion1 = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'grupos',
        'p1'
      );
      this.dataPromotion2 = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'grupos',
        'p2'
      );
      this.dataRelegation = this.uiDataMapperService.teamsTableMapper(
        this.dataTeams,
        this.dataPerformance,
        this.dataLastGames,
        'grupos',
        'r'
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