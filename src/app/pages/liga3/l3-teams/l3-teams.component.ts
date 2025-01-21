import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';
import { TeamCard } from '../../../interfaces/ui-models/team-card';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";

@Component({
  selector: 'app-l3-teams',
  imports: [TeamCardComponent],
  templateUrl: './l3-teams.component.html',
  styleUrl: './l3-teams.component.css',
})
export class L3TeamsComponent {
  constructor(private teamsService: FetchTeamDataService, private stadiumService: FetchStadiumService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] | null = null;
  dataTeamsCard: TeamCard[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
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
          image: team.imageThumbnail,
          alt: team.alt,
          url: team.url,
          color: team.color,
          stadium: {
            name: stadium.name,
            capacity: stadium.capacity,
            location: stadium.location,
          },
        });
      }
      this.dataTeamsCard = newData;
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
