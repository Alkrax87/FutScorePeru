import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchManagerService } from '../../../services/fetch-manager.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ManagerCarousel } from '../../../interfaces/ui-models/manager-carousel';
import { ManagerCarouselComponent } from "../../../components/manager-carousel/manager-carousel.component";
import { ManagerData } from '../../../interfaces/api-models/manager-data';

@Component({
  selector: 'app-l2-managers',
  imports: [TitleComponent, ManagerCarouselComponent],
  template: `
    <app-title [title]="'Técnicos'"></app-title>
    <div class="bg-night pt-5">
      <div class="flex justify-center">
        <div class="w-full md:w-3/5 lg:w-3/6 p-3 md:p-0">
          @for (item of dataCarousel; track $index) {
            <div class="mb-5">
              <div class="flex items-center space-x-2">
                <img [src]="item.image" [alt]="item.alt" class="w-8 md:w-12">
                <p class="text-white font-semibold text-sm md:text-xl">{{ item.name }}</p>
              </div>
              <div class="bg-crimson skew-x-50 h-1.5 md:h-2 w-36 md:w-56 my-3"></div>
              <app-manager-carousel [data]="item.manager"></app-manager-carousel>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class L2ManagersComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private managerService: FetchManagerService
  ) {}

  private teamSubscription: Subscription | null = null;
  private managerSubscription: Subscription | null = null;
  dataTeams: TeamData[] = [];
  dataManagers: ManagerData[] = [];
  dataCarousel: ManagerCarousel[] = [];

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL2$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.managerSubscription = this.managerService.dataManagersL2$.subscribe({
      next: (data) => (this.dataManagers = data)
    });

    if (this.dataTeams && this.dataManagers) {
      this.getManagerData();
    }
  }

  getManagerData() {
    const mergedData = [];

    if (this.dataTeams) {
      for (const team of this.dataTeams) {
        const managers = this.dataManagers.filter(manager => manager.teamId === team.teamId);
        mergedData.push({
          name: team.name,
          image: team.image,
          alt: team.alt,
          url: team.url,
          manager: managers,
        })
      }
    }

    this.dataCarousel = mergedData;
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
    this.managerSubscription?.unsubscribe();
  }
}