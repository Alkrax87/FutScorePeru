import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeamCard } from '../../interfaces/ui-models/team-card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [RouterLink, FaIconComponent, NgClass],
  template: `
    <div [routerLink]="['../', 'club', data.category, data.teamId]" class="flex cursor-pointer p-4 md:p-6 gap-2 duration-500"
      [ngClass]="{ 'bg-nightfall text-light': !isHovered }"
      [style.backgroundColor]="isHovered ? data.color.c1 : ''"
      [style.color]="isHovered ? data.color.c2 + '' || '#ffffff' : ''"
      (mouseover)="isHovered = true"
      (mouseout)="isHovered = false"
    >
      <!-- Image -->
      <div>
        <img loading="lazy" [src]="data.image" [alt]="data.alt" class="min-w-20 w-20 h-20" />
      </div>
      <!-- Details -->
      <div class="my-auto w-full truncate text-neutral-300 duration-500" [style.color]="isHovered ? data.color.c2 + 'de' : ''">
        <div class="w-full truncate font-semibold text-sm">{{ data.name }}</div>
        <div class="flex text-xs gap-1 duration-500">
          <div class="text-center w-4 min-w-4">
            <fa-icon [icon]="Ring" class="text-xs"></fa-icon>
          </div>
          <div class="truncate">{{ data.stadium.name }}</div>
        </div>
        <div class="flex text-xs gap-1 duration-500">
          <div class="text-center w-4 min-w-4">
            <fa-icon [icon]="Users" class="text-xs"></fa-icon>
          </div>
          <div class="truncate">{{ formatNumber(data.stadium.capacity) }}</div>
        </div>
        <div class="flex text-xs gap-1 duration-500">
          <div class="text-center w-4 min-w-4">
            <fa-icon [icon]="Location" class="text-xs"></fa-icon>
          </div>
          <div class="truncate">{{ data.location }}</div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamCardComponent {
  @Input() data!: TeamCard;

  isHovered: boolean = false;
  Ring = faRing;
  Users = faUsers;
  Location = faLocationDot;

  formatNumber(num: number) {
    return new Intl.NumberFormat('en-US').format(num);
  }
}