import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFlag, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { DivisionSummary } from '../../interfaces/ui-models/division-summary';
import { SubtitleComponent } from '../subtitle/subtitle.component';

@Component({
  selector: 'app-division-summary',
  imports: [FaIconComponent, SubtitleComponent],
  template: `
    <div class="bg-light dark:bg-nightfall dark:text-light px-2 sm:px-4 py-12 md:py-20 select-none duration-500">
      <div class="max-w-screen-xl mx-auto">
        <app-subtitle><div class="text-dark dark:text-light duration-500">Estructura general</div></app-subtitle>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <!-- 1 -->
          <div class="bg-white dark:bg-night p-6 place-items-center shadow-md duration-500">
            <div class="bg-main text-light flex justify-center items-center rounded-full w-14 h-14">
              <fa-icon [icon]="Shield" class="text-3xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ division.teams }} Equipos</p>
            <p class="text-neutral-500 text-sm">Participantes en el torneo</p>
          </div>
          <!-- 2 -->
          <div class="bg-white dark:bg-night p-6 place-items-center shadow-md duration-500">
            <div class="bg-main text-light flex justify-center items-center rounded-full w-14 h-14">
              <fa-icon [icon]="Flag" class="text-3xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ division.phases }} Etapas</p>
            <p class="text-neutral-500 text-sm">{{ division.description }}</p>
          </div>
          <!-- 3 -->
          <div class="bg-white dark:bg-night p-6 place-items-center shadow-md duration-500">
            <div class="bg-main text-light flex justify-center items-center rounded-full w-14 h-14">
              <fa-icon [icon]="Trophy" class="text-3xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ division.goal }}</p>
            <p class="text-neutral-500 text-sm">Objetivo final del torneo</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionSummaryComponent {
  @Input() division!: DivisionSummary;

  Shield = faShieldHalved;
  Trophy = faTrophy;
  Flag = faFlag;
}