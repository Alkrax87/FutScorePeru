import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { FetchTeamsService } from '../../services/fetch-teams.service';
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { FetchMapService } from '../../services/fetch-map.service';
import { FetchStadiumsService } from '../../services/fetch-stadiums.service';
import { FetchFixturesService } from '../../services/fetch-fixtures.service';
import { FetchTeamsMatchResultsService } from '../../services/fetch-teams-match-results.service';
import { FetchTeamsPerformanceService } from '../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../services/fetch-teams-form.service';
import { FetchBracketsService } from '../../services/fetch-brackets.service';
import { FetchStatisticsService } from '../../services/fetch-statistics.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
import { EntityNav } from '../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-l3-main',
  imports: [EntityNavBarComponent, SectionSubnavComponent, RouterOutlet],
  template: `
    <app-entity-nav-bar [entities]="navEntities"></app-entity-nav-bar>
    <app-section-subnav [routes]="navRoutes" [division]="'Liga 3'"></app-section-subnav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L3MainComponent {
  private teamsService = inject(FetchTeamsService);
  private divisionsService = inject(FetchDivisionsService);
  private mapService = inject(FetchMapService);
  private stadiumsService = inject(FetchStadiumsService);
  private fixturesService = inject(FetchFixturesService);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private bracketsService = inject(FetchBracketsService);
  private statisticsService = inject(FetchStatisticsService);
  private uiDataMapperService = inject(UiDataMapperService);

  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Clubes', route: 'clubes', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Estadísticas', route: 'estadisticas', icon: faRankingStar },
  ];

  constructor() {
    this.teamsService.teamsL3$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => this.navEntities = this.uiDataMapperService.teamsNavMapper(data)
    });
  }

  ngOnInit() {
    this.teamsService.fetchTeamsL3();
    this.divisionsService.fetchDivisionL3();
    this.mapService.fetchMapL3();
    this.stadiumsService.fetchStadiums();
    this.fixturesService.fetchFixtureL3();
    this.teamsMatchResultsService.fetchTeamsMatchResultsL3();
    this.teamsPerformanceService.fetchTeamsPerformanceL3();
    this.teamsFormService.fetchTeamsFormL3();
    this.bracketsService.fetchBracketsL3();
    this.statisticsService.fetchStatisticsL3();
  }
}