import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { TeamCardCp } from '../../interfaces/ui-models/team-card-cp';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-card-cp',
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  template: `
    <div [routerLink]="['../', 'liga', data.category, data.leagueId]" class="text-white flex flex-col gap-4 p-2 duration-300 cursor-pointer"
      [ngClass]="{'bg-nightfall': !isHovered}"
      [style.backgroundColor]="isHovered ? data.color.c1 : ''"
      (mouseover)="isHovered = true"
      (mouseout)="isHovered = false"
    >
      <div class="flex flex-col items-center">
        <p class="text-xl font-semibold">{{ data.region }}</p>
        <img [src]="data.flag" alt="Flag" class="w-32">
      </div>
      <div class="flex flex-col gap-2">
        @for (team of data.teams; track $index) {
          <div class="flex gap-3 p-2 duration-300"
            [ngClass]="{'bg-brightnight text-white': !isHovered}"
            [style.backgroundColor]="isHovered ? data.color.c2 : ''"
          >
            <img [src]="team.image ? team.image : 'assets/images/pages/no-team.webp'" alt="CPTeam-logo" class="w-10 h-10">
            <div class="w-0 flex flex-1 flex-col justify-center">
              <p class="font-semibold text-sm truncate">{{ team.name ? team.name : 'Por Definir' }}</p>
              <p class="text-neutral-300 text-xs truncate">
                <fa-icon [icon]="Location"></fa-icon> {{ team.city ? team.city : 'Por Definir' }}
              </p>
            </div>
            <div class="self-center min-w-5">
              @if ($index === 0) {
                <fa-icon class="text-yellow-400" [icon]="Trophy" [title]="'Campeón'"></fa-icon>
              }
              @if ($index === 1) {
                <fa-icon class="text-neutral-300" [icon]="Trophy" [title]="'Subcampeón'"></fa-icon>
              }
              @if ($index === 2) {
                <fa-icon class="text-amber-600" [icon]="Trophy" [title]="'Tercer Lugar'"></fa-icon>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamCardCpComponent {
  @Input() data!: TeamCardCp;
  isHovered: boolean = false;
  Trophy = faTrophy;
  Location = faLocationDot;
}