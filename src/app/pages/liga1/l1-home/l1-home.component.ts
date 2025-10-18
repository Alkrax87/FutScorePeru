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
  selector: 'app-l1-home',
  imports: [DivisionOverviewComponent, DivisionMapComponent, DivisionSummaryComponent, DivisionFixtureComponent],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  divisionService = inject(FetchDivisionService);
  teamsService = inject(FetchTeamDataService);
  fixtureService = inject(FetchFixtureService);
  resultsService = inject(FetchResultsService);
  mapService = inject(FetchMapService);
  uiDataMapperService = inject(UiDataMapperService);
  matchesService = inject(MatchesSetupService);

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.fixtureService.dataFixtureL1$,
      this.resultsService.dataResultsL1$,
      this.mapService.dataMapL1$,
    ]).pipe(takeUntilDestroyed()).subscribe(([division, teams, fixture, results, map]) => {
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
    });
  }

  dataDivision: DivisionData | null = null;
  fixture: FixtureCompactCard[] = [];
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
  summaryData: DivisionSummary = {
    teams: '19',
    stages: {
      total: 3,
      description: 'Apertura, Clausura y PlayOffs',
    },
    objective: 'Campeón Nacional',
  };
}