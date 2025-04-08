import { Component } from '@angular/core';
import { TitleComponent } from "../../../components/title/title.component";
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { TransformStatisticDataService } from '../../../services/transform-statistic-data.service';
import { Subscription } from 'rxjs';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { StatisticsComponent } from "../../../components/statistics/statistics.component";

@Component({
  selector: 'app-l2-statistics',
  imports: [TitleComponent, StatisticsComponent],
  template: `
    <app-title [title]="'Estadísticas'"></app-title>
    <div class="bg-night text-white p-5">
      <div class="w-full xl:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Partidos Ganados</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 my-2"></div>
          </div>
          <app-statistics [data]="dataMostWins"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Partidos Empatados</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 my-2"></div>
          </div>
          <app-statistics [data]="dataMostDraws"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Partidos Perdidos</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 my-2"></div>
          </div>
          <app-statistics [data]="dataMostLosses"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Mejor Defensa (GC)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 my-2"></div>
          </div>
          <app-statistics [data]="dataBestDefense"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Peor Defensa (GC)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 my-2"></div>
          </div>
          <app-statistics [data]="dataWorstDefense"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Más Goleador (GF)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 my-2"></div>
          </div>
          <app-statistics [data]="dataMostGoals"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Menos Goleador (GF)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 my-2"></div>
          </div>
          <app-statistics [data]="dataFewestGoals"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Mejor Diferencia de Gol</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 my-2"></div>
          </div>
          <app-statistics [data]="dataBestGoalDifference"></app-statistics>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Peor Diferencia de Gol</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 my-2"></div>
          </div>
          <app-statistics [data]="dataWorstGoalDifference"></app-statistics>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class L2StatisticsComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private statisticsService: FetchStatisticsService,
    private transformStatisticService: TransformStatisticDataService,
  ) {}

  private teamsSubscription: Subscription | null = null;
  private statisticsSubscription: Subscription | null = null;
  dataTeams: TeamData[] = [];
  dataStatistics: any;
  dataBestDefense: StatisticCard[] = [];
  dataWorstDefense: StatisticCard[] = [];
  dataMostGoals: StatisticCard[] = [];
  dataFewestGoals: StatisticCard[] = [];
  dataMostWins: StatisticCard[] = [];
  dataMostDraws: StatisticCard[] = [];
  dataMostLosses: StatisticCard[] = [];
  dataBestGoalDifference: StatisticCard[] = [];
  dataWorstGoalDifference: StatisticCard[] = [];

  ngOnInit() {
    this.teamsSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.statisticsSubscription = this.statisticsService.dataStatisticsL2$.subscribe({
      next: (data) => (this.dataStatistics = data)
    });

    if (this.dataTeams && this.dataStatistics) {
      this.getDataForStatistics(this.dataTeams, this.dataStatistics);
    }
  }

  getDataForStatistics(teams: TeamData[], statistics: any) {
    this.dataBestDefense = this.transformStatisticService.transformData(teams, statistics.bestDefense, 'gc');
    this.dataWorstDefense = this.transformStatisticService.transformData(teams, statistics.worstDefense, 'gc');
    this.dataMostGoals = this.transformStatisticService.transformData(teams, statistics.mostGoals, 'gf');
    this.dataFewestGoals = this.transformStatisticService.transformData(teams, statistics.fewestGoals, 'gf');
    this.dataMostWins = this.transformStatisticService.transformData(teams, statistics.mostWins, 'pg');
    this.dataMostDraws = this.transformStatisticService.transformData(teams, statistics.mostDraws, 'pe');
    this.dataMostLosses = this.transformStatisticService.transformData(teams, statistics.mostLosses, 'pp');
    this.dataBestGoalDifference = this.transformStatisticService.transformData(teams, statistics.bestGoalDifference, 'dg');
    this.dataWorstGoalDifference = this.transformStatisticService.transformData(teams, statistics.worstGoalDifference, 'dg');
  }

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
    this.statisticsSubscription?.unsubscribe();
  }
}