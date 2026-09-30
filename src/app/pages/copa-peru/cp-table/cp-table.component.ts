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

@Component({
  selector: 'app-cp-table',
  imports: [TitleComponent, TableComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        <app-subtitle>Etapa Nacional</app-subtitle>
        <app-table [config]="configTable" [headers]="headers" [data]="dataTeams" [isCPTable]="true"></app-table>
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

  headers: string[] = ['', 'Pos', 'Club', '', 'Pts', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'PR', 'Últimos 5 partidos'];
  configTable = [
    { active: true, name: '16avos', image: 'assets/images/pages/Bracket-Next-Round.svg', class: 'bg-nextround', quantity: 32 },
  ];
  dataTeams: TeamTable[] = [];

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceCP();
    this.teamsFormService.fetchTeamsFormCP();

    combineLatest([
      this.teamsService.teamsCP$,
      this.teamsPerformanceService.teamsPerformanceCP$,
      this.teamsFormService.teamsFormCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, teamsPerformanceState, teamsFormState]) => {
        if (teamsState.data !== null && teamsPerformanceState.data !== null && teamsFormState.data !== null) {
          this.dataTeams = this.uiDataMapperService.teamsCPTableMapper(teamsState.data, teamsPerformanceState.data, teamsFormState.data);
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}