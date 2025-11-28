import { Component, inject } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DivisionOverviewComponent } from '../../../components/division-overview/division-overview.component';
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionTeamsComponent } from "../../../components/division-teams/division-teams.component";
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';
import { TeamDivision } from '../../../interfaces/ui-models/team-division';

@Component({
  selector: 'app-cp-home',
  imports: [DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent, DivisionTeamsComponent],
  templateUrl: './cp-home.component.html',
  styles: ``,
})
export class CpHomeComponent {
  divisionService = inject(FetchDivisionService);
  teamsService = inject(FetchTeamDataService);
  mapService = inject(FetchMapService);
  uiDataMapperService = inject(UiDataMapperService);

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionCP$,
      this.teamsService.dataTeamsCP$,
      this.mapService.dataMapCP$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamCPMapMapper(teams);
      this.teams =  this.uiDataMapperService.teamDivisionMapperCP(teams);
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  dataDivision: DivisionData | null = null;
  descriptionDivision: string = 'La Copa Perú es un torneo de fútbol amateur en Perú, organizado por la Federación Peruana de Fútbol (FPF) y la Subcomisión Nacional de Fútbol Aficionado, donde equipos de diversas regiones del país buscan ascender a la Liga 2 y Liga 3.';
  tagsDivision: string[] = ['Copa Perú', 'Cuarta Division', 'Fútbol Amateur'];
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 3 },
    { name: 'Amazonas', teams: 2 },
    { name: 'Apurímac', teams: 3 },
    { name: 'Arequipa', teams: 3 },
    { name: 'Ayacucho', teams: 3 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Cusco', teams: 3 },
    { name: 'Huánuco', teams: 3 },
    { name: 'Huancavelica', teams: 2 },
    { name: 'Ica', teams: 3 },
    { name: 'Junín', teams: 3 },
    { name: 'Loreto', teams: 2 },
    { name: 'La Libertad', teams: 3 },
    { name: 'Lambayeque', teams: 3 },
    { name: 'Lima y Callao', teams: 5 },
    { name: 'Madre de Dios', teams: 2 },
    { name: 'Moquegua', teams: 2 },
    { name: 'Pasco', teams: 2 },
    { name: 'Piura', teams: 3 },
    { name: 'Puno', teams: 3 },
    { name: 'San Martín', teams: 3 },
    { name: 'Tacna', teams: 2 },
    { name: 'Tumbes', teams: 2 },
    { name: 'Ucayali', teams: 2 },
  ];
  teams: TeamDivision[] = [];
  summaryData: DivisionSummary = {
    teams: '+10k',
    stages: {
      total: 4,
      description: 'Distrital, Provincial, Departamental y Nacional',
    },
    objective: 'Ascenso Liga 2 y Liga 3',
  };
}