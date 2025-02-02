import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/api-models/team-data-l3';
import { ManagerCarouselComponent } from "../../../components/manager-carousel/manager-carousel.component";
import { FetchManagerService } from '../../../services/fetch-manager.service';
import { ManagerCarousel } from '../../../interfaces/ui-models/manager-carousel';

@Component({
  selector: 'app-l3-managers',
  imports: [ManagerCarouselComponent],
  template: `
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
export class L3ManagersComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private managerService: FetchManagerService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] | null = null;

  dataCarousel: ManagerCarousel[] | null = null;

  ngOnInit() {
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        this.getManagerData();
      }
    })
  }

  async getManagerData() {
    const mergedData = [];

    if (this.dataTeams) {
      for (const team of this.dataTeams) {
        const manager = await this.managerService.fetchManager(team.manager.url);
        const filteredDataManagers = manager.map(({ name, cod, photo }) => ({
          name,
          cod,
          photo,
        }));
        mergedData.push({
          name: team.name,
          image: team.image,
          alt: team.alt,
          url: team.url,
          manager: filteredDataManagers,
        })
      }
    }

    this.dataCarousel = mergedData;
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
