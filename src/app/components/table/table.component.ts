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
  @Input() config!: { class: string; quantity: number }[];
  @Input() data!: {
    name: string;
    abbreviation: string;
    image: string;
    imageThumbnail: string;
    alt: string;
    url: string;
    lastgames: [string, string, string, string, string];
    performance: {
      points: number;
      pj: number;
      pg: number;
      pe: number;
      pp: number;
      gf: number;
      gc: number;
      dg: number;
      sanction: number;
    };
  }[];
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;
}
