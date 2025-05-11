import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeamCard } from '../../interfaces/ui-models/team-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  template: `
    <div [routerLink]="['../', 'club', data?.category, data?.teamId]" class="flex cursor-pointer px-3 md:px-6 py-8 space-x-3"
      [ngClass]="{'bg-nightfall text-white': !isHovered}"
      [style.backgroundColor]="isHovered ? data?.color?.c1 : ''"
      [style.color]="isHovered ? data?.color?.c2 || '#ffffff' : ''"
      (mouseover)="isHovered = true"
      (mouseout)="isHovered = false"
    >
      <div class="w-16 flex justify-center items-center">
        <img loading="lazy" [src]="data?.image" [alt]="data?.alt" class="min-w-16 w-16" />
      </div>
      <div class="w-full truncate">
        <div class="w-full truncate font-semibold">
          {{ data?.name }}
        </div>
        <div class="flex text-sm">
          <div class="flex justify-center min-w-5 mr-2">
            <fa-icon [icon]="Ring"></fa-icon>
          </div>
          <div class="truncate">
            {{ data?.stadium?.name }}
          </div>
        </div>
        <div class="flex text-xs">
          <div class="flex justify-center min-w-5 mr-2">
            <fa-icon [icon]="Users"></fa-icon>
          </div>
          <div class="truncate">
            {{ data?.stadium?.capacity }}
          </div>
        </div>
        <div class="flex text-xs">
          <div class="flex justify-center min-w-5 mr-2">
            <fa-icon [icon]="LocationDot"></fa-icon>
          </div>
          <div class="truncate">
            {{ data?.stadium?.location }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamCardComponent {
  @Input() data?: TeamCard;
  isHovered: boolean = false;
  Ring = faRing;
  Users = faUsers;
  LocationDot = faLocationDot;
}