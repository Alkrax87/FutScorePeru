import { Component, inject } from '@angular/core';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { StatisticsCardComponent } from '../../../components/statistics-card/statistics-card.component';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-l1-statistics',
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
        <div class="text-white max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(310px,_1fr))] gap-3 sm:gap-5 duration-500">
          <!-- Wins -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Partidos Ganados</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataMostWins"></app-statistics-card>
          </div>
          <!-- Draws -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Partidos Empatados</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataMostDraws"></app-statistics-card>
          </div>
          <!-- Losses -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Partidos Perdidos</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataMostLosses"></app-statistics-card>
          </div>
          <!-- Best Defense -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Mejor Defensa (GC)</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataBestDefense"></app-statistics-card>
          </div>
          <!-- Worst Defense -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Peor Defensa (GC)</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataWorstDefense"></app-statistics-card>
          </div>
          <!-- Most Goals -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Más Goleador (GF)</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataMostGoals"></app-statistics-card>
          </div>
          <!-- Fewest Goals -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Menos Goleador (GF)</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataFewestGoals"></app-statistics-card>
          </div>
          <!-- Best Goal Difference -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Mejor Diferencia de Gol</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataBestGoalDifference"></app-statistics-card>
          </div>
          <!-- Worst Goal Difference -->
          <div>
            <div class="w-fit">
              <h3 class="text-2xl text-white font-bold">Peor Diferencia de Gol</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-statistics-card [data]="dataWorstGoalDifference"></app-statistics-card>
          </div>
        </div>
      } @else {
        <div class="text-white h-32 flex justify-center items-center text-2xl font-semibold">Datos estadísticos por definir...</div>
      }
    </div>
  `,
  styles: ``,
})
export class L1StatisticsComponent {
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
    combineLatest([this.teamsService.teamsL1$, this.statisticsService.statisticsL1$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, statistics]) => {
        this.dataBestDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.bestDefense, 'ga');
        this.dataWorstDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.worstDefense, 'ga');
        this.dataMostGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.mostGoalsFor, 'gf');
        this.dataFewestGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.fewestGoalsFor, 'gf');
        this.dataMostWins = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.mostWins, 'w');
        this.dataMostDraws = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.mostDraws, 'd');
        this.dataMostLosses = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.mostLosses, 'l');
        this.dataBestGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.bestGoalDifference, 'gd');
        this.dataWorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics?.overall.worstGoalDifference, 'gd');
      }
    });
  }
}