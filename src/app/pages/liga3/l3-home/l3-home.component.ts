import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { DivisionFixtureComponent } from "../../../components/division-fixture/division-fixture.component";
import { DivisionOverviewComponent } from '../../../components/division-overview/division-overview.component';
import { BtnComponent } from "../../../components/btn/btn.component";
import { DivisionTableComponent } from "../../../components/division-table/division-table.component";
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { DivisionTeamsComponent } from "../../../components/division-teams/division-teams.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { FixtureCompactCard } from '../../../interfaces/ui-models/fixture-compact-card';
import { TeamCompactTable } from '../../../interfaces/ui-models/team-compact-table';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';
import { TeamDivision } from '../../../interfaces/ui-models/team-division';

@Component({
  selector: 'app-l3-home',
  imports: [FontAwesomeModule, DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent, DivisionFixtureComponent, DivisionTableComponent, RouterLink, BtnComponent, DivisionTeamsComponent],
  templateUrl: './l3-home.component.html',
  styles: ``,
})
export class L3HomeComponent {
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
      this.divisionService.dataDivisionL3$,
      this.teamsService.dataTeamsL3$,
      this.fixtureService.dataFixtureL3$,
      this.resultsService.dataResultsL3$,
      this.performanceService.dataPerformanceL3$,
      this.mapService.dataMapL3$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, fixture, results, performance, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);
      this.teams = this.uiDataMapperService.teamDivisionMapper(teams);

      if (division) {
        if (division.thirdPhase.status === true) {
          this.final = true;
        } else {
          this.regional = division.firstPhase.status;
          this.final = division.secondPhase.status;
        }

        if (division.firstPhase.status) {
          this.stageData = {
            name: 'REGIONAL',
            inGame: division.firstPhase.inGame ?? 1
          }
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['regional1', 'regional2', 'regional3', 'regional4'], division.firstPhase.inGame ?? 0, 'regional'
          );
        } else {
          this.stageData = {
            name: 'FINAL',
            inGame: division.secondPhase.inGame ?? 1
          }
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['finalA', 'finalB', 'finalC', 'finalD'], division.secondPhase.inGame ?? 0, 'final'
          );
        }
      }

      this.tableRegionalA = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'regional', '1');
      this.tableRegionalB = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'regional', '2');
      this.tableRegionalC = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'regional', '3');
      this.tableRegionalD = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'regional', '4');
      this.tableFinal1 = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'final', 'f1');
      this.tableFinal2 = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'final', 'f2');
      this.tableFinal3 = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'final', 'f3');
      this.tableFinal4 = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'final', 'f4');
    });
  }

  dataDivision: DivisionData | null = null;
  fixture: FixtureCompactCard[] = [];
  regional: boolean = false;
  final: boolean = false;
  tableRegionalA: TeamCompactTable[] = [];
  tableRegionalB: TeamCompactTable[] = [];
  tableRegionalC: TeamCompactTable[] = [];
  tableRegionalD: TeamCompactTable[] = [];
  tableFinal1: TeamCompactTable[] = [];
  tableFinal2: TeamCompactTable[] = [];
  tableFinal3: TeamCompactTable[] = [];
  tableFinal4: TeamCompactTable[] = [];
  configRegional: { class: string; quantity: number }[] = [
    { class: 'bg-gpromotion', quantity: 4 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 1 },
  ];
  configFinal: { class: string; quantity: number }[] = [
    { class: 'bg-quarter', quantity: 2 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  stageData!: { name: string, inGame: number };
  descriptionDivision: string = 'La Liga 3 es la tercera categoría del fútbol semiprofesional en Perú, organizada por la Federación Peruana de Fútbol (FPF), donde equipos buscan ascender a la Liga 2.';
  tagsDivision: string[] = ['Liga 3', 'Tercera División', 'Liga Semiprofesional'];
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 1 },
    { name: 'Amazonas', teams: 1 },
    { name: 'Apurímac', teams: 1 },
    { name: 'Arequipa', teams: 2 },
    { name: 'Ayacucho', teams: 1 },
    { name: 'Cajamarca', teams: 1 },
    { name: 'Cusco', teams: 2 },
    { name: 'Huánuco', teams: 1 },
    { name: 'Huancavelica', teams: 1 },
    { name: 'Ica', teams: 1 },
    { name: 'Junín', teams: 3 },
    { name: 'Loreto', teams: 1 },
    { name: 'La Libertad', teams: 2 },
    { name: 'Lambayeque', teams: 3 },
    { name: 'Lima y Callao', teams: 7 },
    { name: 'Madre de Dios', teams: 1 },
    { name: 'Moquegua', teams: 1 },
    { name: 'Pasco', teams: 1 },
    { name: 'Piura', teams: 1 },
    { name: 'Puno', teams: 1 },
    { name: 'San Martín', teams: 1 },
    { name: 'Tacna', teams: 1 },
    { name: 'Tumbes', teams: 1 },
    { name: 'Ucayali', teams: 1 },
  ];
  teams: TeamDivision[] = [];
  Arrow = faAngleDoubleRight;
  summaryData: DivisionSummary = {
    teams: '37',
    stages: {
      total: 3,
      description: 'Fase Regional, Fase Final y PlayOffs',
    },
    objective: 'Ascenso a Liga 2',
  };

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.final = tab === 'grupos';
  }
}