import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  imports: [TitleComponent, ManagerCarouselComponent, RouterLink, SubtitleComponent],
  template: `
    <app-title [title]="'Técnicos'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4 lg:gap-x-6 max-w-screen-xl mx-auto duration-500">
        @for (item of dataCarousel; track $index) {
          <div>
            <app-subtitle>
              <div class="flex gap-2 items-center cursor-pointer text-lg" [routerLink]="['../club', item.category, item.teamId]">
                <img [src]="item.imageThumbnail" [alt]="item.alt" class="w-10 h-10" />{{ item.name }}
              </div>
            </app-subtitle>
            <app-manager-carousel [data]="item.managers"></app-manager-carousel>
          </div>
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

  dataCarousel: ManagerCarousel[] = [];

  constructor() {
    this.managersService.fetchManagersL2();

    combineLatest([this.teamsService.teamsL2$, this.managersService.managersL2$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, managersState]) => {
        if (teamsState.data !== null && managersState.data !== null) {
          this.dataCarousel = this.uiDataMapperService.managersCarouselMapper(teamsState.data, managersState.data);
        }
      },
    });

    if (typeof window !== 'undefined') {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }
}