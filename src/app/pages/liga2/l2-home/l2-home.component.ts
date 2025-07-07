import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DivisionOverviewComponent } from "../../../components/division-overview/division-overview.component";
import { DivisionMapComponent } from "../../../components/division-map/division-map.component";
import { DivisionSummaryComponent } from "../../../components/division-summary/division-summary.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-l2-home',
  imports: [DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent],
  templateUrl: './l2-home.component.html',
  styles: ``,
})
export class L2HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  descriptionDivision: string = 'La Liga 2 es la segunda categoría del fútbol profesional en Perú, organizada por la Federación Peruana de Fútbol (FPF), donde equipos buscan ascender a la Liga 1.';
  tagsDivision: string[] = ['Liga 2', 'Segunda División', 'Liga Profesional'];
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 1 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Ica', teams: 1 },
    { name: 'Loreto', teams: 1 },
    { name: 'La Libertad', teams: 3 },
    { name: 'Lambayeque', teams: 1 },
    { name: 'Lima y Callao', teams: 3 },
    { name: 'Moquegua', teams: 1 },
    { name: 'San Martín', teams: 1 },
    { name: 'Tacna', teams: 1 },
  ];
  summaryData: DivisionSummary = {
    teams: '15',
    stages: {
      total: 3,
      description: 'Fase Regional, Fase Grupos y PlayOffs',
    },
    objective: 'Ascenso a Liga 1',
  }

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.mapService.dataMapL2$,
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([division, teams, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}