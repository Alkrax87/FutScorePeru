import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/team-data-l1';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamCard } from '../../../interfaces/team-card';

@Component({
  selector: 'app-l1-teams',
  imports: [TeamCardComponent],
  templateUrl: './l1-teams.component.html',
  styleUrl: './l1-teams.component.css',
})
export class L1TeamsComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  dataTeamsCard: TeamCard[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
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
