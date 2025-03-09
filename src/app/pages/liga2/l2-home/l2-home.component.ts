import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { TransformStatisticDataService } from '../../../services/transform-statistic-data.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DivisionInfoComponent } from "../../../components/division-info/division-info.component";
import { MapComponent } from "../../../components/map/map.component";
import { StatisticsComponent } from '../../../components/statistics/statistics.component';
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-l2-home',
  imports: [MapComponent, RouterModule, StatisticsComponent, FontAwesomeModule, DivisionInfoComponent],
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

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  dataTeams: TeamData[] = [];
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
    combineLatest([
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.mapService.dataMapL2$,
      this.statisticsService.dataStatisticsL2$,
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([division, teams, map, statistics]) => {
      this.dataDivision = division;
      this.dataTeams = teams;
      this.mapConstructor = map;
      this.dataStatistics = statistics;

      if (this.dataTeams && this.dataStatistics) {
        this.getDataForMap();
        this.getDataForStatistics(this.dataTeams, this.dataStatistics);
      }
    })
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

  getDataForStatistics(teams: TeamData[], statistics: any) {
    this.dataBestDefense = this.transformStatisticService.transformData(teams, statistics.bestDefense, 'gc');
    this.dataWorstDefense = this.transformStatisticService.transformData(teams, statistics.worstDefense, 'gc');
    this.dataMostGoals = this.transformStatisticService.transformData(teams, statistics.mostGoals, 'gf');
    this.dataFewestGoals = this.transformStatisticService.transformData(teams, statistics.fewestGoals, 'gf');
    this.dataMostWins = this.transformStatisticService.transformData(teams, statistics.mostWins, 'pg');
    this.dataMostDraws = this.transformStatisticService.transformData(teams, statistics.mostDraws, 'pe');
    this.dataMostLosses = this.transformStatisticService.transformData(teams, statistics.mostLosses, 'pp');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}