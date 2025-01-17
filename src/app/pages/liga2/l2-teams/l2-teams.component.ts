import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL2 } from '../../../interfaces/team-data-l2';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamCard } from '../../../interfaces/team-card';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';

@Component({
  selector: 'app-l2-teams',
  imports: [TeamCardComponent],
  templateUrl: './l2-teams.component.html',
  styleUrl: './l2-teams.component.css',
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
