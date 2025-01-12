import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { TeamTable } from '../../../interfaces/team-table';

@Component({
  selector: 'app-l2-table',
  imports: [TableComponent],
  template: `
    <div class="bg-neutral-800 py-5">
      <app-table [config]="config" [headers]="headers" [data]="data"></app-table>
    </div>
  `,
  styles: ``,
})
export class L2TableComponent {
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
}
