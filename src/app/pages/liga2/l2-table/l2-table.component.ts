import { Component, inject } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
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
    <div class="bg-night py-10 lg:py-16 px-3 sm:px-5 duration-500 select-none">
      <div class="flex justify-center px-3 sm:px-5 mb-3 sm:mb-5">
        <div class="w-full md:w-5/6 lg:w-9/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-3 px-4 md:px-0">
          <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
          <app-btn (click)="setActiveTab('grupos')" [active]="grupos">Fase Grupos</app-btn>
          <app-btn (click)="setActiveTab('playOff')" [active]="playOff">Play-Offs</app-btn>
        </div>
      </div>
      @if (regional) {
        <div class="flex flex-col gap-4 -mx-3 sm:-mx-5">
          <div>
            <div class="w-fit px-5">
              <h3 class="text-3xl text-white font-bold">Grupo A</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegionalA"></app-table>
          </div>
          <div>
            <div class="w-fit px-5">
              <h3 class="text-3xl text-white font-bold">Grupo B</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configRegional" [headers]="headers" [classification]="classificationRegional" [data]="dataRegionalB"></app-table>
          </div>
        </div>
      }
      @if (grupos) {
        <div class="flex flex-col gap-4 -mx-3 sm:-mx-5">
          <div>
            <div class="w-fit px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Ascenso 1</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configGroupPromotion" [headers]="headers" [classification]="classificationPromotion" [data]="dataPromotion1"></app-table>
          </div>
          <div>
            <div class="w-fit px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Ascenso 2</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configGroupPromotion" [headers]="headers" [classification]="classificationPromotion" [data]="dataPromotion2"></app-table>
          </div>
          <div>
            <div class="w-fit px-5">
              <h3 class="text-3xl text-white font-bold">Grupo Descenso</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-table [config]="configGroupRelegation" [headers]="headers" [classification]="classificationRelegation" [data]="dataRelegation"></app-table>
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
  private divisionService = inject(FetchDivisionService);
  private teamsService = inject(FetchTeamDataService);
  private performanceService = inject(FetchPerformanceService);
  private lastGamesService = inject(FetchLastGamesService);
  private bracketsService = inject(FetchBracketsService);
  private uiDataMapperService = inject(UiDataMapperService);

  regional: boolean = false;
  grupos: boolean = false;
  playOff: boolean = false;

  headers: string[] = ['', 'Pos', 'Club', 'PTS', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC','DIF', 'Últimas 5 Fechas'];
  configRegional: { class: string; quantity: number }[] = [
    { class: 'bg-gpromotion', quantity: 5 },
    { class: '', quantity: 0 },
    { class: 'bg-grelegation', quantity: 3 },
  ];
  configGroupPromotion: { class: string; quantity: number }[] = [
    { class: 'bg-promotion', quantity: 1 },
    { class: 'bg-quarter', quantity: 2 },
    { class: '', quantity: 0 },
  ];
  configGroupRelegation: { class: string; quantity: number }[] = [
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
    { class: 'bg-relegation', quantity: 1 },
  ];
  classificationRegional = [
    {
      name: 'Grupo de Ascenso',
      image: 'assets/images/pages/Group-Promotion.svg',
      class: 'bg-gpromotion',
    },
    {
      name: 'Grupo de Descenso',
      image: 'assets/images/pages/Group-Relegation.svg',
      class: 'bg-grelegation',
    },
  ];
  classificationPromotion = [
    {
      name: 'Semifinales',
      image: 'assets/images/pages/Bracket-Semifinalist.svg',
      class: 'bg-promotion',
    },
    {
      name: 'Cuartos de Final',
      image: 'assets/images/pages/Bracket-Quarter.svg',
      class: 'bg-quarter',
    },
  ];
  classificationRelegation = [
    {
      name: 'Descenso',
      image: 'assets/images/pages/Relegation.svg',
      class: 'bg-relegation',
    },
  ];
  dataRegionalA: TeamTable[] = [];
  dataRegionalB: TeamTable[] = [];
  dataPromotion1: TeamTable[] = [];
  dataPromotion2: TeamTable[] = [];
  dataRelegation: TeamTable[] = [];
  dataPlayOffs4: MatchCard[] = [];
  dataPlayOffs2: MatchCard[] = [];
  dataPlayOffs1: MatchCard[] = [];
  dataPlayOffsExtra: MatchCard[] = [];

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.performanceService.dataPerformanceL2$,
      this.lastGamesService.dataLastGamesL2$,
      this.bracketsService.dataBracketsL2$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, performance, lastgames, brackets]) => {
        this.regional = division?.firstPhase.status || false;
        this.grupos = division?.secondPhase.status || false;
        this.playOff = division?.thirdPhase.status || false;

        this.dataRegionalA = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'regional', 'a');
        this.dataRegionalB = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'regional', 'b');
        this.dataPromotion1 = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'grupos', 'p1');
        this.dataPromotion2 = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'grupos', 'p2');
        this.dataRelegation = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'grupos', 'r');

        if (brackets[0] && brackets[0].bracket4 && brackets[0].bracket2 && brackets[0].bracket1 && brackets[0].bracketExtra) {
          this.dataPlayOffs4 = this.uiDataMapperService.bracketCardMapper(teams, brackets[0].bracket4);
          this.dataPlayOffs2 = this.uiDataMapperService.bracketCardMapper(teams, brackets[0].bracket2);
          this.dataPlayOffs1 = this.uiDataMapperService.bracketCardMapper(teams, brackets[0].bracket1);
          this.dataPlayOffsExtra = this.uiDataMapperService.bracketCardMapper(teams, brackets[0].bracketExtra);
        }
      }
    });
  }

  setActiveTab(tab: String) {
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
    this.playOff = tab === 'playOff';
  }
}