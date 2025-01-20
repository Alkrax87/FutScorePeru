import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';

@Component({
  selector: 'app-l3-teams',
  imports: [],
  templateUrl: './l3-teams.component.html',
  styleUrl: './l3-teams.component.css'
})
export class L3TeamsComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      }
    })
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
