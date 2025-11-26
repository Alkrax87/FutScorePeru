import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamDivision } from '../../interfaces/ui-models/team-division';
import { BtnComponent } from "../btn/btn.component";

@Component({
  selector: 'app-division-teams',
  imports: [RouterLink, BtnComponent],
  template: `
    <div class="select-none">
      <div class="bg-crimson h-2 relative flex justify-center">
        <div class="bg-white rounded-full absolute -top-6 md:-top-8 p-0.5 duration-500">
          <div class="border-2 border-crimson rounded-full">
            <img [src]="division.logo" alt="Division-logo" class="w-12 md:w-16 h-12 md:h-16 p-2 duration-500">
          </div>
        </div>
      </div>
      <div class="bg-night px-3 sm:px-5 py-12 md:py-24 duration-500">
        <div class="max-w-screen-xl duration-500 mx-auto">
          <p class="text-white text-center text-2xl font-semibold">Clubes <span class="text-crimson">{{ division.name }}</span></p>
          <div class="flex flex-wrap gap-4 justify-center mx-auto mt-2 mb-4">
            @for (team of teams; track $index) {
              @if (team.teamId) {
                <img [routerLink]="['../club', team.category, team.teamId]" [src]="team.imageThumbnail" [alt]="team.alt" class="w-10 md:w-12 duration-500 cursor-pointer hover:scale-110">
              } @else {
                <img [src]="team.imageThumbnail" [alt]="'CPTeam' + ($index + 1)" class="w-10 md:w-12 duration-500">
              }
            }
          </div>
          <div class="flex justify-center">
            @if (division.toLeagues) {
              <app-btn routerLink="../ligas" class="w-4/5 sm:w-96">Ir a Ligas</app-btn>
            } @else {
              <app-btn routerLink="../equipos" class="w-4/5 sm:w-96">Ir a Clubes</app-btn>
            }
          </div>
        </div>
      </div>
      <div class="bg-crimson h-2"></div>
    </div>
  `,
  styles: ``,
})
export class DivisionTeamsComponent {
  @Input() division!: { name: string; logo: string; toLeagues?: boolean };
  @Input() teams!: TeamDivision[];
}