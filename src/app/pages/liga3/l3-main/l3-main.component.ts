import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { FetchFixtureService } from '../../../services/fetch-fixture.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { TopNavItemsComponent } from '../../../components/top-nav-teams/top-nav-items.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { ItemNav } from '../../../interfaces/ui-models/item-nav';

@Component({
  selector: 'app-l3-main',
  imports: [TopNavItemsComponent, OptionsNavComponent, RouterOutlet],
  template: `
    <app-top-nav-items [items]="dataTeamsNav"></app-top-nav-items>
    <app-options-nav [options]="navOptions" [division]="'Liga 3'"></app-options-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L3MainComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private divisionService: FetchDivisionService,
    private mapService: FetchMapService,
    private fixtureService: FetchFixtureService,
    private resultsService: FetchResultsService,
    private statisticsService: FetchStatisticsService,
    private performanceService: FetchPerformanceService,
    private lastGamesService: FetchLastGamesService,
    private stadiumsService: FetchStadiumService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeamsNav: ItemNav[] = [];
  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Estadísticas', route: 'estadisticas', icon: faRankingStar },
  ];

  ngOnInit() {
    this.teamsService.fetchTeamsL3();
    this.divisionService.fetchDivisionL3();
    this.mapService.fetchMapL3();
    this.fixtureService.fetchFixtureL3();
    this.resultsService.fetchResultsL3();
    this.statisticsService.fetchStatisticsL3();
    this.performanceService.fetchPerformanceL3();
    this.lastGamesService.fetchLastGamesL3();
    this.stadiumsService.fetchStadiums();
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => {
        this.dataTeamsNav = this.uiDataMapperService.teamsNavMapper(data);
      }
    });
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}