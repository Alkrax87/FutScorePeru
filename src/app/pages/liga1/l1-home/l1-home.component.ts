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
  selector: 'app-l1-home',
  imports: [DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  descriptionDivision: string = 'La Liga 1 es la máxima categoría del fútbol profesional en Perú, organizada por la Federación Peruana de Fútbol (FPF) y reúne a los mejores equipos del país en busca del título nacional.';
  tagsDivision: string[] = ['Liga 1', 'Primera División', 'Liga Profesional']
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
  summaryData: DivisionSummary = {
    teams: '19',
    stages: {
      total: 3,
      description: 'Apertura, Clausura y PlayOffs',
    },
    objective: 'Campeón Nacional',
  }

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.mapService.dataMapL1$,
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