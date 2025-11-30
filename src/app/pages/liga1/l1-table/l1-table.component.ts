import { Component, inject } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchPerformanceService } from '../../../services/fetch-performance.service';
import { FetchLastGamesService } from '../../../services/fetch-last-games.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TableComponent } from '../../../components/table/table.component';
import { TeamTable } from '../../../interfaces/ui-models/team-table';

@Component({
  selector: 'app-l1-table',
  imports: [TitleComponent, TableComponent, BtnComponent],
  template: `
    <app-title [title]="'Tabla'"></app-title>
    <div class="bg-night py-10 lg:py-16 duration-500 select-none">
      <div class="flex justify-center px-3 sm:px-5 mb-3 sm:mb-5">
        <div class="w-full md:w-5/6 lg:w-9/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-3 px-4 md:px-0">
          <app-btn (click)="setActiveTab('acumulado')" [active]="acumulado">Acumulado</app-btn>
          <app-btn (click)="setActiveTab('apertura')" [active]="apertura">Apertura</app-btn>
          <app-btn (click)="setActiveTab('clausura')" [active]="clausura">Clausura</app-btn>
        </div>
      </div>
      @if (acumulado) {
        <app-table [config]="configAcumulado" [headers]="headers" [classification]="classificationAcumulado" [data]="dataAcumulado"></app-table>
      }
      @if (apertura) {
        <app-table [config]="configApertura" [headers]="headers" [classification]="classificationApertura" [data]="dataApertura"></app-table>
      }
      @if (clausura) {
        <app-table [config]="configClausura" [headers]="headers" [classification]="classificationClausura" [data]="dataClausura"></app-table>
      }
    </div>
  `,
  styles: ``,
})
export class L1TableComponent {
  private divisionService = inject(FetchDivisionService);
  private teamsService = inject(FetchTeamDataService);
  private performanceService = inject(FetchPerformanceService);
  private lastGamesService = inject(FetchLastGamesService);
  private uiDataMapperService = inject(UiDataMapperService);

  acumulado: boolean = true;
  apertura: boolean = false;
  clausura: boolean = false;

  headers: string[] = ['', 'Pos', 'Club', 'PTS', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DIF', 'Últimas 5 Fechas'];
  configApertura: { class: string; quantity: number }[] = [
    { class: 'bg-gold', quantity: 1 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  configClausura: { class: string; quantity: number }[] = [
    { class: 'bg-gold', quantity: 1 },
    { class: '', quantity: 0 },
    { class: '', quantity: 0 },
  ];
  configAcumulado: { class: string; quantity: number }[] = [
    { class: 'bg-libertadores', quantity: 4 },
    { class: 'bg-sudamericana', quantity: 4 },
    { class: 'bg-relegation', quantity: 3 },
  ];
  classificationAcumulado = [
    {
      name: 'Copa Libertadores',
      image: 'assets/images/pages/Libertadores.webp',
      class: 'bg-libertadores',
    },
    {
      name: 'Copa Sudamericana',
      image: 'assets/images/pages/Sudamericana.webp',
      class: 'bg-sudamericana',
    },
    {
      name: 'Descenso',
      image: 'assets/images/pages/Relegation.svg',
      class: 'bg-relegation',
    },
  ];
  classificationApertura = [
    {
      name: 'Ganador Apertura',
      image: 'assets/images/pages/Plate.svg',
      class: 'bg-gold',
    },
  ];
  classificationClausura = [
    {
      name: 'Ganador Clausura',
      image: 'assets/images/pages/Plate.svg',
      class: 'bg-gold',
    },
  ];
  dataApertura: TeamTable[] = [];
  dataClausura: TeamTable[] = [];
  dataAcumulado: TeamTable[] = [];

  constructor() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.performanceService.dataPerformanceL1$,
      this.lastGamesService.dataLastGamesL1$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([division, teams, performance, lastgames]) => {
        let activePhase = '';
        if (division?.firstPhase.status) {
          activePhase = 'apertura';
        } else if (division?.secondPhase.status) {
          activePhase = 'clausura';
        }

        this.dataApertura = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'apertura', undefined);
        this.dataClausura = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'clausura', undefined);
        this.dataAcumulado = this.uiDataMapperService.teamsTableMapper(teams, performance, lastgames, 'acumulado', undefined, activePhase);
      }
    })
  }

  setActiveTab(tab: String) {
    this.acumulado = tab === 'acumulado';
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
  }
}