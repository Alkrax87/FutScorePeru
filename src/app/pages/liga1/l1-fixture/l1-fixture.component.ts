import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';

@Component({
  selector: 'app-l1-fixture',
  imports: [],
  templateUrl: './l1-fixture.component.html',
  styleUrl: './l1-fixture.component.css',
})
export class L1FixtureComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private fixtureService: FetchFixtureService
  ) {}

  private teamSubscription: Subscription | null = null;
  private fixtureSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  dataFixture: any;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      },
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL1$.subscribe({
      next: (data) => {
        this.dataFixture = data;
        console.log(this.dataFixture[0]);
      }
    });
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.fixtureSubscription?.unsubscribe();
  }
}
