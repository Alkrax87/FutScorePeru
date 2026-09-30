import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSoccerBall } from '@fortawesome/free-solid-svg-icons';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsPerformanceService } from '../../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../../services/fetch-teams-form.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l2-table',
  imports: [TitleComponent, TableComponent, BtnComponent, FaIconComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Switch -->
      <div class="max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
        <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Fase Regional</app-btn>
        <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Fase Final</app-btn>
      </div>
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        <div class="flex flex-col gap-6">
          @if (phase1) {
            <div>
              <app-subtitle>Grupo 1</app-subtitle>
              <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Group1"></app-table>
            </div>
            <div>
              <app-subtitle>Grupo 2</app-subtitle>
              <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Group2"></app-table>
            </div>
            <div class="text-white">
              <p class="font-semibold"><fa-icon [icon]="Soccer"></fa-icon> Siguiente fase</p>
              <ul>
                <li>- Los <b class="text-gold">primeros</b> de cada grupo y el <b class="text-gold">mejor segundo</b> tendrán una bonificación de <b class="text-promotion">+2 puntos</b></li>
                <li>- El <b class="text-gold">segundo restante</b> y los <b class="text-gold">dos terceros</b> tendrán una bonificación de <b class="text-promotion">+1 punto</b></li>
                <li>- Los <b class="text-gold">novenos</b> recibirán una deducción de <b class="text-relegation">-1 punto</b></li>
              </ul>
            </div>
          }
          @if (phase2) {
            <div>
              <app-subtitle>Grupo Campeonato 1</app-subtitle>
              <app-table [config]="configPhase2Promotion" [headers]="headers" [data]="dataPhase2GroupPromotion1"></app-table>
            </div>
            <div>
              <app-subtitle>Grupo Campeonato 2</app-subtitle>
              <app-table [config]="configPhase2Promotion" [headers]="headers" [data]="dataPhase2GroupPromotion2"></app-table>
            </div>
            <div>
              <app-subtitle>Grupo Campeonato 3</app-subtitle>
              <app-table [config]="configPhase2Promotion" [headers]="headers" [data]="dataPhase2GroupPromotion3"></app-table>
            </div>
            <div class="text-white">
              <p class="font-semibold"><fa-icon [icon]="Soccer"></fa-icon> Siguiente fase</p>
              <ul>
                <li>- Los <b class="text-gold">tres primeros</b> y el <b class="text-gold">mejor segundo</b> de los grupos de ascenso clasifican a <b class="text-gold">Semifinales</b></li>
              </ul>
            </div>
            <div>
              <app-subtitle>Grupo Descenso 1</app-subtitle>
              <app-table [config]="configPhase2Relegation" [headers]="headers" [data]="dataPhase2GroupRelegation1"></app-table>
            </div>
            <div>
              <app-subtitle>Grupo Descenso 2</app-subtitle>
              <app-table [config]="configPhase2Relegation" [headers]="headers" [data]="dataPhase2GroupRelegation2"></app-table>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L2TableComponent {
  private viewPortScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private uiDataMapperService = inject(UiDataMapperService);

  phase1: boolean = false;
  phase2: boolean = false;

  headers: string[] = ['', 'Pos', 'Club', '', 'Pts', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'Últimos 5 partidos'];
  configPhase1 = [
    { active: true, name: 'Grupo Campeonato', image: 'assets/images/pages/Group-Promotion.svg', class: 'bg-gpromotion', quantity: 6 },
    { active: true, name: 'Grupo Descenso', image: 'assets/images/pages/Group-Relegation.svg', class: 'bg-grelegation', quantity: 3 },
  ];
  configPhase2Promotion = [
    { active: true, name: 'Semifinales', image: 'assets/images/pages/Bracket-Semifinalist.svg', class: 'bg-promotion', quantity: 1 },
  ];
  configPhase2Relegation = [
    { active: false },
    { active: false },
    { active: true, name: 'Descenso a Liga 3', image: 'assets/images/pages/Relegation.svg', class: 'bg-relegation', quantity: 1 },
  ];
  dataPhase1Group1: TeamTable[] = [];
  dataPhase1Group2: TeamTable[] = [];
  dataPhase2GroupPromotion1: TeamTable[] = [];
  dataPhase2GroupPromotion2: TeamTable[] = [];
  dataPhase2GroupPromotion3: TeamTable[] = [];
  dataPhase2GroupRelegation1: TeamTable[] = [];
  dataPhase2GroupRelegation2: TeamTable[] = [];

  Soccer = faSoccerBall;

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceL2();
    this.teamsFormService.fetchTeamsFormL2();

    combineLatest([
      this.divisionsService.divisionL2$,
      this.teamsService.teamsL2$,
      this.teamsPerformanceService.teamsPerformanceL2$,
      this.teamsFormService.teamsFormL2$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([divisionState, teamsState, teamsPerformanceState, teamsFormState]) => {
        const division = divisionState.data;
        this.phase1 = division?.phase1.status || false;
        this.phase2 = division?.phase2.status || division?.phase3.status || false;

        if (teamsState.data !== null && teamsPerformanceState.data !== null && teamsFormState.data !== null) {
          const teams = teamsState.data;
          this.dataPhase1Group1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase1', 'a');
          this.dataPhase1Group2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase1', 'b');
          this.dataPhase2GroupPromotion1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'p1');
          this.dataPhase2GroupPromotion2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'p2');
          this.dataPhase2GroupPromotion3 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'p3');
          this.dataPhase2GroupRelegation1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'r1');
          this.dataPhase2GroupRelegation2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformanceState.data, teamsFormState.data, 'phase2', 'r2');
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}