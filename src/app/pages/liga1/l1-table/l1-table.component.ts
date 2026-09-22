import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsPerformanceService } from '../../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../../services/fetch-teams-form.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l1-table',
  imports: [TitleComponent, TableComponent, BtnComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Switch -->
      <div class="max-w-screen-xl grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
        <app-btn (click)="setActiveTab('overall')" [active]="overall">Acumulada</app-btn>
        <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Apertura</app-btn>
        <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Clausura</app-btn>
      </div>
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        @if (overall) {
          <app-subtitle>Tabla Acumulada</app-subtitle>
          <app-table [config]="configOverall" [headers]="headers" [data]="dataOverall"></app-table>
        }
        @if (phase1) {
          <app-subtitle>Tabla Apertura</app-subtitle>
          <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1"></app-table>
        }
        @if (phase2) {
          <app-subtitle>Tabla Clausura</app-subtitle>
          <app-table [config]="configPhase2" [headers]="headers" [data]="dataPhase2"></app-table>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L1TableComponent {
  private viewPortScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private uiDataMapperService = inject(UiDataMapperService);

  overall: boolean = false;
  phase1: boolean = false;
  phase2: boolean = false;

  headers: string[] = ['', 'Pos', 'Club', '', 'Pts', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'Últimos 5 partidos'];
  configOverall = [
    { active: true, name: 'Copa Libertadores', image: 'assets/images/pages/Libertadores.webp', class: 'bg-libertadores', quantity: 4 },
    { active: true, name: 'Copa Sudamericana', image: 'assets/images/pages/Sudamericana.webp', class: 'bg-sudamericana', quantity: 4 },
    { active: true, name: 'Descenso a Liga 2', image: 'assets/images/pages/Relegation.svg', class: 'bg-relegation', quantity: 2 },
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

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceL1();
    this.teamsFormService.fetchTeamsFormL1();

    combineLatest([
      this.divisionsService.divisionL1$,
      this.teamsService.teamsL1$,
      this.teamsPerformanceService.teamsPerformanceL1$,
      this.teamsFormService.teamsFormL1$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, teamsPerformance, teamsForm]) => {
        let activePhase: 'phase1' | 'phase2' | undefined = undefined;
        if (division?.phase1.status) {
          activePhase = 'phase1';
        } else if (division?.phase2.status || division?.phase3.status) {
          activePhase = 'phase2';
        }
        this.phase1 = division?.phase1.status || false;
        this.phase2 = division?.phase2.status || division?.phase3.status || false;

        this.dataOverall = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'overall', undefined, activePhase);
        this.dataPhase1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase1');
        this.dataPhase2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2');
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.overall = tab === 'overall';
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}