import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { MapComponent } from '../../../components/map/map.component';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { Map } from '../../../interfaces/api-models/map';

@Component({
  selector: 'app-l1-home',
  imports: [MapComponent, RouterModule],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  map: Map[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
      }
    })
    this.mapService.fetchMap(1).then((data: any) => {
      this.map = data;
    }).catch((error) => console.log('Error: ', error));
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
