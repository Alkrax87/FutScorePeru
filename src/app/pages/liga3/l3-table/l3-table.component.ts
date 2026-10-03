import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSoccerBall, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-l3-table',
  imports: [TitleComponent, TableComponent, BtnComponent, FaIconComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      @if (loadingState === 'idle' || loadingState === 'loading') {
        <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-main"></div>
          <p class="font-semibold">Cargando tablas...</p>
        </div>
      } @else if (loadingState === 'error') {
        <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
          <fa-icon [icon]="Error" class="text-4xl text-main"></fa-icon>
          <p class="font-semibold">Hubo un problema cargando los datos de las tablas.</p>
        </div>
      } @else {
        <!-- Switch -->
        <div class="max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
          <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Fase Final</app-btn>
        </div>
        <!-- Content -->
        <div class="max-w-screen-xl mx-auto">
          <div class="flex flex-col gap-6">
            @if (phase1) {
              <div>
                <app-subtitle>Grupo 1</app-subtitle>
                <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Regional1"></app-table>
              </div>
              <div>
                <app-subtitle>Grupo 2</app-subtitle>
                <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Regional2"></app-table>
              </div>
              <div>
                <app-subtitle>Grupo 3</app-subtitle>
                <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Regional3"></app-table>
              </div>
              <div>
                <app-subtitle>Grupo 4</app-subtitle>
                <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Regional4"></app-table>
              </div>
              <div class="text-white">
                <p class="font-semibold"><fa-icon [icon]="Soccer"></fa-icon> Siguiente fase</p>
                <ul>
                  <li>- Los <b class="text-gold">primeros de cada grupo</b> tendrán una bonificación de <b class="text-promotion">+2 puntos</b></li>
                  <li>- Los <b class="text-gold">segundos de cada grupo</b> tendrán una bonificación de <b class="text-promotion">+1 punto</b></li>
                </ul>
              </div>
            }
            @if (phase2) {
              <div>
                <app-subtitle>Grupo A</app-subtitle>
                <app-table [config]="configPhase2" [headers]="headers" [data]="dataPhase2FinalA"></app-table>
              </div>
              <div>
                <app-subtitle>Grupo B</app-subtitle>
                <app-table [config]="configPhase2" [headers]="headers" [data]="dataPhase2FinalB"></app-table>
              </div>
              <div>
                <app-subtitle>Grupo C</app-subtitle>
                <app-table [config]="configPhase2" [headers]="headers" [data]="dataPhase2FinalC"></app-table>
              </div>
              <div>
                <app-subtitle>Grupo D</app-subtitle>
                <app-table [config]="configPhase2" [headers]="headers" [data]="dataPhase2FinalD"></app-table>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class L3TableComponent {
  private viewPortScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private uiDataMapperService = inject(UiDataMapperService);

  phase1: boolean = false;
  phase2: boolean = false;

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  headers: string[] = ['', 'Pos', 'Club', '', 'Pts', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'Últimos 5 partidos'];
  configPhase1 = [
    { active: true, name: 'Grupos de Ascenso', image: 'assets/images/pages/Group-Promotion.svg', class: 'bg-gpromotion', quantity: 4 },
    { active: false },
    { active: true, name: 'Descenso a Copa Perú', image: 'assets/images/pages/Relegation.svg', class: 'bg-relegation', quantity: 2 },
  ];
  configPhase2 = [
    { active: true, name: 'PlayOffs', image: 'assets/images/pages/Bracket-Quarter.svg', class: 'bg-quarter', quantity: 2},
  ];
  dataPhase1Regional1: TeamTable[] = [];
  dataPhase1Regional2: TeamTable[] = [];
  dataPhase1Regional3: TeamTable[] = [];
  dataPhase1Regional4: TeamTable[] = [];
  dataPhase2FinalA: TeamTable[] = [];
  dataPhase2FinalB: TeamTable[] = [];
  dataPhase2FinalC: TeamTable[] = [];
  dataPhase2FinalD: TeamTable[] = [];

  Soccer = faSoccerBall;
  Error = faTriangleExclamation;

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceL3();
    this.teamsFormService.fetchTeamsFormL3();

    combineLatest([
      this.divisionsService.divisionL3$,
      this.teamsService.teamsL3$,
      this.teamsPerformanceService.teamsPerformanceL3$,
      this.teamsFormService.teamsFormL3$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([divisionState, teamsState, teamsPerformanceState, teamsFormState]) => {
        if (
          divisionState.status === 'success' && teamsState.status === 'success' && teamsPerformanceState.status === 'success' && teamsFormState.status === 'success' &&
          divisionState.data !== null && teamsState.data !== null && teamsPerformanceState.data !== null && teamsFormState.data !== null
        ) {
          this.phase1 = divisionState.data.phase1.status || false;
          this.phase2 = divisionState.data.phase2.status || divisionState.data.phase3.status || false;

          this.dataPhase1Regional1 = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase1', '1');
          this.dataPhase1Regional2 = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase1', '2');
          this.dataPhase1Regional3 = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase1', '3');
          this.dataPhase1Regional4 = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase1', '4');
          this.dataPhase2FinalA = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'f1');
          this.dataPhase2FinalB = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'f2');
          this.dataPhase2FinalC = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'f3');
          this.dataPhase2FinalD = this.uiDataMapperService.teamsTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'f4');
          this.loadingState = 'success';
        } else if (divisionState.status === 'error' || teamsState.status === 'error' || teamsPerformanceState.status === 'error' || teamsFormState.status === 'error') {
          this.loadingState = 'error';
        } else {
          this.loadingState = 'loading';
        }
      },
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}
