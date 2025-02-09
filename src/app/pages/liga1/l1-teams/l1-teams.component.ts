import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { Subscription } from 'rxjs';
import { TeamCardComponent } from "../../../components/team-card/team-card.component";
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { StadiumData } from '../../../interfaces/api-models/stadium-data';
import { TeamCard } from '../../../interfaces/ui-models/team-card';

@Component({
  selector: 'app-l1-teams',
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
export class L1TeamsComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private stadiumService: FetchStadiumService
  ) {}

  private teamSubscription: Subscription | null = null;
  private stadiumSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] = [];
  dataStadiums: StadiumData[] = [];
  dataTeamsCard: TeamCard[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.stadiumSubscription = this.stadiumService.dataStadiums$.subscribe({
      next: (data) => (this.dataStadiums = data)
    });

    if (this.dataTeams && this.dataStadiums) {
      this.getDataForCard();
    }
  }

  getDataForCard() {
    const newData: TeamCard[] = [];

    if (this.dataTeams && this.dataStadiums) {
      const teamMap = new Map(this.dataStadiums.map((stadium) => [stadium.stadiumId, stadium]));

      for (const team of this.dataTeams) {
        const stadium = teamMap.get(team.stadium);
        newData.push({
          name: team.name,
          abbreviation: team.abbreviation,
          image: team.image,
          alt: team.alt,
          url: team.url,
          color: team.color,
          stadium: {
            name: stadium?.name ?? "Por Definir",
            capacity: stadium?.capacity ?? "",
            location: stadium?.location ?? ""
          }
        });
      }
      this.dataTeamsCard = newData;
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.stadiumSubscription?.unsubscribe();
  }
}
