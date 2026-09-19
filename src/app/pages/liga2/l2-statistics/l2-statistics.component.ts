import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSoccerBall } from '@fortawesome/free-solid-svg-icons';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from "../../../components/btn/btn.component";
import { StatisticsCardComponent } from '../../../components/statistics-card/statistics-card.component';
import { StatisticCard } from '../../../interfaces/ui-models/statistic-card';

@Component({
  selector: 'app-l2-statistics',
  imports: [TitleComponent, StatisticsCardComponent, BtnComponent, FaIconComponent],
  template: `
    <app-title [title]="'Estadísticas'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Switch -->
      <div class="max-w-screen-xl grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
        <app-btn (click)="setActiveTab('overall')" [active]="overall">Acumulada</app-btn>
        <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Fase Regional</app-btn>
        <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Fase Final</app-btn>
      </div>
      <!-- Content -->
      @if (overall) {
        @if (
          dataOverallBestDefense.length > 0 &&
          dataOverallWorstDefense.length > 0 &&
          dataOverallMostGoals.length > 0 &&
          dataOverallFewestGoals.length > 0 &&
          dataOverallMostWins.length > 0 &&
          dataOverallMostDraws.length > 0 &&
          dataOverallMostLosses.length > 0 &&
          dataOverallBestGoalDifference.length > 0 &&
          dataOverallWorstGoalDifference.length > 0
        ) {
          <div class="text-white max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 duration-500">
            <!-- Wins -->
            <app-statistics-card cardTitle="PARTIDOS GANADOS" [data]="dataOverallMostWins"></app-statistics-card>
            <!-- Draws -->
            <app-statistics-card cardTitle="PARTIDOS EMPATADOS" [data]="dataOverallMostDraws"></app-statistics-card>
            <!-- Losses -->
            <app-statistics-card cardTitle="PARTIDOS PERDIDOS" [data]="dataOverallMostLosses"></app-statistics-card>
            <!-- Best Defense -->
            <app-statistics-card cardTitle="MEJOR DEFENSA (GC)" [data]="dataOverallBestDefense"></app-statistics-card>
            <!-- Worst Defense -->
            <app-statistics-card cardTitle="PEOR DEFENSA (GC)" [data]="dataOverallWorstDefense"></app-statistics-card>
            <!-- Most Goals -->
            <app-statistics-card cardTitle="MÁS GOLEADOR (GF)" [data]="dataOverallMostGoals"></app-statistics-card>
            <!-- Fewest Goals -->
            <app-statistics-card cardTitle="MENOS GOLEADOR (GF)" [data]="dataOverallFewestGoals"></app-statistics-card>
            <!-- Best Goal Difference -->
            <app-statistics-card cardTitle="MEJOR DIFERENCIA DE GOL" [data]="dataOverallBestGoalDifference"></app-statistics-card>
            <!-- Worst Goal Difference -->
            <app-statistics-card cardTitle="PEOR DIFERENCIA DE GOL" [data]="dataOverallWorstGoalDifference"></app-statistics-card>
          </div>
          <div class="text-white max-w-screen-xl mx-auto mt-3 sm:mt-5 duration-500">
            <p class="font-semibold"><fa-icon [icon]="Soccer"></fa-icon> Nota</p>
            <ul>
              <li>- La información mostrada solo representa la suma de los resultados de la <b class="text-gold">Fase Regional</b> y <b class="text-gold">Fase Final</b>, excluyendo los resultados de los <b class="text-gold">Play-Offs</b>.</li>
            </ul>
          </div>
        } @else {
          <div class="flex h-64 justify-center items-center select-none">
            <h3 class="text-2xl text-white font-bold">Datos estadísticos por definir...</h3>
          </div>
        }
      }
      @if (phase1) {
        @if (
          dataPhase1BestDefense.length > 0 &&
          dataPhase1WorstDefense.length > 0 &&
          dataPhase1MostGoals.length > 0 &&
          dataPhase1FewestGoals.length > 0 &&
          dataPhase1MostWins.length > 0 &&
          dataPhase1MostDraws.length > 0 &&
          dataPhase1MostLosses.length > 0 &&
          dataPhase1BestGoalDifference.length > 0 &&
          dataPhase1WorstGoalDifference.length > 0
        ) {
          <div class="text-white max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 duration-500">
            <!-- Wins -->
            <app-statistics-card cardTitle="PARTIDOS GANADOS" [data]="dataPhase1MostWins"></app-statistics-card>
            <!-- Draws -->
            <app-statistics-card cardTitle="PARTIDOS EMPATADOS" [data]="dataPhase1MostDraws"></app-statistics-card>
            <!-- Losses -->
            <app-statistics-card cardTitle="PARTIDOS PERDIDOS" [data]="dataPhase1MostLosses"></app-statistics-card>
            <!-- Best Defense -->
            <app-statistics-card cardTitle="MEJOR DEFENSA (GC)" [data]="dataPhase1BestDefense"></app-statistics-card>
            <!-- Worst Defense -->
            <app-statistics-card cardTitle="PEOR DEFENSA (GC)" [data]="dataPhase1WorstDefense"></app-statistics-card>
            <!-- Most Goals -->
            <app-statistics-card cardTitle="MÁS GOLEADOR (GF)" [data]="dataPhase1MostGoals"></app-statistics-card>
            <!-- Fewest Goals -->
            <app-statistics-card cardTitle="MENOS GOLEADOR (GF)" [data]="dataPhase1FewestGoals"></app-statistics-card>
            <!-- Best Goal Difference -->
            <app-statistics-card cardTitle="MEJOR DIFERENCIA DE GOL" [data]="dataPhase1BestGoalDifference"></app-statistics-card>
            <!-- Worst Goal Difference -->
            <app-statistics-card cardTitle="PEOR DIFERENCIA DE GOL" [data]="dataPhase1WorstGoalDifference"></app-statistics-card>
          </div>
        } @else {
          <div class="flex h-64 justify-center items-center select-none">
            <h3 class="text-2xl text-white font-bold">Datos estadísticos por definir...</h3>
          </div>
        }
      }
      @if (phase2) {
        @if (
          dataPhase2BestDefense.length > 0 &&
          dataPhase2WorstDefense.length > 0 &&
          dataPhase2MostGoals.length > 0 &&
          dataPhase2FewestGoals.length > 0 &&
          dataPhase2MostWins.length > 0 &&
          dataPhase2MostDraws.length > 0 &&
          dataPhase2MostLosses.length > 0 &&
          dataPhase2BestGoalDifference.length > 0 &&
          dataPhase2WorstGoalDifference.length > 0
        ) {
          <div class="text-white max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 duration-500">
            <!-- Wins -->
            <app-statistics-card cardTitle="PARTIDOS GANADOS" [data]="dataPhase2MostWins"></app-statistics-card>
            <!-- Draws -->
            <app-statistics-card cardTitle="PARTIDOS EMPATADOS" [data]="dataPhase2MostDraws"></app-statistics-card>
            <!-- Losses -->
            <app-statistics-card cardTitle="PARTIDOS PERDIDOS" [data]="dataPhase2MostLosses"></app-statistics-card>
            <!-- Best Defense -->
            <app-statistics-card cardTitle="MEJOR DEFENSA (GC)" [data]="dataPhase2BestDefense"></app-statistics-card>
            <!-- Worst Defense -->
            <app-statistics-card cardTitle="PEOR DEFENSA (GC)" [data]="dataPhase2WorstDefense"></app-statistics-card>
            <!-- Most Goals -->
            <app-statistics-card cardTitle="MÁS GOLEADOR (GF)" [data]="dataPhase2MostGoals"></app-statistics-card>
            <!-- Fewest Goals -->
            <app-statistics-card cardTitle="MENOS GOLEADOR (GF)" [data]="dataPhase2FewestGoals"></app-statistics-card>
            <!-- Best Goal Difference -->
            <app-statistics-card cardTitle="MEJOR DIFERENCIA DE GOL" [data]="dataPhase2BestGoalDifference"></app-statistics-card>
            <!-- Worst Goal Difference -->
            <app-statistics-card cardTitle="PEOR DIFERENCIA DE GOL" [data]="dataPhase2WorstGoalDifference"></app-statistics-card>
          </div>
        } @else {
          <div class="flex h-64 justify-center items-center select-none">
            <h3 class="text-2xl text-white font-bold">Datos estadísticos por definir...</h3>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class L2StatisticsComponent {
  private viewportScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private statisticsService = inject(FetchStatisticsService);
  private uiDataMapperService = inject(UiDataMapperService);

  overall: boolean = false;
  phase1: boolean = false;
  phase2: boolean = false;

  dataOverallMostWins: StatisticCard[] = [];
  dataOverallMostDraws: StatisticCard[] = [];
  dataOverallMostLosses: StatisticCard[] = [];
  dataOverallBestDefense: StatisticCard[] = [];
  dataOverallWorstDefense: StatisticCard[] = [];
  dataOverallMostGoals: StatisticCard[] = [];
  dataOverallFewestGoals: StatisticCard[] = [];
  dataOverallBestGoalDifference: StatisticCard[] = [];
  dataOverallWorstGoalDifference: StatisticCard[] = [];

  dataPhase1MostWins: StatisticCard[] = [];
  dataPhase1MostDraws: StatisticCard[] = [];
  dataPhase1MostLosses: StatisticCard[] = [];
  dataPhase1BestDefense: StatisticCard[] = [];
  dataPhase1WorstDefense: StatisticCard[] = [];
  dataPhase1MostGoals: StatisticCard[] = [];
  dataPhase1FewestGoals: StatisticCard[] = [];
  dataPhase1BestGoalDifference: StatisticCard[] = [];
  dataPhase1WorstGoalDifference: StatisticCard[] = [];

  dataPhase2MostWins: StatisticCard[] = [];
  dataPhase2MostDraws: StatisticCard[] = [];
  dataPhase2MostLosses: StatisticCard[] = [];
  dataPhase2BestDefense: StatisticCard[] = [];
  dataPhase2WorstDefense: StatisticCard[] = [];
  dataPhase2MostGoals: StatisticCard[] = [];
  dataPhase2FewestGoals: StatisticCard[] = [];
  dataPhase2BestGoalDifference: StatisticCard[] = [];
  dataPhase2WorstGoalDifference: StatisticCard[] = [];

  Soccer = faSoccerBall;

  constructor() {
    this.statisticsService.fetchStatisticsL2();

    combineLatest([
      this.divisionsService.divisionL2$,
      this.teamsService.teamsL2$,
      this.statisticsService.statisticsL2$
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, statistics]) => {
        this.phase1 = division?.phase1.status || false;
        this.phase2 = division?.phase2.status || division?.phase3.status || false;

        if (statistics) {
          this.dataOverallMostWins = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostWins, 'w');
          this.dataOverallMostDraws = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostDraws, 'd');
          this.dataOverallMostLosses = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostLosses, 'l');
          this.dataOverallBestDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.bestDefense, 'ga');
          this.dataOverallWorstDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.worstDefense, 'ga');
          this.dataOverallMostGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.mostGoalsFor, 'gf');
          this.dataOverallFewestGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.fewestGoalsFor, 'gf');
          this.dataOverallBestGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.bestGoalDifference, 'gd');
          this.dataOverallWorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.overall.worstGoalDifference, 'gd');

          this.dataPhase1MostWins = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.mostWins, 'w');
          this.dataPhase1MostDraws = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.mostDraws, 'd');
          this.dataPhase1MostLosses = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.mostLosses, 'l');
          this.dataPhase1BestDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.bestDefense, 'ga');
          this.dataPhase1WorstDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.worstDefense, 'ga');
          this.dataPhase1MostGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.mostGoalsFor, 'gf');
          this.dataPhase1FewestGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.fewestGoalsFor, 'gf');
          this.dataPhase1BestGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.bestGoalDifference, 'gd');
          this.dataPhase1WorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase1.worstGoalDifference, 'gd');

          this.dataPhase2MostWins = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.mostWins, 'w');
          this.dataPhase2MostDraws = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.mostDraws, 'd');
          this.dataPhase2MostLosses = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.mostLosses, 'l');
          this.dataPhase2BestDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.bestDefense, 'ga');
          this.dataPhase2WorstDefense = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.worstDefense, 'ga');
          this.dataPhase2MostGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.mostGoalsFor, 'gf');
          this.dataPhase2FewestGoals = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.fewestGoalsFor, 'gf');
          this.dataPhase2BestGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.bestGoalDifference, 'gd');
          this.dataPhase2WorstGoalDifference = this.uiDataMapperService.statisticsCardMapper(teams, statistics.phase2.worstGoalDifference, 'gd');
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.overall = tab === 'overall';
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}