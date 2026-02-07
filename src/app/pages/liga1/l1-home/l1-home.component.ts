import { Component, inject } from '@angular/core';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DivisionOverviewComponent } from "../../../components/division-overview/division-overview.component";
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionTeamsComponent } from "../../../components/division-teams/division-teams.component";
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { Division } from '../../../interfaces/api-models/division';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { TeamDivision } from '../../../interfaces/ui-models/team-division';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-l1-home',
  imports: [DivisionMapComponent, DivisionSummaryComponent, DivisionTeamsComponent, DivisionOverviewComponent],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  divisionsService = inject(FetchDivisionsService);
  teamsService = inject(FetchTeamsService);
  mapService = inject(FetchMapService);
  uiDataMapperService = inject(UiDataMapperService);

  constructor() {
    combineLatest([
      this.divisionsService.divisionL1$,
      this.teamsService.teamsL1$,
      this.mapService.dataMapL1$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);
      this.dataTeams = this.uiDataMapperService.teamDivisionMapper(teams);

      if (division) {
        let phases = 0;
        if (division.phase1 && division.phase1.name) { phases++ }
        if (division.phase2 && division.phase2.name) { phases++ }
        if (division.phase3 && division.phase3.name) { phases++ }

        this.dataDivisionSummary = {
          teams: division.teams,
          phases: phases,
          description: division.phase1.name + ' - ' + division!.phase2.name + ' - ' + division!.phase3.name,
          goal: division.goal,
        }
      }
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  dataDivision: Division | null = null;
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Apurímac', teams: 1 },
    { name: 'Arequipa', teams: 1 },
    { name: 'Cajamarca', teams: 3 },
    { name: 'Cusco', teams: 3 },
    { name: 'Junín', teams: 2 },
    { name: 'Lambayeque', teams: 1 },
    { name: 'Lima y Callao', teams: 4 },
    { name: 'Moquegua', teams: 1 },
    { name: 'Piura', teams: 2 },
  ];
  dataTeams: TeamDivision[] = [];
  dataDivisionSummary: DivisionSummary | null = null;
}