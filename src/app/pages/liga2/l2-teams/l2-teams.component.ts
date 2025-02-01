import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { Subscription } from 'rxjs';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';
import { TeamCard } from '../../../interfaces/ui-models/team-card';

@Component({
  selector: 'app-l2-teams',
  imports: [TeamCardComponent],
  template: `
    <div class="bg-night p-5">
      <div class="w-full">
        <div class="flex justify-center">
          <div class="w-full lg:w-11/12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            @for (item of dataTeamsCard; track $index) {
              <app-team-card class="truncate" [data]="item"></app-team-card>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L2TeamsComponent {
  constructor(private teamsService: FetchTeamDataService, private stadiumService: FetchStadiumService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;
  dataTeamsCard: TeamCard[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        this.getDataForCard();
      },
    });
  }

  async getDataForCard() {
    const newData: TeamCard[] = [];

    if (this.dataTeams) {
      for (const team of this.dataTeams) {
        const stadium = await this.stadiumService.fetchStadium(team.stadium.url);
        newData.push({
          name: team.name,
          abbreviation: team.abbreviation,
          image: team.image,
          alt: team.alt,
          url: team.url,
          color: team.color,
          stadium: {
            name: stadium.name,
            capacity: stadium.capacity,
            location: stadium.location
          }
        });
      }
      this.dataTeamsCard = newData;
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
