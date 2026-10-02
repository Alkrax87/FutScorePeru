import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { faShieldHalved, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchStadiumsService } from '../../../services/fetch-stadiums.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { TeamCardComponent } from '../../../components/team-card/team-card.component';
import { TeamCard } from '../../../interfaces/ui-models/team-card';

@Component({
  selector: 'app-l2-teams',
  imports: [TitleComponent, TeamCardComponent, FaIconComponent],
  template: `
    <app-title [title]="'Clubes'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 max-w-screen-xl mx-auto duration-500">
        @if (loadingState === 'idle' || loadingState === 'loading') {
          <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-main"></div>
            <p class="font-semibold">Cargando clubes...</p>
          </div>
        } @else if (loadingState === 'error') {
          <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <fa-icon [icon]="Error" class="text-4xl text-main"></fa-icon>
            <p class="font-semibold">Hubo un problema cargando los clubes.</p>
          </div>
        } @else {
          @if (dataTeamsCard.length > 0) {
            @for (item of dataTeamsCard; track item.teamId) {
              <app-team-card [data]="item"></app-team-card>
            }
          } @else {
            <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
              <fa-icon [icon]="Shield" class="text-4xl text-main"></fa-icon>
              <p class="font-semibold">No se encontraron clubes.</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L2TeamsComponent {
  private viewportScroller = inject(ViewportScroller);
  private teamsService = inject(FetchTeamsService);
  private stadiumsService = inject(FetchStadiumsService);
  private uiDataMapperService = inject(UiDataMapperService);

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  dataTeamsCard: TeamCard[] = [];

  Shield = faShieldHalved;
  Error = faTriangleExclamation;

  constructor() {
    this.stadiumsService.fetchStadiums();

    combineLatest([this.teamsService.teamsL2$, this.stadiumsService.stadiums$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, stadiumsState]) => {
        if (
          teamsState.status === 'success' && stadiumsState.status === 'success' &&
          teamsState.data !== null && stadiumsState.data !== null
        ) {
          this.dataTeamsCard = this.uiDataMapperService.teamsCardMapper(teamsState.data, stadiumsState.data);
          this.loadingState = 'success';
        } else if (teamsState.status === 'error' || stadiumsState.status === 'error') {
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