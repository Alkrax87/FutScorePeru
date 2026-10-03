import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsPerformanceService } from '../../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../../services/fetch-teams-form.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from "../../../components/title/title.component";
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { TableComponent } from "../../../components/table/table.component";
import { TeamTable } from '../../../interfaces/ui-models/team-table';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cp-table',
  imports: [TitleComponent, TableComponent, SubtitleComponent, FaIconComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
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
          <app-subtitle>Etapa Nacional</app-subtitle>
          <app-table [config]="configTable" [headers]="headers" [data]="dataTeams" [isCPTable]="true"></app-table>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpTableComponent {
  private viewPortScroller = inject(ViewportScroller);
  private teamsService = inject(FetchTeamsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private uiDataMapperService = inject(UiDataMapperService);

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  headers: string[] = ['', 'Pos', 'Club', '', 'Pts', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'PR', 'Últimos 5 partidos'];
  configTable = [
    { active: true, name: '16avos', image: 'assets/images/pages/Bracket-Next-Round.svg', class: 'bg-nextround', quantity: 32 },
  ];
  dataTeams: TeamTable[] = [];

  Error = faTriangleExclamation;

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceCP();
    this.teamsFormService.fetchTeamsFormCP();

    combineLatest([
      this.teamsService.teamsCP$,
      this.teamsPerformanceService.teamsPerformanceCP$,
      this.teamsFormService.teamsFormCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, teamsPerformanceState, teamsFormState]) => {
        if (
          teamsState.status === 'success' && teamsPerformanceState.status === 'success' && teamsFormState.status === 'success' &&
          teamsState.data !== null && teamsPerformanceState.data !== null && teamsFormState.data !== null
        ) {
          this.dataTeams = this.uiDataMapperService.teamsCPTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data);
          this.loadingState = 'success';
        } else if (teamsState.status === 'error' || teamsPerformanceState.status === 'error' || teamsFormState.status === 'error') {
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
}