import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { StatisticsCardComponent } from '../../../components/statistics-card/statistics-card.component';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-l3-statistics',
  imports: [TitleComponent, StatisticsCardComponent],
  template: `
    <app-title [title]="'Estadísticas'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      @if ( dataBestDefense.length > 0 &&
        dataWorstDefense.length > 0 &&
        dataMostGoals.length > 0 &&
        dataFewestGoals.length > 0 &&
        dataMostWins.length > 0 &&
        dataMostDraws.length > 0 &&
        dataMostLosses.length > 0 &&
        dataBestGoalDifference.length > 0 &&
        dataWorstGoalDifference.length > 0
      ) {
        <div class="text-white max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 duration-500">
          <!-- Wins -->
          <app-statistics-card cardTitle="PARTIDOS GANADOS" [data]="dataMostWins"></app-statistics-card>
          <!-- Draws -->
          <app-statistics-card cardTitle="PARTIDOS EMPATADOS" [data]="dataMostDraws"></app-statistics-card>
          <!-- Losses -->
          <app-statistics-card cardTitle="PARTIDOS PERDIDOS" [data]="dataMostLosses"></app-statistics-card>
          <!-- Best Defense -->
          <app-statistics-card cardTitle="MEJOR DEFENSA (GC)" [data]="dataBestDefense"></app-statistics-card>
          <!-- Worst Defense -->
          <app-statistics-card cardTitle="PEOR DEFENSA (GC)" [data]="dataWorstDefense"></app-statistics-card>
          <!-- Most Goals -->
          <app-statistics-card cardTitle="MÁS GOLEADOR (GF)" [data]="dataMostGoals"></app-statistics-card>
          <!-- Fewest Goals -->
          <app-statistics-card cardTitle="MENOS GOLEADOR (GF)" [data]="dataFewestGoals"></app-statistics-card>
          <!-- Best Goal Difference -->
          <app-statistics-card cardTitle="MEJOR DIFERENCIA DE GOL" [data]="dataBestGoalDifference"></app-statistics-card>
          <!-- Worst Goal Difference -->
          <app-statistics-card cardTitle="PEOR DIFERENCIA DE GOL" [data]="dataWorstGoalDifference"></app-statistics-card>
        </div>
      } @else {
        <div class="flex h-64 justify-center items-center select-none">
          <h3 class="text-2xl text-white font-bold">Datos estadísticos por definir...</h3>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class L3StatisticsComponent {
  private viewPortScoller = inject(ViewportScroller);
  private teamsService = inject(FetchTeamsService);
  private statisticsService = inject(FetchStatisticsService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataBestDefense: StatisticCard[] = [];
  dataWorstDefense: StatisticCard[] = [];
  dataMostGoals: StatisticCard[] = [];
  dataFewestGoals: StatisticCard[] = [];
  dataMostWins: StatisticCard[] = [];
  dataMostDraws: StatisticCard[] = [];
  dataMostLosses: StatisticCard[] = [];
  dataBestGoalDifference: StatisticCard[] = [];
  dataWorstGoalDifference: StatisticCard[] = [];

  constructor() {
    this.statisticsService.fetchStatisticsL3();

    combineLatest([this.teamsService.teamsL3$, this.statisticsService.statisticsL3$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, statistics]) => {
        if (statistics) {
          this.dataBestDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.bestDefense, 'ga');
          this.dataWorstDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.worstDefense, 'ga');
          this.dataMostGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostGoalsFor, 'gf');
          this.dataFewestGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.fewestGoalsFor, 'gf');
          this.dataMostWins = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostWins, 'w');
          this.dataMostDraws = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostDraws, 'd');
          this.dataMostLosses = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostLosses, 'l');
          this.dataBestGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.bestGoalDifference, 'gd');
          this.dataWorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.worstGoalDifference, 'gd');
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScoller.scrollToPosition([0, 0]);
    }
  }
}