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
          <img [src]="data?.flag" alt="Flag" class="w-20 cursor-pointer">
        </div>
      </div>
      @for (team of data?.teams; track $index) {
        <div class="bg-brightnight flex gap-3 p-3">
          <img [src]="team.image ? team.image : 'assets/images/pages/no-team.webp'" alt="CPTeam-logo" class="w-16 h-16 min-h-16 min-w-16">
          <div class="w-full flex flex-col justify-center">
            <p class="font-semibold">{{ team.name }}</p>
            <p class="text-neutral-300 text-xs">
              <fa-icon [icon]="Location"></fa-icon> {{ team.city ? team.city : '' }}
            </p>
          </div>
          <div>
            @if ($index === 0) {
              <fa-icon class="text-yellow-400" [icon]="Trophy"></fa-icon>
            }
            @if ($index === 1) {
              <fa-icon class="text-neutral-300" [icon]="Trophy"></fa-icon>
            }
            @if ($index === 2) {
              <fa-icon class="text-amber-600" [icon]="Trophy"></fa-icon>
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