import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { TeamNav } from '../../interfaces/team-nav';

@Component({
  selector: 'app-top-nav-teams',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './top-nav-teams.component.html',
  styleUrl: './top-nav-teams.component.css',
})
export class TopNavTeamsComponent {
  @Input() teams!: TeamNav[]
  Icon = faUpRightFromSquare
}
