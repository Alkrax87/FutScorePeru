import { Component, inject } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DivisionOverviewComponent } from '../../../components/division-overview/division-overview.component';
import { DivisionMapComponent } from '../../../components/division-map/division-map.component';
import { DivisionSummaryComponent } from '../../../components/division-summary/division-summary.component';
import { DivisionFixtureComponent } from "../../../components/division-fixture/division-fixture.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { FixtureCompactCard } from '../../../interfaces/ui-models/fixture-compact-card';
import { DivisionSummary } from '../../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-l2-home',
  imports: [DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent, DivisionFixtureComponent],
  templateUrl: './l2-home.component.html',
  styles: ``,
})
export class L2HomeComponent {
  divisionService = inject(FetchDivisionService);
  teamsService = inject(FetchTeamDataService);
  fixtureService = inject(FetchFixtureService);
  resultsService = inject(FetchResultsService);
  mapService = inject(FetchMapService);
  uiDataMapperService = inject(UiDataMapperService);
  matchesService = inject(MatchesSetupService);

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.fixtureService.dataFixtureL2$,
      this.resultsService.dataResultsL2$,
      this.mapService.dataMapL2$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, fixture, results, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);

      if (division) {
        if (division.firstPhase.status) {
          this.stageData = {
            name: 'REGIONAL',
            inGame: division.firstPhase.inGame ?? 1
          }
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['gruposPromotionA', 'gruposPromotionB', 'gruposRelegation'], division.firstPhase.inGame ?? 0, 'regional'
          );
        } else {
          this.stageData = {
            name: 'GRUPOS',
            inGame: division.secondPhase.inGame ?? 1
          }
          this.fixture = this.matchesService.transformDataForHomeFixture(
            teams, fixture, results, ['gruposPromotionA', 'gruposPromotionB', 'gruposRelegation'], division.secondPhase.inGame ?? 0, 'grupos'
          );
        }
      }
    });
  }

  dataDivision: DivisionData | null = null;
  fixture: FixtureCompactCard[] = [];
  stageData!: { name: string, inGame: number };
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
  };
}