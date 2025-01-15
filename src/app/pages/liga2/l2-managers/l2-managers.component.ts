import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL2 } from '../../../interfaces/team-data-l2';

@Component({
  selector: 'app-l2-managers',
  imports: [],
  templateUrl: './l2-managers.component.html',
  styleUrl: './l2-managers.component.css',
})
export class L2ManagersComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      },
    });
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
