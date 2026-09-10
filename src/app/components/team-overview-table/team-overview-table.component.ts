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
        <div class="bg-crimson text-white h-8 font-bold px-2 flex items-center w-fit text-nowrap">Posición</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[32px] border-r-0 border-b-0 border-l-[24px]
          border-t-neutral-100 border-r-neutral-100 border-b-neutral-100 border-l-crimson
        "></div>
        <div class="bg-neutral-100 text-night font-semibold px-2 flex items-center truncate">{{ title }}</div>
        <div class="
          relative right-[0.1px] w-0 h-0 border-solid
          border-t-[32px] border-r-0 border-b-0 border-l-[24px]
          border-t-transparent border-r-transparent border-b-transparent border-l-neutral-100
        "></div>
      </div>
      <!-- Table -->
      <div class="bg-nightfall px-1 sm:px-5 py-3 sm:py-5 font-semibold overflow-x-auto duration-500">
        <table class="w-full">
          <thead class="text-neutral-300 border-b-4 text-xxs md:text-xs border-neutral-600 duration-500">
            <tr class="h-8 md:h-10">
              <th class="w-8 min-w-8 max-w-8">Pos</th>
              <th class="min-w-20 sm:min-w-52 md:min-w-64 text-start duration-500">Club</th>
              <th class="bg-brightnight rounded-t-lg min-w-14 md:min-w-16 duration-500">PTS</th>
              <th class="min-w-10 md:min-w-12 duration-500">PJ</th>
              <th class="min-w-10 md:min-w-12 duration-500">PG</th>
              <th class="min-w-10 md:min-w-12 duration-500">PE</th>
              <th class="min-w-10 md:min-w-12 duration-500">PP</th>
              <th class="min-w-10 md:min-w-12 duration-500">GF</th>
              <th class="min-w-10 md:min-w-12 duration-500">GC</th>
              <th class="min-w-10 md:min-w-12 duration-500">DIF</th>
            </tr>
          </thead>
          <tbody class="text-sm md:text-base duration-500">
            @if (standingsData.length > 0) {
              @for (item of computedStadingsData; track $index) {
                <tr [routerLink]="item.teamId !== teamId ? ['../../', item.teamId] : null" class="group h-9 md:h-11 text-center duration-500"
                  [ngClass]="{
                    'bg-gray-200 text-night font-semibold': item.teamId === teamId,
                    'text-gray-200 hover:bg-gray-200 hover:text-night cursor-pointer duration-0': item.teamId !== teamId
                  }"
                >
                 <td class="text-xs md:text-sm duration-500">{{ item.rank }}</td>
                  <td>
                    <div class="flex">
                      <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="w-7 md:w-8 duration-500"/>
                      <span class="hidden sm:block ml-2 truncate my-auto">{{ item.name }}</span>
                      <span class="sm:hidden ml-3 font-bold flex items-center text-center my-auto">{{ item.abbreviation }}</span>
                    </div>
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
        <span [routerLink]="['../../../../', 'tabla']" class="font-semibold text-gold hover:text-crimson cursor-pointer duration-300">
          Ver Tabla Completa <fa-icon [icon]="Arrow"></fa-icon>
        </span>
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
