import { Component, inject } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { StatisticsCardComponent } from '../../../components/statistics-card/statistics-card.component';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-l2-statistics',
  imports: [TitleComponent, StatisticsCardComponent],
  template: `
    <app-title [title]="'Estadísticas'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="text-white max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(310px,_1fr))] gap-3 sm:gap-5 duration-500">
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Partidos Ganados</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataMostWins"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Partidos Empatados</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataMostDraws"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Partidos Perdidos</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataMostLosses"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Mejor Defensa (GC)</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataBestDefense"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Peor Defensa (GC)</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataWorstDefense"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Más Goleador (GF)</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataMostGoals"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Menos Goleador (GF)</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataFewestGoals"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Mejor Diferencia de Gol</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataBestGoalDifference"></app-statistics-card>
        </div>
        <div>
          <div class="w-fit">
            <h3 class="text-2xl text-white font-bold">Peor Diferencia de Gol</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <app-statistics-card [data]="dataWorstGoalDifference"></app-statistics-card>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L2StatisticsComponent {
  private teamsService = inject(FetchTeamDataService);
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
    combineLatest([this.teamsService.dataTeamsL2$, this.statisticsService.dataStatisticsL2$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, statistics]) => {
        this.dataBestDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.bestDefense, 'ga');
        this.dataWorstDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.worstDefense, 'ga');
        this.dataMostGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.mostGoals, 'gf');
        this.dataFewestGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.fewestGoals, 'gf');
        this.dataMostWins = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.mostWins, 'w');
        this.dataMostDraws = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.mostDraws, 'd');
        this.dataMostLosses = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.mostLosses, 'l');
        this.dataBestGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.bestGoalDifference, 'gd');
        this.dataWorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics!.worstGoalDifference, 'gd');
      }
    });
  }
}