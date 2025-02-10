import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { TransformStatisticDataService } from '../../../services/transform-statistic-data.service';
import { Subscription } from 'rxjs';
import { MapComponent } from "../../../components/map/map.component";
import { StatisticsComponent } from '../../../components/statistics/statistics.component';
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { TeamDataL2 } from '../../../interfaces/api-models/team-data-l2';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-l2-home',
  imports: [MapComponent, RouterModule, StatisticsComponent, FontAwesomeModule],
  templateUrl: './l2-home.component.html',
  styles: ``,
})
export class L2HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private statisticsService: FetchStatisticsService,
    private transformStatisticService: TransformStatisticDataService
  ) {}

  private divisionSubscription: Subscription | null = null;
  private teamSubscription: Subscription | null = null;
  private statisticsSubscription: Subscription | null = null;
  private mapSubscription: Subscription | null = null;
  dataDivision: DivisionData | null = null;
  dataTeams: TeamDataL2[] = [];
  dataStatistics: any;
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  Stats = faRankingStar;
  dataBestDefense: StatisticCard[] = [];
  dataWorstDefense: StatisticCard[] = [];
  dataMostGoals: StatisticCard[] = [];
  dataFewestGoals: StatisticCard[] = [];
  dataMostWins: StatisticCard[] = [];
  dataMostDraws: StatisticCard[] = [];
  dataMostLosses: StatisticCard[] = [];

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionL2$.subscribe({
      next: (data) => (this.dataDivision = data)
    });
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => (this.dataTeams = data, this.getDataForMap())
    });
    this.statisticsSubscription = this.statisticsService.dataStatisticsL2$.subscribe({
      next: (data) => (this.dataStatistics = data, this.getDataForStatistics())
    });
    this.mapSubscription = this.mapService.dataMapL2$.subscribe({
      next: (data) => (this.mapConstructor = data)
    });
  }

  getDataForMap() {
    const mergedData = [];
    for (const team of this.dataTeams) {
      mergedData.push({
        imageThumbnail: team.imageThumbnail,
        alt: team.alt,
        location: team.location,
      })
    }
    this.dataMap = mergedData;
  }

  getDataForStatistics() {
    this.dataBestDefense = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.bestDefense, 'gc');
    this.dataWorstDefense = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.worstDefense, 'gc');
    this.dataMostGoals = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.mostGoals, 'gf');
    this.dataFewestGoals = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.fewestGoals, 'gf');
    this.dataMostWins = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.mostWins, 'pg');
    this.dataMostDraws = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.mostDraws, 'pe');
    this.dataMostLosses = this.transformStatisticService.transformData(this.dataTeams, this.dataStatistics.mostLosses, 'pp');
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.statisticsSubscription?.unsubscribe();
  }
}