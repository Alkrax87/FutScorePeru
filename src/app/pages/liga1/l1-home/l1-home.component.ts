import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { TransformStatisticDataService } from '../../../services/transform-statistic-data.service';
import { Subscription } from 'rxjs';
import { MapComponent } from '../../../components/map/map.component';
import { StatisticsComponent } from "../../../components/statistics/statistics.component";
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-l1-home',
  imports: [MapComponent, RouterModule, StatisticsComponent, FontAwesomeModule],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private statisticsService: FetchStatisticsService,
    private transformStatisticService: TransformStatisticDataService
  ) {}

  private teamSubscription: Subscription | null = null;
  private statisticsSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  dataStatistics: any;
  map: MapElement[] = [];
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
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
        this.getDataForMap();
      }
    });
    this.statisticsSubscription = this.statisticsService.dataStatisticsL1$.subscribe({
      next: (data) => {
        this.dataStatistics = data;
        console.log(this.dataStatistics);
        if (this.dataStatistics) {
          this.getDataForStatistics();
        }
      }
    });
    this.mapService.fetchMap(1).then((data: any) => {
      this.map = data;
    }).catch((error) => console.log('Error: ', error));
  }

  getDataForMap() {
    const mergedData = [];

    if (this.dataTeams) {
      for (const team of this.dataTeams) {
        mergedData.push({
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          location: team.location,
        })
      }
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
