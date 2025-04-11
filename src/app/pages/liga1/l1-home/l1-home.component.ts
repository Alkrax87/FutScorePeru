import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DivisionInfoComponent } from "../../../components/division-info/division-info.component";
import { MapComponent } from '../../../components/map/map.component';
import { TitleComponent } from "../../../components/title/title.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';

@Component({
  selector: 'app-l1-home',
  imports: [MapComponent, RouterLink, DivisionInfoComponent, TitleComponent],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  dataTeams: TeamData[] = [];
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Apurímac', teams: 1 },
    { name: 'Arequipa', teams: 1 },
    { name: 'Ayacucho', teams: 1 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Cusco', teams: 3 },
    { name: 'Huánuco', teams: 1 },
    { name: 'Junín', teams: 2 },
    { name: 'Lambayeque', teams: 1 },
    { name: 'Lima y Callao', teams: 4 },
    { name: 'Piura', teams: 2 },
    { name: 'Puno', teams: 1 },
  ];

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.mapService.dataMapL1$,
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([division, teams, map]) => {
      this.dataDivision = division;
      this.dataTeams = teams;
      this.mapConstructor = map;

      if (this.dataTeams) {
        this.getDataForMap();
      }
    })
  }

  getDataForMap() {
    const mergedData = [];
    for (const team of this.dataTeams) {
      mergedData.push({
        teamId: team.teamId,
        category: team.category,
        imageThumbnail: team.imageThumbnail,
        alt: team.alt,
        location: team.location,
      })
    }
    this.dataMap = mergedData;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}