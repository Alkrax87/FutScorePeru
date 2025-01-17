import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/team-data-l1';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamCard } from '../../../interfaces/team-card';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';

@Component({
  selector: 'app-l1-teams',
  imports: [TeamCardComponent],
  templateUrl: './l1-teams.component.html',
  styleUrl: './l1-teams.component.css',
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
