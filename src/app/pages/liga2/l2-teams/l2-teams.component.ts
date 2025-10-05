import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { TeamCardComponent } from '../../../components/team-card/team-card.component';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';
import { TeamCard } from '../../../interfaces/ui-models/team-card';

@Component({
  selector: 'app-l2-teams',
  imports: [TitleComponent, TeamCardComponent],
  template: `
    <app-title [title]="'Clubes'"></app-title>
    <div class="bg-night p-3 sm:p-5 duration-500">
      <div class="flex justify-center">
        <div class="w-full lg:w-11/12 xl:w-10/12 grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 duration-500">
          @for (item of dataTeamsCard; track $index) {
            <app-team-card [data]="item"></app-team-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L2TeamsComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private stadiumService: FetchStadiumService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private teamSubscription: Subscription | null = null;
  private stadiumSubscription: Subscription | null = null;
  dataTeams: TeamData[] = [];
  dataStadiums: StadiumData[] = [];
  dataTeamsCard: TeamCard[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => (this.dataTeams = data),
    });
    this.stadiumSubscription = this.stadiumService.dataStadiums$.subscribe({
      next: (data) => (this.dataStadiums = data),
    });

    if (this.dataTeams && this.dataStadiums) {
      this.dataTeamsCard = this.uiDataMapperService.teamCardMapper(this.dataTeams, this.dataStadiums);
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.stadiumSubscription?.unsubscribe();
  }
}