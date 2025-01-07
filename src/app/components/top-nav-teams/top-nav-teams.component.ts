import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-nav-teams',
  imports: [RouterModule],
  templateUrl: './top-nav-teams.component.html',
  styleUrl: './top-nav-teams.component.css',
})
export class TopNavTeamsComponent {
  @Input() teams!: string[]
}
