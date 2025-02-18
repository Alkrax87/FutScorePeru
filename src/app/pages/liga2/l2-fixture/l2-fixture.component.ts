import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';

@Component({
  selector: 'app-l2-fixture',
  imports: [TitleComponent],
  template: `
    <app-title [title]="'Fixture'"></app-title>
    <p>l2-fixture works!</p>
  `,
  styles: ``,
})
export class L2FixtureComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private fixtureService: FetchFixtureService
  ) {}

  private teamSubscription: Subscription | null = null;
  private fixtureSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;
  dataFixture: any;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      },
    });
    this.fixtureSubscription = this.fixtureService.dataFixtureL2$.subscribe({
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
