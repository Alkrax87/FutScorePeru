import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/team-data-l1';

@Component({
  selector: 'app-l1-fixture',
  imports: [],
  templateUrl: './l1-fixture.component.html',
  styleUrl: './l1-fixture.component.css',
})
export class L1FixtureComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
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
