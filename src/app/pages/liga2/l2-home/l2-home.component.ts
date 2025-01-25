import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { MapComponent } from "../../../components/map/map.component";
import { Subscription } from 'rxjs';
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';
import { Map } from '../../../interfaces/api-models/map';

@Component({
  selector: 'app-l2-home',
  imports: [MapComponent, RouterModule],
  templateUrl: './l2-home.component.html',
  styles: ``,
})
export class L2HomeComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL2[] | null = null;
  map: Map[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      }
    })
    this.mapService.fetchMap(2).then((data: any) => {
      this.map = data;
    }).catch((error) => console.log('Error: ', error));
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
