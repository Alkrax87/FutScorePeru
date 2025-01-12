import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TeamTable } from '../../interfaces/team-table';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent {
  @Input() headers!: string[];
  @Input() config!: { class: string; quantity: number }[];
  @Input() data!: TeamTable[];
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;
}
