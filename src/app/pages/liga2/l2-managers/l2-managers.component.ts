import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { FetchManagersService } from '../../../services/fetch-managers.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { ManagerCarouselComponent } from '../../../components/manager-carousel/manager-carousel.component';
import { ManagerCarousel } from '../../../interfaces/ui-models/manager-carousel';

@Component({
  selector: 'app-l2-managers',
  imports: [TitleComponent, ManagerCarouselComponent, RouterLink, SubtitleComponent, FaIconComponent],
  template: `
    <app-title [title]="'Técnicos'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4 lg:gap-x-6 max-w-screen-xl mx-auto duration-500">
        @if (loadingState === 'idle' || loadingState === 'loading') {
          <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-main"></div>
            <p class="font-semibold">Cargando técnicos...</p>
          </div>
        } @else if (loadingState === 'error') {
          <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <fa-icon [icon]="Error" class="text-4xl text-main"></fa-icon>
            <p class="font-semibold">Hubo un problema cargando los técnicos.</p>
          </div>
        } @else {
          @if (dataCarousel.length > 0) {
            @for (item of dataCarousel; track item.teamId) {
              <div>
                <app-subtitle>
                  <a class="flex gap-2 items-center text-lg" [routerLink]="['../club', item.category, item.teamId]">
                    <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="w-8 sm:w-10 h-8 sm:h-10 duration-500" />{{ item.name }}
                  </a>
                </app-subtitle>
                @if (item.managers.length > 0) {
                  <app-manager-carousel [data]="item.managers"></app-manager-carousel>
                } @else {
                  <div class="flex flex-col h-24 sm:h-36 items-center justify-center bg-nightfall text-light duration-500">
                    <fa-icon [icon]="Manager" class="text-2xl sm:text-4xl text-main duration-500"></fa-icon>
                    <p class="font-semibold text-xs sm:text-sm">No hay técnicos registrados.</p>
                  </div>
                }
              </div>
            }
          } @else {
            <div class="col-span-full flex flex-col items-center justify-center min-h-48 gap-2 text-light">
              <fa-icon [icon]="Manager" class="text-4xl text-main"></fa-icon>
              <p class="font-semibold">No se encontraron datos.</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L2ManagersComponent {
  private viewportScroller = inject(ViewportScroller);
  private teamsService = inject(FetchTeamsService);
  private managersService = inject(FetchManagersService);
  private uiDataMapperService = inject(UiDataMapperService);

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  dataCarousel: ManagerCarousel[] = [];

  Manager = faUserTie;
  Error = faTriangleExclamation;

  constructor() {
    this.managersService.fetchManagersL2();

    combineLatest([this.teamsService.teamsL2$, this.managersService.managersL2$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, managersState]) => {
        if (
          teamsState.status === 'success' && managersState.status === 'success' &&
          teamsState.data !== null && managersState.data !== null
        ) {
          this.dataCarousel = this.uiDataMapperService.managersCarouselMapper(teamsState.data, managersState.data);
          this.loadingState = 'success';
        } else if (teamsState.status === 'error' || managersState.status === 'error') {
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