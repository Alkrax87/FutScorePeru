import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { faFlag, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { LeagueCardComponent } from '../../../components/league-card/league-card.component';
import { LeagueCard } from '../../../interfaces/ui-models/league-card';

@Component({
  selector: 'app-cp-leagues',
  imports: [TitleComponent, LeagueCardComponent, FaIconComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 max-w-screen-xl mx-auto duration-500">
        @if (loadingState === 'idle' || loadingState === 'loading') {
          <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-main"></div>
            <p class="font-semibold">Cargando ligas...</p>
          </div>
        } @else if (loadingState === 'error') {
          <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <fa-icon [icon]="Error" class="text-4xl text-main"></fa-icon>
            <p class="font-semibold">Hubo un problema cargando las ligas.</p>
          </div>
        } @else {
          @if (dataLeagues.length > 0) {
            @for (item of dataLeagues; track item.leagueId) {
              <app-league-card [data]="item"></app-league-card>
            }
          } @else {
            <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
              <fa-icon [icon]="Flag" class="text-4xl text-main"></fa-icon>
              <p class="font-semibold">No hay ligas disponibles.</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpLeaguesComponent {
  private viewportScroller = inject(ViewportScroller);
  private leaguesService = inject(FetchLeaguesService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  dataLeagues: LeagueCard[] = [];

  Flag = faFlag;
  Error = faTriangleExclamation;

  constructor() {
    combineLatest([this.leaguesService.leagues$, this.teamsService.teamsCP$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([leaguesState, teamsState]) => {
        if (
          leaguesState.status === 'success' && teamsState.status === 'success' &&
          leaguesState.data !== null && teamsState.data !== null
        ) {
          this.dataLeagues = this.uiDataMapperService.leaguesCardMapper(leaguesState.data, teamsState.data);
          this.loadingState = 'success';
        } else if (leaguesState.status === 'error' || teamsState.status === 'error') {
          this.loadingState = 'error';
        } else {
          this.loadingState = 'loading';
        }
      },
    });

    if (typeof window !== 'undefined') {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }
}