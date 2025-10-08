import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ManagerCard } from '../../interfaces/ui-models/manager-card';

@Component({
  selector: 'app-manager-card',
  imports: [CommonModule],
  template: `
    <div class="bg-night flex w-full sm:w-5/6 mx-auto">
      <div class="min-w-20 w-24 md:min-w-36 min-h-20 h-24 md:min-h-36 duration-500">
        @if (data.photo) {
          <img loading="lazy" [src]="data.photo" alt="Manager-logo" class="object-cover h-full w-full"/>
        } @else {
          <img src="assets/images/pages/no-manager.webp" alt="Manager-logo" class="object-cover h-full w-full"/>
        }
      </div>
      <div class="flex flex-col gap-2 items-center justify-center w-full bg-nightfall text-white duration-500">
        <div class="flex gap-2">
          @if (data.cod) {
            <img src="assets/svg/flags/{{ data.cod }}.svg" alt="flag-logo" class="w-6"/>
          } @else {
            <img src="assets/svg/flags/no-flag.svg" alt="flag-logo" class="w-6"/>
          }
          <p class="text-base md:text-lg font-bold">{{ data.name }}</p>
        </div>
        <div class="flex justify-center">
          <div class="skew-x-30 w-32 md:w-40 duration-500" [ngClass]="isActive ? 'bg-gold' : 'bg-[#A00424]'">
            <span class="w-full -skew-x-30 flex justify-center py-1 text-xs md:text-sm font-semibold duration-500">
              {{ isActive ? 'Dirigiendo' : 'Destituido' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ManagerCardComponent {
  @Input() data!: ManagerCard;
  @Input() isActive!: boolean;
}