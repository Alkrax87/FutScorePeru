import { Component } from '@angular/core';
import { TableComponent } from "../../../components/table/table.component";

@Component({
  selector: 'app-l1-table',
  imports: [TableComponent],
  template: `
    <div class="bg-neutral-800 py-5">
      <app-table [config]="config" [headers]="headers" [data]="data"></app-table>
    </div>
  `,
  styles: ``,
})
export class L1TableComponent {
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
    "Últimas 5 Fechas"
  ];
  config: { class: string; quantity: number }[] = [
    { class: 'bg-libertadores', quantity: 4 },
    { class: 'bg-sudamericana', quantity: 4 },
    { class: 'bg-relegation', quantity: 3 },
  ];
  data: {
    name: string;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    lastGames: [string, string, string, string, string];
  }[] = [
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["","","","",""] },
  ]
}
