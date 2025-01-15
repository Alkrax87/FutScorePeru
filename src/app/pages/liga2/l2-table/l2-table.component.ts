import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { TeamTable } from '../../../interfaces/team-table';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL2 } from '../../../interfaces/team-data-l2';

@Component({
  selector: 'app-l2-table',
  imports: [TableComponent],
  template: `
    <div class="bg-neutral-800 py-5">
      <app-table
        [config]="config"
        [headers]="headers"
        [data]="data"
      ></app-table>
    </div>
  `,
  styles: ``,
})
export class L2TableComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;

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
  config: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 4 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 3 },
  ];
  data: TeamTable[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      },
    });
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
