import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ManagerCard } from '../../interfaces/ui-models/manager-card';

@Component({
  selector: 'app-manager-card',
  imports: [CommonModule],
  template: `
    <div class="flex justify-center bg-night">
      <div class="flex w-11/12 md:w-5/6">
        <div class="min-w-20 w-24 md:min-w-36 min-h-20 h-24 md:min-h-36">
          <img [src]="data.src" [alt]="data.alt" class="object-cover h-full w-full"/>
        </div>
        <div class="flex items-center justify-center w-full py-5 md:py-5 bg-nightfall text-white">
          <div class="space-y-2">
            <div class="text-lg flex">
              <img [src]="data.country" alt="flag-logo" class="w-6" />
              <p class="text-base md:text-xl font-bold pl-2">{{ data.name }}</p>
            </div>
            <div class="flex justify-center">
              <div class="skew-x-30p w-40" [ngClass]="data.isActive ? 'bg-gold' : 'bg-[#A00424]'">
                <span class="w-full skew-x-30n flex justify-center py-1 text-xs md:text-base font-semibold">
                  {{ data.isActive ? "Dirigiendo" : "Destituido" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ManagerCardComponent {
  @Input() data!: ManagerCard;
}