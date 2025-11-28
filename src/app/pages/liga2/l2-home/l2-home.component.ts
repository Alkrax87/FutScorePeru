import { Component, inject } from '@angular/core';
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
import { DivisionOverviewComponent } from "../../../components/division-overview/division-overview.component";
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionTeamsComponent } from "../../../components/division-teams/division-teams.component";
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { FixtureCompactCard } from '../../../interfaces/ui-models/fixture-compact-card';
import { TeamCompactTable } from '../../../interfaces/ui-models/team-compact-table';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';
import { TeamDivision } from '../../../interfaces/ui-models/team-division';

@Component({
  selector: 'app-l2-home',
  imports: [FontAwesomeModule, DivisionMapComponent, DivisionSummaryComponent, DivisionFixtureComponent, DivisionTeamsComponent, DivisionOverviewComponent],
  templateUrl: './l2-home.component.html',
  styles: ``,
})
export class L2HomeComponent {
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
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.fixtureService.dataFixtureL2$,
      this.resultsService.dataResultsL2$,
      this.performanceService.dataPerformanceL2$,
      this.mapService.dataMapL2$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, fixture, results, performance, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);
      this.teams = this.uiDataMapperService.teamDivisionMapper(teams);

      if (division) {
        if (division.thirdPhase.status === true) {
          this.grupos = true;
        } else {
          this.regional = division.firstPhase.status;
          this.grupos = division.secondPhase.status;
        }

        if (division.firstPhase.status) {
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['gruposPromotionA', 'gruposPromotionB', 'gruposRelegation'], division.firstPhase.inGame ?? 0, 'regional'
          );
        } else {
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['gruposPromotionA', 'gruposPromotionB', 'gruposRelegation'], division.secondPhase.inGame ?? 0, 'grupos'
          );
        }
      }

      this.tableRegionalA = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'regional', 'a');
      this.tableRegionalB = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'regional', 'b');
      this.tablePromotion1 = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'grupos', 'p1');
      this.tablePromotion2 = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'grupos', 'p2');
      this.tableRelegation = this.uiDataMapperService.teamsTableCompactMapper(teams, performance, 'grupos', 'r');
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  dataDivision: DivisionData | null = null;
  fixture: FixtureCompactCard[] = [];
  regional: boolean = false;
  grupos: boolean = false;
  tableRegionalA: TeamCompactTable[] = [];
  tableRegionalB: TeamCompactTable[] = [];
  tablePromotion1: TeamCompactTable[] = [];
  tablePromotion2: TeamCompactTable[] = [];
  tableRelegation: TeamCompactTable[] = [];
  configRegional: { class: string; quantity: number }[] = [
    { class: 'bg-gpromotion', quantity: 5 },
    { class: '', quantity: 0 },
    { class: 'bg-grelegation', quantity: 3 },
  ];
  configGroupPromotion: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 1 },
    { class: 'bg-quarter', quantity: 2 },
    { class: '', quantity: 0 },
  ];
  configGroupRelegation: { class: string; quantity: number }[] = [
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 1 },
  ];
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
  teams: TeamDivision[] = [];
  Arrow = faAngleDoubleRight;
  summaryData: DivisionSummary = {
    teams: '15',
    stages: {
      total: 3,
      description: 'Fase Regional, Fase Grupos y PlayOffs',
    },
    objective: 'Ascenso a Liga 1',
  };

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
  }
}