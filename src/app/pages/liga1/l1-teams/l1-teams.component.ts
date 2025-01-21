import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamCard } from '../../../interfaces/ui-models/team-card';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';

@Component({
  selector: 'app-l1-teams',
  imports: [TeamCardComponent],
  template: `
    <div class="bg-night p-5">
      <div class="w-full">
        <div class="flex justify-center">
          <div class="w-full lg:w-11/12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            @for (item of dataTeamsCard; track $index) {
              <app-team-card [data]="item"></app-team-card>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L1TeamsComponent {
  constructor(private teamsService: FetchTeamDataService, private stadiumService: FetchStadiumService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  dataTeamsCard: TeamCard[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
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
