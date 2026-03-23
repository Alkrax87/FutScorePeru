import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FetchPageProfileService } from '../../../../services/fetch-page-profile.service';
import { TeamPageProfile } from '../../../../interfaces/api-models/teamPageProfile';

@Component({
  selector: 'app-stadium',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto">
        @if (stadium) {
          <div class="w-fit">
            <h3 class="text-3xl md:text-4xl text-white font-bold">{{ stadium.name }}</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <div class="flex flex-col md:flex-row gap-5">
            <!-- Image -->
            <div class="w-full">
              <img [src]="stadium.image" class="w-full  rounded-xl object-cover">
            </div>
            <!-- Details -->
            <div class="w-full md:w-80 rounded-xl border-2 border-crimson p-5 h-fit">
              <!-- Capacity -->
              <div>
                <div class="flex gap-2 text-gold text-sm font-semibold">
                  <fa-icon [icon]="Users"></fa-icon>
                  <p>Capacidad</p>
                </div>
                <p class="text-3xl font-bold text-white">{{ formatNumber(stadium.capacity) }}</p>
              </div>
              <div class="w-full h-0.5 my-4 bg-crimson rounded-full"></div>
              <!-- Location -->
              <div>
                <div class="flex gap-2 text-gold text-sm font-semibold">
                  <fa-icon [icon]="Location"></fa-icon>
                  <p>Ubicación</p>
                </div>
                <p class="text-3xl font-bold text-white">{{ stadium.location }}</p>
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