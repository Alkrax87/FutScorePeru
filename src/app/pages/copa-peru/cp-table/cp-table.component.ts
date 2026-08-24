import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';
import { FetchTeamsPerformanceService } from '../../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../../services/fetch-teams-form.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from "../../../components/title/title.component";
import { TableComponent } from "../../../components/table/table.component";
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-cp-table',
  imports: [TitleComponent, TableComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-10 lg:py-16 duration-500 select-none">
      <app-table [config]="configTable" [headers]="headers" [data]="dataTeams" [isCPTable]="true"></app-table>
    </div>
  `,
  styles: ``,
})
export class CpTableComponent {
  private viewPortScoller = inject(ViewportScroller);
  private teamsCPService = inject(FetchTeamsCPService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private uiDataMapperService = inject(UiDataMapperService);

  headers: string[] = ['', 'Pos', 'Club', 'PTS', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'PR', 'Últimos 5 partidos'];
  configTable = [
    { active: true, name: '16avos', image: 'assets/images/pages/Bracket-Next-Round.svg', class: 'bg-nextround', quantity: 32 },
  ];
  dataTeams: TeamTable[] = [];

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceCP();
    this.teamsFormService.fetchTeamsFormCP();

    combineLatest([
      this.teamsCPService.teamsCP$,
      this.teamsPerformanceService.teamsPerformanceCP$,
      this.teamsFormService.teamsFormCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, teamsPerformance, teamsForm]) => {
        this.dataTeams = this.uiDataMapperService.teamsCPTableMapper(teams, teamsPerformance, teamsForm);
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScoller.scrollToPosition([0, 0]);
    }
  }
}