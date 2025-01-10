import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircle,
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent {
  @Input() headers!: string[];
  @Input() config!: { class: string; quantity: number }[]
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
