import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FetchPageProfileService } from '../../../../services/fetch-page-profile.service';
import { TeamPageProfile } from '../../../../interfaces/api-models/teamPageProfile';
import { SubtitleComponent } from '../../../../components/subtitle/subtitle.component';

@Component({
  selector: 'app-stadium',
  imports: [FaIconComponent, SubtitleComponent],
  template: `
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto">
        @if (stadium) {
          <app-subtitle>{{ stadium.name }}</app-subtitle>
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Image -->
            <div class="w-full">
              <img loading="eager" [src]="stadium.image" class="w-full h-full object-cover">
            </div>
            <!-- Details -->
            <div class="w-full md:w-80 border-2 border-main p-4 h-fit">
              <!-- Capacity -->
              <div>
                <div class="flex gap-2 text-gold text-xs font-semibold">
                  <fa-icon [icon]="Users"></fa-icon>
                  <p>Capacidad</p>
                </div>
                <p class="text-2xl font-bold text-white">{{ formatNumber(stadium.capacity) }}</p>
              </div>
              <div class="w-full h-0.5 my-4 bg-main rounded-full"></div>
              <!-- Location -->
              <div>
                <div class="flex gap-2 text-gold text-xs font-semibold">
                  <fa-icon [icon]="Location"></fa-icon>
                  <p>Ubicación</p>
                </div>
                <p class="text-2xl font-bold text-white">{{ stadium.location }}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class StadiumComponent {
  private fetchPageProfile = inject(FetchPageProfileService);
  stadium!: TeamPageProfile['stadiumData'];

  constructor() {
    this.fetchPageProfile.team$.pipe(takeUntilDestroyed()).subscribe({
      next: (team) => (this.stadium = team!.stadiumData),
    });
  }

  Users = faUsers;
  Location = faLocationDot;

  formatNumber(num: number) {
    return new Intl.NumberFormat("en-US").format(num);
  }
}