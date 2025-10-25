import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DivisionOverviewComponent } from '../../../components/division-overview/division-overview.component';
import { BtnComponent } from "../../../components/btn/btn.component";
import { DivisionTableComponent } from "../../../components/division-table/division-table.component";
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { DivisionFixtureComponent } from "../../../components/division-fixture/division-fixture.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { FixtureCompactCard } from '../../../interfaces/ui-models/fixture-compact-card';
import { TeamCompactTable } from '../../../interfaces/ui-models/team-compact-table';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-l1-home',
  imports: [FontAwesomeModule, DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent, DivisionFixtureComponent, DivisionTableComponent, RouterLink, BtnComponent],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  divisionService = inject(FetchDivisionService);
  teamsService = inject(FetchTeamDataService);
  fixtureService = inject(FetchFixtureService);
  resultsService = inject(FetchResultsService);
  performanceService = inject(FetchPerformanceService);
  mapService = inject(FetchMapService);
  uiDataMapperService = inject(UiDataMapperService);
  matchesService = inject(MatchesSetupService);

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.fixtureService.dataFixtureL1$,
      this.resultsService.dataResultsL1$,
      this.performanceService.dataPerformanceL1$,
      this.mapService.dataMapL1$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, fixture, results, performance, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);

      if (division) {
        if (division.firstPhase.status) {
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['apertura'], division.firstPhase.inGame ?? 0
          );
          this.stageData = {
            name: 'APERTURA',
            inGame: division.firstPhase.inGame ?? 1
          }
        } else {
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['clausura'], division.secondPhase.inGame ?? 0
          );
          this.stageData = {
            name: 'CLAUSURA',
            inGame: division.secondPhase.inGame ?? 1
          }
        }
      }

      this.tableApertura = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'apertura', undefined);
      this.tableClausura = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'clausura', undefined);
      this.tableAcumulado = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'acumulado', undefined);
    });
  }

  dataDivision: DivisionData | null = null;
  fixture: FixtureCompactCard[] = [];
  acumulado: boolean = true;
  apertura: boolean = false;
  clausura: boolean = false;
  tableApertura: TeamCompactTable[] = [];
  tableClausura: TeamCompactTable[] = [];
  tableAcumulado: TeamCompactTable[] = [];
  configApertura: { class: string; quantity: number }[] = [
    { class: 'bg-gold', quantity: 1 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  configClausura: { class: string; quantity: number }[] = [
    { class: 'bg-gold', quantity: 1 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  configAcumulado: { class: string; quantity: number }[] = [
    { class: 'bg-libertadores', quantity: 4 },
    { class: 'bg-sudamericana', quantity: 4 },
    { class: 'bg-relegation', quantity: 3 },
  ];
  stageData!: { name: string, inGame: number };
  descriptionDivision: string = 'La Liga 1 es la máxima categoría del fútbol profesional en Perú, organizada por la Federación Peruana de Fútbol (FPF) y reúne a los mejores equipos del país en busca del título nacional.';
  tagsDivision: string[] = ['Liga 1', 'Primera División', 'Liga Profesional'];
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
  Arrow = faAngleDoubleRight;
  summaryData: DivisionSummary = {
    teams: '19',
    stages: {
      total: 3,
      description: 'Apertura, Clausura y PlayOffs',
    },
    objective: 'Campeón Nacional',
  };

  setActiveTab(tab: String) {
    this.acumulado = tab === 'acumulado';
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
  }
}