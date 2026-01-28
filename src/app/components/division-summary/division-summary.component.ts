import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { DivisionSummary } from '../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-division-summary',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-neutral-100 dark:bg-nightfall dark:text-white px-3 sm:px-5 py-12 md:py-24 select-none duration-500">
      <div class="max-w-screen-xl mx-auto">
        <div class="flex items-center gap-4 mb-5">
          <fa-icon [icon]="Trophy" size="2x" class="text-crimson"></fa-icon>
          <div>
            <h3 class="font-semibold text-2xl">Resumen del Torneo</h3>
            <p class="text-neutral-500 dark:text-neutral-300 duration-500">Estructura general y objetivos</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <!-- 1 -->
          <div class="bg-white dark:bg-night px-3 py-5 place-items-center shadow-md duration-500">
            <div class="bg-crimson text-white flex justify-center items-center rounded-full w-14 h-14">
              <fa-icon [icon]="Shield" class="text-3xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ division.teams }} Equipos</p>
            <p class="text-neutral-500 text-sm">Participantes en el torneo</p>
          </div>
          <!-- 2 -->
          <div class="bg-white dark:bg-night px-3 py-5 place-items-center shadow-md duration-500">
            <div class="bg-crimson text-white flex justify-center items-center rounded-full w-14 h-14">
              <fa-icon [icon]="Flag" class="text-3xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ division.phases }} Etapas</p>
            <p class="text-neutral-500 text-sm">{{ division.description }}</p>
          </div>
          <!-- 3 -->
          <div class="bg-white dark:bg-night px-3 py-5 place-items-center shadow-md duration-500">
            <div class="bg-crimson text-white flex justify-center items-center rounded-full w-14 h-14">
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