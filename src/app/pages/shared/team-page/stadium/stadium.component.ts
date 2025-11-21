import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';

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
              <img [src]="stadium.image" class="w-full h-[560px] rounded-xl object-cover">
            </div>
            <!-- Details -->
            <div class="w-full md:w-80 rounded-xl border-2 border-crimson p-5 h-fit">
              <div>
                <div class="flex gap-2 text-gold text-sm font-semibold">
                  <fa-icon [icon]="Users"></fa-icon>
                  <p>CAPACIDAD</p>
                </div>
                <p class="text-3xl font-bold text-white">{{ stadium.capacity }}</p>
              </div>
              <div class="w-full h-0.5 my-5 bg-crimson rounded-full"></div>
              <div>
                <div class="flex gap-2 text-gold text-sm font-semibold">
                  <fa-icon [icon]="Calendar"></fa-icon>
                  <p>INAUGURACIÓN</p>
                </div>
                <p class="text-3xl font-bold text-white">-</p>
              </div>
              <div class="w-full h-0.5 my-5 bg-crimson rounded-full"></div>
              <div>
                <div class="flex gap-2 text-gold text-sm font-semibold">
                  <fa-icon [icon]="Location"></fa-icon>
                  <p>UBICACIÓN</p>
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
  @Input() stadium?: { name:string, image: string, location: string, capacity: number };

  Users = faUsers;
  Calendar = faCalendar;
  Location = faLocationDot;
}