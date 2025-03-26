import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { SortDataTableService } from '../../../services/sort-data-table.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { TableComponent } from '../../../components/table/table.component';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { PerformanceData } from '../../../interfaces/api-models/performance-data';
import { LastGamesData } from '../../../interfaces/api-models/last-games-data';
import { TeamTable } from '../../../interfaces/ui-models/team-table';
import { BtnComponent } from "../../../components/btn/btn.component";
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { DivisionData } from '../../../interfaces/api-models/division-data';

@Component({
  selector: 'app-l3-table',
  imports: [TitleComponent, TableComponent, BtnComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-5">
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-9/12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:space-x-6 px-8 pb-5">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('final')" [active]="final">Fase Final</app-btn>
          <app-btn (click)="setActiveTab('playOff')" [active]="playOff">PlayOffs</app-btn>
        </div>
      </div>
      @if (regional) {
        <div class="mx-4 md:mx-8 mb-5">
          <h3 class="text-4xl text-white font-bold">Grupo 1</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional1"></app-table>
        <div class="mx-4 md:mx-8 my-5">
          <h3 class="text-4xl text-white font-bold">Grupo 2</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional3"></app-table>
        <div class="mx-4 md:mx-8 my-5">
          <h3 class="text-4xl text-white font-bold">Grupo 3</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional4"></app-table>
        <div class="mx-4 md:mx-8 my-5">
          <h3 class="text-4xl text-white font-bold">Grupo 4</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegional2"></app-table>
      }
      @if (final) {
        <div class="mx-4 md:mx-8 mb-5">
          <h3 class="text-4xl text-white font-bold">Grupo A</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalA"></app-table>
        <div class="mx-4 md:mx-8 my-5">
          <h3 class="text-4xl text-white font-bold">Grupo B</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalB"></app-table>
        <div class="mx-4 md:mx-8 my-5">
          <h3 class="text-4xl text-white font-bold">Grupo C</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
        </div>
        <app-table [config]="configFinal" [headers]="headers" [classification]="classificationFinal" [data]="dataFinalC"></app-table>
        <div class="mx-4 md:mx-8 my-5">
          <h3 class="text-4xl text-white font-bold">Grupo D</h3>
          <div class="bg-crimson skew-x-50 h-2 w-52 my-3"></div>
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
    private sortDataService: SortDataTableService
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
        this.regional = data ? data.stages[0].status : false;
        this.final = data ? data.stages[1].status : false;
        this.playOff = data ? data.stages[2].status : false;
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
      this.getDataForTable();
    }
  }

  getDataForTable() {
    const performanceMap = new Map(this.dataPerformance.map((performance) => [performance.teamId, performance]));
    const lastGamesMap = new Map(this.dataLastGames.map((lastGames) => [lastGames.teamId, lastGames]));

    let sortTeamsRegional1: TeamTable[] = [];
    let sortTeamsRegional2: TeamTable[] = [];
    let sortTeamsRegional3: TeamTable[] = [];
    let sortTeamsRegional4: TeamTable[] = [];
    let sortTeamsFinalA: TeamTable[] = [];
    let sortTeamsFinalB: TeamTable[] = [];
    let sortTeamsFinalC: TeamTable[] = [];
    let sortTeamsFinalD: TeamTable[] = [];

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

      if (!performance?.regional || !performance.final || !lastGames?.regional || !lastGames.final) return;

      switch (team.groupFirstPhase) {
        case "1":
          sortTeamsRegional1.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional.slice(-5),
          });
          break;
        case "2":
          sortTeamsRegional3.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional.slice(-5),
          });
          break;
        case "3":
          sortTeamsRegional4.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional.slice(-5),
          });
          break;
        case "4":
          sortTeamsRegional2.push({
            ...baseTeamData,
            performance: performance.regional,
            lastgames: lastGames.regional.slice(-5),
          });
          break;
        default:
          break;
      }

      switch (team.groupSecondPhase) {
        case "f1":
          sortTeamsFinalA.push({
            ...baseTeamData,
            performance: performance.final,
            lastgames: lastGames.final.slice(-5),
          });
          break;
        case "f2":
          sortTeamsFinalB.push({
            ...baseTeamData,
            performance: performance.final,
            lastgames: lastGames.final.slice(-5),
          });
          break;
        case "f3":
          sortTeamsFinalC.push({
            ...baseTeamData,
            performance: performance.final,
            lastgames: lastGames.final.slice(-5),
          });
          break;
        case "f4":
          sortTeamsFinalD.push({
            ...baseTeamData,
            performance: performance.final,
            lastgames: lastGames.final.slice(-5),
          });
          break;
        default:
          break;
      }
    }

    this.dataRegional1 = this.sortDataService.sortTeams(sortTeamsRegional1);
    this.dataRegional2 = this.sortDataService.sortTeams(sortTeamsRegional2);
    this.dataRegional3 = this.sortDataService.sortTeams(sortTeamsRegional3);
    this.dataRegional4 = this.sortDataService.sortTeams(sortTeamsRegional4);
    this.dataFinalA = this.sortDataService.sortTeams(sortTeamsFinalA);
    this.dataFinalB = this.sortDataService.sortTeams(sortTeamsFinalB);
    this.dataFinalC = this.sortDataService.sortTeams(sortTeamsFinalC);
    this.dataFinalD = this.sortDataService.sortTeams(sortTeamsFinalD);
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.performanceSubscription?.unsubscribe();
    this.lastGamesSubscription?.unsubscribe();
    this.divisionSubscription?.unsubscribe();
  }
}