import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { StatisticsCardComponent } from '../../../components/statistics-card/statistics-card.component';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { StatisticsData } from '../../../interfaces/api-models/statistics-data';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-l3-statistics',
  imports: [TitleComponent, StatisticsCardComponent],
  template: `
    <app-title [title]="'Estadísticas'"></app-title>
    <div class="bg-night text-white p-5 select-none">
      <div class="w-full xl:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 duration-500">
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Partidos Ganados</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataMostWins"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Partidos Empatados</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataMostDraws"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Partidos Perdidos</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataMostLosses"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Mejor Defensa (GC)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataBestDefense"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Peor Defensa (GC)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-56 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataWorstDefense"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Más Goleador (GF)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataMostGoals"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Menos Goleador (GF)</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataFewestGoals"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Mejor Diferencia de Gol</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataBestGoalDifference"></app-statistics-card>
        </div>
        <div>
          <div class="mb-5">
            <p class="text-2xl font-bold">Peor Diferencia de Gol</p>
            <div class="bg-crimson skew-x-50 h-1.5 w-60 mt-2"></div>
          </div>
          <app-statistics-card [data]="dataWorstGoalDifference"></app-statistics-card>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class L3StatisticsComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private statisticsService: FetchStatisticsService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private teamsSubscription: Subscription | null = null;
  private statisticsSubscription: Subscription | null = null;
  dataTeams: TeamData[] = [];
  dataStatistics: StatisticsData | null = null;
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
    this.teamsSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.statisticsSubscription = this.statisticsService.dataStatisticsL3$.subscribe({
      next: (data) => (this.dataStatistics = data)
    });

    if (this.dataTeams && this.dataStatistics) {
      this.dataBestDefense = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.bestDefense, 'ga');
      this.dataWorstDefense = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.worstDefense, 'ga');
      this.dataMostGoals = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.mostGoals, 'gf');
      this.dataFewestGoals = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.fewestGoals, 'gf');
      this.dataMostWins = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.mostWins, 'w');
      this.dataMostDraws = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.mostDraws, 'd');
      this.dataMostLosses = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.mostLosses, 'l');
      this.dataBestGoalDifference = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.bestGoalDifference, 'gd');
      this.dataWorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(this.dataTeams, this.dataStatistics.worstGoalDifference, 'gd');
    }
  }

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
    this.statisticsSubscription?.unsubscribe();
  }
}