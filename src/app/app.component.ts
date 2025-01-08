import { Component } from '@angular/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './components/table/table.component';
@Component({
  selector: 'app-root',
  imports: [
    TopBarComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    TableComponent,
  ],
  template: `
    <app-top-bar></app-top-bar>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-table [headers]="headers" [data]="data"></app-table>
    <app-footer></app-footer>
  `,
  styles: ``,
})
export class AppComponent {
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
  data: {
    name: string;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    lastGames: [string, string, string, string, string];
  }[] = [
    { name: "team", pg: 3, pe: 2, pp: 0, gf: 20, gc: 10, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 3, pe: 0, pp: 3, gf: 5, gc: 4, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 5, pp: 3, gf: 3, gc: 10, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
    { name: "team", pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, lastGames: ["win","draw","lose","",""] },
  ]
}
