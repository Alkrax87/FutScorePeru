import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchManagerService } from '../../../services/fetch-manager.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { ManagerCarouselComponent } from '../../../components/manager-carousel/manager-carousel.component';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ManagerData } from '../../../interfaces/api-models/manager-data';
import { ManagerCarousel } from '../../../interfaces/ui-models/manager-carousel';

@Component({
  selector: 'app-l1-managers',
  imports: [TitleComponent, ManagerCarouselComponent, RouterLink],
  template: `
    <app-title [title]="'Técnicos'"></app-title>
    <div class="bg-night p-3 sm:p-5 duration-500 select-none">
      <div class="flex justify-center">
        <div class="w-full md:w-4/5 xl:w-1/2 flex flex-col gap-3 sm:gap-5 duration-500">
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
    </div>
  `,
  styles: ``,
})
export class L1ManagersComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private managerService: FetchManagerService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private teamSubscription: Subscription | null = null;
  private managerSubscription: Subscription | null = null;
  dataTeams: TeamData[] = [];
  dataManagers: ManagerData[] = [];
  dataCarousel: ManagerCarousel[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => (this.dataTeams = data),
    });
    this.managerSubscription = this.managerService.dataManagersL1$.subscribe({
      next: (data) => (this.dataManagers = data),
    });

    if (this.dataTeams && this.dataManagers) {
      this.dataCarousel = this.uiDataMapperService.managerCarouselMapper(this.dataTeams, this.dataManagers);
    }
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.managerSubscription?.unsubscribe();
  }
}