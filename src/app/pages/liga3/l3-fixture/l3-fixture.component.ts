import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/team-data-l3';

@Component({
  selector: 'app-l3-fixture',
  imports: [],
  templateUrl: './l3-fixture.component.html',
  styleUrl: './l3-fixture.component.css'
})
export class L3FixtureComponent {
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
