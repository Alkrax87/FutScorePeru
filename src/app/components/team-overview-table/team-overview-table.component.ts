import { Component, DestroyRef, inject, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faChevronRight, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, Subscription } from 'rxjs';
import { RouterLink } from "@angular/router";
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../services/fetch-teams.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { TeamPageProfile } from '../../interfaces/api-models/teamPageProfile';
import { StandingsTable } from '../../interfaces/ui-models/team-overview';

@Component({
  selector: 'app-team-overview-table',
  imports: [FaIconComponent, RouterLink, NgClass],
  template: `
    <div class="flex flex-col">
      <!-- Title -->
      <div class="flex">
        <div class="bg-main text-white h-8 font-bold px-2 flex items-center w-fit text-nowrap">Posición</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[32px] border-r-0 border-b-0 border-l-[24px]
          border-t-neutral-100 border-r-neutral-100 border-b-neutral-100 border-l-main
        "></div>
        <div class="bg-neutral-100 text-night font-semibold px-2 flex items-center truncate">{{ title }}</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[32px] border-r-0 border-b-0 border-l-[24px]
          border-t-transparent border-r-transparent border-b-transparent border-l-neutral-100
        "></div>
      </div>
      <!-- Table -->
      <div class="bg-nightfall px-0 sm:px-4 py-2 sm:py-4 font-semibold overflow-x-auto duration-500">
        <table class="w-full">
          <thead class="text-neutral-300 border-b-4 text-xs border-neutral-600 duration-500">
            <tr class="h-8">
              <th scope="col" class="bg-nightfall w-8 min-w-8 max-w-8 sticky left-0 z-30">Pos</th>
              <th scope="col" class="bg-nightfall group-hover:bg-white min-w-10 w-10 duration-500 sticky left-8 z-30">Club</th>
              <th scope="col" class="min-w-48 md:min-w-72 text-start duration-500"></th>
              <th scope="col" class="bg-brightnight min-w-14">Pts</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">PJ</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">PG</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">PE</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">PP</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">GF</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">GC</th>
              <th scope="col" class="min-w-10 md:min-w-12 duration-500">DIF</th>
            </tr>
          </thead>
          <tbody class="text-sm md:text-base duration-500">
            @if (standingsData.length > 0) {
              @for (item of computedStadingsData; track $index) {
                <tr [routerLink]="item.teamId !== teamId ? ['../../', item.teamId] : null" class="h-12 group text-center"
                  [ngClass]="{
                    'bg-gray-200 text-night font-semibold': item.teamId === teamId,
                    'text-gray-200 hover:bg-gray-200 hover:text-night cursor-pointer': item.teamId !== teamId
                  }"
                >
                  <td class="text-xs sticky left-0 z-20" [ngClass]="item.teamId === teamId ? 'bg-gray-200' : 'bg-nightfall group-hover:bg-gray-200'">
                    {{ item.rank }}
                  </td>
                  <td class="sticky left-8 z-20" [ngClass]="item.teamId === teamId ? 'bg-gray-200' : 'bg-nightfall group-hover:bg-gray-200'">
                    <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="w-8 h-8" />
                  </td>
                  <td class="text-start">
                    <span class="m-1 truncate my-auto">{{ item.name }}</span>
                  </td>
                  <td class="font-bold group-hover:bg-white group-hover:text-night duration-0" [ngClass]="item.teamId === teamId ? 'bg-white text-night' : 'bg-brightnight'">
                    {{ item.performance.points }}
                  </td>
                  <td>{{ item.performance.played }}</td>
                  <td>{{ item.performance.w }}</td>
                  <td>{{ item.performance.d }}</td>
                  <td>{{ item.performance.l }}</td>
                  <td>{{ item.performance.gf }}</td>
                  <td>{{ item.performance.ga }}</td>
                  <td [ngClass]="{ 'text-promotion': item.performance.gd > 0, 'text-relegation': item.performance.gd < 0 }">{{ item.performance.gd > 0 ? '+' + item.performance.gd : item.performance.gd }}</td>
                </tr>
              }
            } @else {
              <tr>
                <td colspan="12" class="h-10 text-center text-neutral-400 text-sm">
                  <fa-icon [icon]="Database"></fa-icon> Datos de la tabla por definir..
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-2">
        <span [routerLink]="['../../../../', 'tabla']" class="font-semibold text-gold hover:text-main cursor-pointer duration-300">Ver Tabla Completa <fa-icon [icon]="Arrow"></fa-icon></span>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamOverviewTableComponent {
  @Input() standingsData!: TeamPageProfile['teamOverviewData']['standings'];
  @Input() category!: number;
  @Input() teamId!: string;

  private divisionService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);
  private destroyRef = inject(DestroyRef);
  private loadDataSub?: Subscription;

  title: string = '';
  computedStadingsData!: StandingsTable[];

  Database = faDatabase;
  Arrow = faChevronRight;

  ngOnChanges() {
    if (this.standingsData && this.category && this.teamId) {
      this.loadData();
    }
  }

  loadData() {
    let division$;
    let teams$;

    switch (this.category) {
      case 1:
        division$ = this.divisionService.divisionL1$;
        teams$ = this.teamsService.teamsL1$;
        break;
      case 2:
        division$ = this.divisionService.divisionL2$;
        teams$ = this.teamsService.teamsL2$;
        break;
      case 3:
        division$ = this.divisionService.divisionL3$;
        teams$ = this.teamsService.teamsL3$;
        break;
      default:
        return;
    }

    if (division$ && teams$) {
      this.loadDataSub?.unsubscribe();

      this.loadDataSub = combineLatest([division$, teams$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: ([division, teams]) => {
          if (division?.phase3.status === true) {
            this.title = division.phase2.name;
          } else if (division?.phase2.status === true) {
            this.title = division.phase2.name;
          } else if (division?.phase1.status === true) {
            this.title = division.phase1.name;
          }

          this.computedStadingsData = this.uiDataMapperService.overviewStandingsMapper(teams, this.standingsData);
        }
      });
    }
  }
}
