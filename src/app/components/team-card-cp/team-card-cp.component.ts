import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { TeamCardCp } from '../../interfaces/ui-models/team-card-cp';

@Component({
  selector: 'app-team-card-cp',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-nightfall flex flex-col gap-3 text-white p-3">
      <div class="flex flex-col gap-3 items-center">
        <p class="text-2xl font-semibold">{{ data?.region }}</p>
        <img [src]="data?.flag" [alt]="data?.alt" class="w-20">
      </div>
      <div class="bg-brightnight flex gap-3 p-3">
        <img [src]="data?.teams?.[0]?.image" [alt]="data?.teams?.[0]?.alt" class="w-16 h-16 min-h-16 min-w-16">
        <div class="w-full flex flex-col justify-center">
          <p class="font-semibold">{{ data?.teams?.[0]?.name }}</p>
          <p class="text-neutral-300 text-xs">
            <fa-icon [icon]="Location"></fa-icon> {{ data?.teams?.[0]?.city }}
          </p>
        </div>
        <div>
          <fa-icon class="text-yellow-400" [icon]="Trophy"></fa-icon>
        </div>
      </div>
      <div class="bg-brightnight flex gap-3 p-3">
        <img [src]="data?.teams?.[1]?.image" [alt]="data?.teams?.[1]?.alt" class="w-16 h-16 min-h-16 min-w-16">
        <div class="w-full flex flex-col justify-center">
          <p class="font-semibold">{{ data?.teams?.[1]?.name }}</p>
          <p class="text-neutral-300 text-xs">
            <fa-icon [icon]="Location"></fa-icon> {{ data?.teams?.[1]?.city }}
          </p>
        </div>
        <div>
          <fa-icon class="text-neutral-400" [icon]="Trophy"></fa-icon>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class TeamCardCpComponent {
  @Input() data?: TeamCardCp;
  Trophy = faTrophy;
  Location = faLocationDot;
}