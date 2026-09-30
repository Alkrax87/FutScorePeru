import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
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
  selector: 'app-l3-home',
  imports: [DivisionMapComponent, DivisionSummaryComponent, DivisionTeamsComponent, DivisionOverviewComponent],
  templateUrl: './l3-home.component.html',
  styles: ``,
})
export class L3HomeComponent {
  private viewPortScoller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private mapService = inject(FetchMapService);
  private uiDataMapperService = inject(UiDataMapperService);

  constructor() {
    this.mapService.fetchMapL3();

    combineLatest([
      this.divisionsService.divisionL3$,
      this.teamsService.teamsL3$,
      this.mapService.dataMapL3$,
    ]).pipe(takeUntilDestroyed()).subscribe(([divisionState, teamsState, mapState]) => {
      this.dataDivision = divisionState.data;
      if (mapState.data !== null) {
        this.mapConstructor = mapState.data
      }
      if (teamsState.data !== null) {
        this.dataMap = this.uiDataMapperService.teamsMapMapper(teamsState.data);
        this.dataTeams = this.uiDataMapperService.teamsDivisionMapper(teamsState.data);
      }

      if (divisionState.data !== null) {
        let phases = 0;
        if (divisionState.data.phase1 && divisionState.data.phase1.name) { phases++ }
        if (divisionState.data.phase2 && divisionState.data.phase2.name) { phases++ }
        if (divisionState.data.phase3 && divisionState.data.phase3.name) { phases++ }

        this.dataDivisionSummary = {
          teams: divisionState.data.teams,
          phases: phases,
          description: divisionState.data.phase1.name + ' - ' + divisionState.data.phase2.name + ' - ' + divisionState.data.phase3.name,
          goal: divisionState.data.goal,
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScoller.scrollToPosition([0, 0]);
    }
  }

  dataDivision: Division | null = null;
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 1 },
    { name: 'Amazonas', teams: 1 },
    { name: 'Apurímac', teams: 1 },
    { name: 'Arequipa', teams: 3 },
    { name: 'Ayacucho', teams: 1 },
    { name: 'Cajamarca', teams: 1 },
    { name: 'Cusco', teams: 3 },
    { name: 'Huánuco', teams: 1 },
    { name: 'Huancavelica', teams: 1 },
    { name: 'Junín', teams: 2 },
    { name: 'La Libertad', teams: 2 },
    { name: 'Lambayeque', teams: 2 },
    { name: 'Lima y Callao', teams: 11 },
    { name: 'Pasco', teams: 1 },
    { name: 'Piura', teams: 2 },
    { name: 'Puno', teams: 1 },
    { name: 'San Martín', teams: 2 },
    { name: 'Tacna', teams: 1 },
  ];
  dataTeams: TeamDivision[] = [];
  dataDivisionSummary: DivisionSummary | null = null;
}