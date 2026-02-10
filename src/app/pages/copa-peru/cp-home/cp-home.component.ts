import { Component, inject } from '@angular/core';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DivisionOverviewComponent } from '../../../components/division-overview/division-overview.component';
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionTeamsComponent } from "../../../components/division-teams/division-teams.component";
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { Division } from '../../../interfaces/api-models/division';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { TeamDivision } from '../../../interfaces/ui-models/team-division';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-cp-home',
  imports: [DivisionMapComponent, DivisionSummaryComponent, DivisionTeamsComponent, DivisionOverviewComponent],
  templateUrl: './cp-home.component.html',
  styles: ``,
})
export class CpHomeComponent {
  divisionsService = inject(FetchDivisionsService);
  teamsCPService = inject(FetchTeamsCPService);
  mapService = inject(FetchMapService);
  uiDataMapperService = inject(UiDataMapperService);

  constructor() {
    combineLatest([
      this.divisionsService.divisionCP$,
      this.teamsCPService.teamsCP$,
      this.mapService.dataMapCP$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamCPMapMapper(teams);
      this.dataTeams = this.uiDataMapperService.teamDivisionMapperCP(teams);

      if (division) {
        this.dataDivisionSummary = {
          teams: division.teams,
          phases: 4,
          description: 'Distrital - Provincial - Departamental - Nacional',
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
    { name: 'Áncash', teams: 2 },
    { name: 'Amazonas', teams: 2 },
    { name: 'Apurímac', teams: 2 },
    { name: 'Arequipa', teams: 2 },
    { name: 'Ayacucho', teams: 2 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Cusco', teams: 2 },
    { name: 'Huánuco', teams: 2 },
    { name: 'Huancavelica', teams: 2 },
    { name: 'Ica', teams: 2 },
    { name: 'Junín', teams: 2 },
    { name: 'Loreto', teams: 2 },
    { name: 'La Libertad', teams: 2 },
    { name: 'Lambayeque', teams: 2 },
    { name: 'Lima y Callao', teams: 2 },
    { name: 'Madre de Dios', teams: 2 },
    { name: 'Moquegua', teams: 2 },
    { name: 'Pasco', teams: 2 },
    { name: 'Piura', teams: 2 },
    { name: 'Puno', teams: 2 },
    { name: 'San Martín', teams: 2 },
    { name: 'Tacna', teams: 2 },
    { name: 'Tumbes', teams: 2 },
    { name: 'Ucayali', teams: 2 },
  ];
  dataTeams: TeamDivision[] = [];
  dataDivisionSummary: DivisionSummary | null = null;
}