import { Component, inject } from '@angular/core';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsPerformanceService } from '../../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../../services/fetch-teams-form.service';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { BracketCardComponent } from '../../../components/bracket-card/bracket-card.component';
import { TeamTable } from '../../../interfaces/ui-models/team-table';
import { MatchCard } from '../../../interfaces/ui-models/match-card';

@Component({
  selector: 'app-l1-table',
  imports: [TitleComponent, TableComponent, BtnComponent, BracketCardComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-10 lg:py-16 duration-500 select-none">
      <div class="flex justify-center px-3 sm:px-5 mb-3 sm:mb-5">
        <div class="w-full md:w-5/6 lg:w-9/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-3 px-4 md:px-0">
          <app-btn (click)="setActiveTab('overall')" [active]="overall">Acumulado</app-btn>
          <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Apertura</app-btn>
          <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Clausura</app-btn>
        </div>
      </div>
      @if (overall) {
        <app-table [config]="configOverall" [headers]="headers" [data]="dataOverall"></app-table>
      }
      @if (phase1) {
        <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1"></app-table>
      }
      @if (phase2) {
        <app-table [config]="configPhase2" [headers]="headers" [data]="dataPhase2"></app-table>
      }
    </div>
    @if (playOff) {
      <div class="bg-crimson background-pattern px-3 md:px-16 py-12 select-none duration-500">
        <p class="text-white font-bold text-6xl text-center md:text-start">Fase de Play-Offs</p>
      </div>
      <div class="bg-night py-10 lg:py-16 px-3 sm:px-5 duration-500 select-none">
        <div class="max-w-screen-xl mx-auto">
          <div class="flex flex-col md:flex-row gap-2">
            <div class="w-full md:w-1/2">
              <div class="w-fit">
                <h3 class="text-3xl text-white font-bold">Semifinales</h3>
                <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
              </div>
              @for (bracket of dataPlayOff2; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
              }
            </div>
            <div class="w-full md:w-1/2">
              <div class="w-fit">
                <h3 class="text-3xl text-white font-bold">Final</h3>
                <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
              </div>
              @for (bracket of dataPlayOff1; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="true" [lastMatch]="'Subcampeón Liga 1'"></app-bracket-card>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class L1TableComponent {
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private bracketsService = inject(FetchBracketsService);
  private uiDataMapperService = inject(UiDataMapperService);

  overall: boolean = true;
  phase1: boolean = false;
  phase2: boolean = false;
  playOff: boolean = false;

  headers: string[] = ['', 'Pos', 'Club', 'PTS', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'Últimas 5 Fechas'];
  configOverall = [
    { active: true, name: 'Copa Libertadores', image: 'assets/images/pages/Libertadores.webp', class: 'bg-libertadores', quantity: 4 },
    { active: true, name: 'Copa Sudamericana', image: 'assets/images/pages/Sudamericana.webp', class: 'bg-sudamericana', quantity: 4 },
    { active: true, name: 'Descenso', image: 'assets/images/pages/Relegation.svg', class: 'bg-relegation', quantity: 2 },
  ];
  configPhase1 = [
    { active: true, name: 'Ganador Apertura', image: 'assets/images/pages/Plate.svg', class: 'bg-gold', quantity: 1 },
  ];
  configPhase2 = [
    { active: true, name: 'Ganador Clausura', image: 'assets/images/pages/Plate.svg', class: 'bg-gold', quantity: 1 },
  ];
  dataOverall: TeamTable[] = [];
  dataPhase1: TeamTable[] = [];
  dataPhase2: TeamTable[] = [];
  dataPlayOff2: MatchCard[] = [];
  dataPlayOff1: MatchCard[] = [];

  constructor() {
    combineLatest([
      this.divisionsService.divisionL1$,
      this.teamsService.teamsL1$,
      this.teamsPerformanceService.teamsPerformanceL1$,
      this.teamsFormService.teamsFormL1$,
      this.bracketsService.bracketsL1$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, teamsPerformance, teamsForm, brackets]) => {
        let activePhase = '';
        if (division?.phase1.status) {
          activePhase = 'phase1';
        } else if (division?.phase2.status) {
          activePhase = 'phase2';
        }
        this.playOff = division?.phase3.status || false;

        this.dataOverall = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'overall', undefined, activePhase);
        this.dataPhase1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase1');
        this.dataPhase2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2');

        if (brackets[0] && brackets[0].bracket2 && brackets[0].bracket1) {
          this.dataPlayOff2 = this.uiDataMapperService.bracketCardMapper(teams, brackets[0].bracket2);
          this.dataPlayOff1 = this.uiDataMapperService.bracketCardMapper(teams, brackets[0].bracket1);
        }
      }
    })
  }

  setActiveTab(tab: String) {
    this.overall = tab === 'overall';
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}