import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL2 } from '../../../interfaces/team-data-l2';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamCard } from '../../../interfaces/team-card';

@Component({
  selector: 'app-l2-teams',
  imports: [TeamCardComponent],
  templateUrl: './l2-teams.component.html',
  styleUrl: './l2-teams.component.css',
})
export class L2TeamsComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;
  dataTeamsCard: TeamCard[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
        this.getDataforCard();
      },
    });
  }

  getDataforCard() {
    const defaultStadium = {
      name: 'stadium',
      capacity: 'capacity',
      location: 'location'
    };

    const newData: TeamCard[] = this.dataTeams ? this.dataTeams.map(
      ({ name, abbreviation, image, alt, url, color }) => ({ name, abbreviation, image, alt, url, color, stadium: {...defaultStadium} })
    ) : [];
    this.dataTeamsCard = newData;
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
