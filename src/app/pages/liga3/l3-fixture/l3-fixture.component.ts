import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';

@Component({
  selector: 'app-l3-fixture',
  imports: [],
  templateUrl: './l3-fixture.component.html',
  styleUrl: './l3-fixture.component.css'
})
export class L3FixtureComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private fixtureService: FetchFixtureService
  ) {}

  private teamSubscription: Subscription | null = null;
  private fixtureSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] | null = null;
  dataFixture: any;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      }
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL3$.subscribe({
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
