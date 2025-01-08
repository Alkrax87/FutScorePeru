import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() headers!: string[];
  @Input() data!: {
    name: string;
    pg: number;
    pe: number;
    pp: number;
    gf: number;
    gc: number;
    lastGames: [string, string, string, string, string];
  }[];
}
