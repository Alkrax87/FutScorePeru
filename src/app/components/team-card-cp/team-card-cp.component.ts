import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { TeamCardCp } from '../../interfaces/ui-models/team-card-cp';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-card-cp',
  imports: [FontAwesomeModule, RouterLink],
  template: `
    <div class="bg-nightfall flex flex-col gap-3 text-white p-3">
      <div class="flex flex-col gap-3 items-center">
        <p class="text-2xl font-semibold">{{ data?.region }}</p>
        <div [routerLink]="['../', 'liga', data?.category, data?.leagueId]">
          <img [src]="data?.flag" alt="Flag" class="w-40 cursor-pointer">
        </div>
      </div>
      @for (team of data?.teams; track $index) {
        <div class="bg-brightnight flex gap-1.5 sm:gap-3 p-3">
          <img [src]="team.image ? team.image : 'assets/images/pages/no-team.webp'" alt="CPTeam-logo" class="w-12 h-12 sm:w-16 sm:h-16">
          <div class="w-0 flex flex-1 flex-col justify-center">
            <p class="font-semibold truncate">{{ team.name }}</p>
            <p class="text-neutral-300 text-xs">
              <fa-icon [icon]="Location"></fa-icon> {{ team.city ? team.city : 'Por Definir' }}
            </p>
          </div>
          <div class="self-center">
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
  `,
  styles: ``
})
export class TeamCardCpComponent {
  @Input() data?: TeamCardCp;
  Trophy = faTrophy;
  Location = faLocationDot;
}