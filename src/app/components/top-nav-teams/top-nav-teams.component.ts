import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-top-nav-teams',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './top-nav-teams.component.html',
  styleUrl: './top-nav-teams.component.css',
})
export class TopNavTeamsComponent {
  @Input() teams!: string[]
  Icon = faUpRightFromSquare
}
