import { Component } from '@angular/core';
import { TopNavTeamsComponent } from "../../../components/top-nav-teams/top-nav-teams.component";

@Component({
  selector: 'app-l1-main',
  imports: [TopNavTeamsComponent],
  templateUrl: './l1-main.component.html',
  styleUrl: './l1-main.component.css',
})
export class L1MainComponent {
  teams: string[] = [
    'Team1',
    'Team2',
    'Team3',
    'Team4',
    'Team5',
    'Team6',
    'Team7',
    'Team8',
    'Team9',
    'Team10',
    'Team11',
    'Team12',
    'Team13',
    'Team14',
    'Team15',
    'Team16',
    'Team17',
    'Team18',
  ];
}
