import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchManagerService } from '../../../services/fetch-manager.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { ManagerCarouselComponent } from '../../../components/manager-carousel/manager-carousel.component';
import { ManagerCarousel } from '../../../interfaces/ui-models/manager-carousel';

@Component({
  selector: 'app-l1-managers',
  imports: [TitleComponent, ManagerCarouselComponent, RouterLink],
  template: `
    <app-title [title]="'Técnicos'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-lg mx-auto flex flex-col gap-3 sm:gap-5 duration-500">
        @for (item of dataCarousel; track $index) {
          <div>
            <div class="w-fit">
              <div class="flex gap-2 items-center cursor-pointer" [routerLink]="['../club', item.category, item.teamId]">
                <img [src]="item.image" [alt]="item.alt" class="w-10" />
                <p class="text-lg text-white font-bold">{{ item.name }}</p>
              </div>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-manager-carousel [data]="item.manager"></app-manager-carousel>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L1ManagersComponent {
  private teamsService = inject(FetchTeamDataService);
  private managerService = inject(FetchManagerService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataCarousel: ManagerCarousel[] = [];

  constructor() {
    combineLatest([this.teamsService.dataTeamsL1$, this.managerService.dataManagersL1$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, managers]) => this.dataCarousel = this.uiDataMapperService.managerCarouselMapper(teams, managers)
    });
  }
}