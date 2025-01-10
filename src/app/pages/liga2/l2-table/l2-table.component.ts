import { Component } from '@angular/core';
import { TableComponent } from "../../../components/table/table.component";

@Component({
  selector: 'app-l2-table',
  imports: [TableComponent],
  template: `
    <div class="bg-neutral-800 py-5">
      <app-table [config]="config" [headers]="headers" [data]="data1"></app-table>
      <app-table [config]="config" [headers]="headers" [data]="data2"></app-table>
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
    "Últimas 5 Fechas"
  ];
  config: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 4 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 3 },
  ];
  data1: {
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
  ];
  data2: {
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
  ];
}
