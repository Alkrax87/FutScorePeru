import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchTeamDataService } from '../../services/fetch-team-data.service';
import { FetchDivisionService } from '../../services/fetch-division.service';
import { FetchMapService } from '../../services/fetch-map.service';
import { FetchFixtureService } from '../../services/fetch-fixture.service';
import { FetchResultsService } from '../../services/fetch-results.service';
import { FetchStatisticsService } from '../../services/fetch-statistics.service';
import { FetchPerformanceService } from '../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../services/fetch-last-games.service';
import { FetchBracketsService } from '../../services/fetch-brackets.service';
import { FetchManagerService } from '../../services/fetch-manager.service';
import { FetchStadiumService } from '../../services/fetch-stadium.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { EntityNav } from '../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-l2-main',
  imports: [EntityNavBarComponent, SectionSubnavComponent, RouterOutlet],
  template: `
    <app-entity-nav-bar [entities]="navEntities"></app-entity-nav-bar>
    <app-section-subnav [routes]="navRoutes" [division]="'Liga 2'"></app-section-subnav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L2MainComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private divisionService: FetchDivisionService,
    private mapService: FetchMapService,
    private fixtureService: FetchFixtureService,
    private resultsService: FetchResultsService,
    private statisticsService: FetchStatisticsService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private bracketsService: FetchBracketsService,
    private managersService: FetchManagerService,
    private stadiumsService: FetchStadiumService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private teamSubscription: Subscription | null = null;
  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Clubes', route: 'clubes', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
    { name: 'Estadísticas', route: 'estadisticas', icon: faRankingStar },
  ];

  ngOnInit() {
    this.teamsService.fetchTeamsL2();
    this.divisionService.fetchDivisionL2();
    this.mapService.fetchMapL2();
    this.fixtureService.fetchFixtureL2();
    this.resultsService.fetchResultsL2();
    this.statisticsService.fetchStatisticsL2();
    this.performanceService.fetchPerformanceL2();
    this.lastGamesService.fetchLastGamesL2();
    this.bracketsService.fetchBracketsL2();
    this.managersService.fetchManagersL2();
    this.stadiumsService.fetchStadiums();
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => {
        this.navEntities = this.uiDataMapperService.teamsNavMapper(data);
      },
    });
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}