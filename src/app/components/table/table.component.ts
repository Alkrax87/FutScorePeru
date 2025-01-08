import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule],
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
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;
}
