import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchTeamDataService } from '../../services/fetch-team-data.service';
import { FetchDivisionService } from '../../services/fetch-division.service';
import { FetchMapService } from '../../services/fetch-map.service';
import { FetchFixtureService } from '../../services/fetch-fixture.service';
import { FetchResultsService } from '../../services/fetch-results.service';
import { FetchStatisticsService } from '../../services/fetch-statistics.service';
import { FetchPerformanceService } from '../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../services/fetch-last-games.service';
import { FetchManagerService } from '../../services/fetch-manager.service';
import { FetchStadiumService } from '../../services/fetch-stadium.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { EntityNav } from '../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-l1-main',
  imports: [EntityNavBarComponent, SectionSubnavComponent, RouterOutlet],
  template: `
    <app-entity-nav-bar [entities]="navEntities"></app-entity-nav-bar>
    <app-section-subnav [routes]="navRoutes" [division]="'Liga 1'"></app-section-subnav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L1MainComponent {
  private teamsService = inject(FetchTeamDataService);
  private divisionService = inject(FetchDivisionService);
  private mapService = inject(FetchMapService);
  private fixtureService = inject(FetchFixtureService);
  private resultsService = inject(FetchResultsService);
  private statisticsService = inject(FetchStatisticsService);
  private performanceService = inject(FetchPerformanceService);
  private lastGamesService = inject(FetchLastGamesService);
  private managersService = inject(FetchManagerService);
  private stadiumsService = inject(FetchStadiumService);
  private uiDataMapperService = inject(UiDataMapperService);

  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Clubes', route: 'clubes', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
    { name: 'Estadísticas', route: 'estadisticas', icon: faRankingStar },
  ];

  constructor() {
    this.teamsService.dataTeamsL1$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => this.navEntities = this.uiDataMapperService.teamsNavMapper(data)
    });
  }

  ngOnInit() {
    this.teamsService.fetchTeamsL1();
    this.divisionService.fetchDivisionL1();
    this.mapService.fetchMapL1();
    this.fixtureService.fetchFixtureL1();
    this.resultsService.fetchResultsL1();
    this.statisticsService.fetchStatisticsL1();
    this.performanceService.fetchPerformanceL1();
    this.lastGamesService.fetchLastGamesL1();
    this.managersService.fetchManagersL1();
    this.stadiumsService.fetchStadiums();
  }
}