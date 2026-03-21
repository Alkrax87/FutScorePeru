import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchTeamsPerformanceService } from '../../../services/fetch-teams-performance.service';
import { FetchTeamsFormService } from '../../../services/fetch-teams-form.service';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { BracketCardComponent } from '../../../components/bracket-card/bracket-card.component';
import { TeamTable } from '../../../interfaces/ui-models/team-table';
import { MatchCard } from '../../../interfaces/ui-models/match-card';

@Component({
  selector: 'app-l2-table',
  imports: [TitleComponent, TableComponent, BtnComponent, BracketCardComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-10 lg:py-16 duration-500 select-none">
      <div class="flex justify-center px-3 sm:px-5 mb-3 sm:mb-5">
        <div class="w-full md:w-5/6 lg:w-9/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-3 px-4 md:px-0">
          <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Fase Final</app-btn>
          <app-btn (click)="setActiveTab('playOff')" [active]="playOff">Play-Offs</app-btn>
        </div>
      </div>
      @if (phase1) {
        <div class="flex flex-col gap-4">
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo 1</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Group1"></app-table>
          </div>
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo 2</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase1" [headers]="headers" [data]="dataPhase1Group2"></app-table>
          </div>
          <div class="text-white px-3 sm:px-5">
            <ul>
              <li>- Los <b class="text-gold">dos primeros</b> de cada grupo y el <b class="text-gold">mejor segundo</b> tendrán una bonificación de <b class="text-promotion">+2 puntos</b></li>
              <li>- El <b class="text-gold">segundo restante</b> y los <b class="text-gold">dos terceros</b> tendrán una bonificación de <b class="text-promotion">+1 punto</b></li>
              <li>- Los <b class="text-gold">dos novenos</b> recibirán una deducción de <b class="text-relegation">-1 punto</b></li>
            </ul>
          </div>
        </div>
      }
      @if (phase2) {
        <div class="flex flex-col gap-4">
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Campeonato 1</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase2Promotion" [headers]="headers" [data]="dataPhase2GroupPromotion1"></app-table>
          </div>
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Campeonato 2</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase2Promotion" [headers]="headers" [data]="dataPhase2GroupPromotion2"></app-table>
          </div>
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Campeonato 3</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase2Promotion" [headers]="headers" [data]="dataPhase2GroupPromotion3"></app-table>
          </div>
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Descenso 1</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase2Relegation" [headers]="headers" [data]="dataPhase2GroupRelegation1"></app-table>
          </div>
          <div>
            <div class="w-fit px-3 sm:px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Descenso 2</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configPhase2Relegation" [headers]="headers" [data]="dataPhase2GroupRelegation2"></app-table>
          </div>
        </div>
      }
      @if (playOff) {
        @if (dataPlayOffs4.length > 0 && dataPlayOffs2.length > 0 && dataPlayOffs1.length > 0 && dataPlayOffsExtra.length > 0) {
          <div class="max-w-screen-xl mx-auto flex flex-col justify-center gap-4">
            <div>
              <div class="w-fit">
                <h3 class="text-3xl text-white font-bold">Cuartos de Final</h3>
                <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                @for (bracket of dataPlayOffs4; track $index) {
                  <app-bracket-card [bracket]="bracket"></app-bracket-card>
                }
              </div>
            </div>
            <div>
              <div class="w-fit">
                <h3 class="text-3xl text-white font-bold">Semifinales</h3>
                <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                @for (bracket of dataPlayOffs2; track $index) {
                  <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                }
              </div>
            </div>
            <div>
              <div class="w-fit">
                <h3 class="text-3xl text-white font-bold">Final</h3>
                <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <app-bracket-card [bracket]="dataPlayOffs1[0]" [dualMatch]="true" [lastMatch]="'Campeón Liga 2'"></app-bracket-card>
              </div>
            </div>
            <div>
              <div class="w-fit">
                <h3 class="text-3xl text-white font-bold">Play-Offs de Ascenso</h3>
                <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
              </div>
              <div class="text-white text-sm mt-2 mb-3">
                <p><b class="text-gold">Repechaje:</b> Los equipos que perdieron las <b>semifinales</b> se enfrentan para acceder a una segunda opción de ascenso.</p>
                <p><b class="text-gold">Subcampeón:</b> El equipo <b>ganador del repechaje</b> y el <b>perdedor de la final</b> se enfrentan para definir el subcampeón de la <b>Liga 2</b>.</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <app-bracket-card [bracket]="dataPlayOffsExtra[0]" [dualMatch]="true"></app-bracket-card>
                <app-bracket-card [bracket]="dataPlayOffsExtra[1]" [dualMatch]="true" [lastMatch]="'Subcampeón Liga 2'"></app-bracket-card>
              </div>
            </div>
          </div>
        } @else {
          <div class="flex h-64 justify-center items-center select-none">
            <h3 class="text-2xl text-white font-bold">Play-Offs por definir...</h3>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class L2TableComponent {
  private viewPortScoller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsPerformanceService = inject(FetchTeamsPerformanceService);
  private teamsFormService = inject(FetchTeamsFormService);
  private bracketsService = inject(FetchBracketsService);
  private uiDataMapperService = inject(UiDataMapperService);

  phase1: boolean = false;
  phase2: boolean = false;
  playOff: boolean = false;

  headers: string[] = ['', 'Pos', 'Club', 'PTS', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'Últimos 5 partidos'];
  configPhase1 = [
    { active: true, name: 'Grupo Campeonato', image: 'assets/images/pages/Group-Promotion.svg', class: 'bg-gpromotion', quantity: 6 },
    { active: true, name: 'Grupo Descenso', image: 'assets/images/pages/Group-Relegation.svg', class: 'bg-grelegation', quantity: 3 },
  ];
  configPhase2Promotion = [
    { active: true, name: 'Play-Offs', image: 'assets/images/pages/Bracket-Semifinalist.svg', class: 'bg-promotion', quantity: 1 },
  ];
  configPhase2Relegation = [
    { active: false },
    { active: false },
    { active: true, name: 'Descenso', image: 'assets/images/pages/Relegation.svg', class: 'bg-relegation', quantity: 1 },
  ];
  dataPhase1Group1: TeamTable[] = [];
  dataPhase1Group2: TeamTable[] = [];
  dataPhase2GroupPromotion1: TeamTable[] = [];
  dataPhase2GroupPromotion2: TeamTable[] = [];
  dataPhase2GroupPromotion3: TeamTable[] = [];
  dataPhase2GroupRelegation1: TeamTable[] = [];
  dataPhase2GroupRelegation2: TeamTable[] = [];
  dataPlayOffs4: MatchCard[] = [];
  dataPlayOffs2: MatchCard[] = [];
  dataPlayOffs1: MatchCard[] = [];
  dataPlayOffsExtra: MatchCard[] = [];

  constructor() {
    this.teamsPerformanceService.fetchTeamsPerformanceL2();
    this.teamsFormService.fetchTeamsFormL2();

    combineLatest([
      this.divisionsService.divisionL2$,
      this.teamsService.teamsL2$,
      this.teamsPerformanceService.teamsPerformanceL2$,
      this.teamsFormService.teamsFormL2$,
      this.bracketsService.bracketsL2$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, teamsPerformance, teamsForm, brackets]) => {
        this.phase1 = division?.phase1.status || false;
        this.phase2 = division?.phase2.status || false;
        this.playOff = division?.phase3.status || false;

        this.dataPhase1Group1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase1', 'a');
        this.dataPhase1Group2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase1', 'b');
        this.dataPhase2GroupPromotion1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2', 'p1');
        this.dataPhase2GroupPromotion2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2', 'p2');
        this.dataPhase2GroupPromotion3 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2', 'p3');
        this.dataPhase2GroupRelegation1 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2', 'r1');
        this.dataPhase2GroupRelegation2 = this.uiDataMapperService.teamsTableMapper(teams, teamsPerformance, teamsForm, 'phase2', 'r2');

        if (brackets[0] && brackets[0].bracket4 && brackets[0].bracket2 && brackets[0].bracket1 && brackets[0].bracketExtra) {
          this.dataPlayOffs4 = this.uiDataMapperService.bracketsCardMapper(teams, brackets[0].bracket4);
          this.dataPlayOffs2 = this.uiDataMapperService.bracketsCardMapper(teams, brackets[0].bracket2);
          this.dataPlayOffs1 = this.uiDataMapperService.bracketsCardMapper(teams, brackets[0].bracket1);
          this.dataPlayOffsExtra = this.uiDataMapperService.bracketsCardMapper(teams, brackets[0].bracketExtra);
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScoller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
    this.playOff = tab === 'playOff';
  }
}