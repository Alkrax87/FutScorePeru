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
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { Subscription } from 'rxjs';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { TeamData } from '../../../interfaces/api-models/team-data';
import { TeamNav } from '../../../interfaces/ui-models/team-nav';

@Component({
  selector: 'app-l3-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  template: `
    <app-top-nav-teams [teams]="dataTeamsNav"></app-top-nav-teams>
    <div class="hidden md:block h-2 bg-crimson"></div>
    <app-options-nav [options]="navOptions" [division]="'Liga 3'"></app-options-nav>
    <div class="hidden md:block h-2 bg-crimson"></div>
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
    private stadiumsService: FetchStadiumService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamData[] = [];
  dataTeamsNav: TeamNav[] = [];
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
        this.dataTeams = data;
        this.getDataForNav();
      }
    });
  }

  getDataForNav() {
    const newData: TeamNav[] = this.dataTeams ? this.dataTeams.map(({ category, teamId, imageThumbnail, alt }) => ({ category, teamId, imageThumbnail, alt })) : [];
    this.dataTeamsNav = newData;
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}