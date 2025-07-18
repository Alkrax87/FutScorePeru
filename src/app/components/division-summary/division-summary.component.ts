import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { DivisionSummary } from '../../interfaces/ui-models/division-summary';

@Component({
  selector: 'app-division-summary',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-night text-white px-5 py-10 md:py-24 select-none duration-500">
      <div class="w-full lg:w-5/6 xl:w-2/3 duration-500 mx-auto">
        <div class="flex items-center gap-4 mb-5">
          <fa-icon [icon]="Trophy" size="2x" class="text-crimson"></fa-icon>
          <div>
            <h3 class="font-semibold text-2xl">Resumen del Torneo</h3>
            <p class="text-neutral-400">Estructura general y objetivos</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <!-- 1 -->
          <div class="bg-nightfall px-3 py-5 place-items-center shadow-md">
            <div class="bg-crimson flex justify-center items-center rounded-full w-12 h-12">
              <fa-icon [icon]="Shield" class="text-2xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ summaryData.teams }} Equipos</p>
            <p class="text-neutral-400 text-sm">Participantes en el torneo</p>
          </div>
          <!-- 2 -->
          <div class="bg-nightfall px-3 py-5 place-items-center shadow-md">
            <div class="bg-crimson flex justify-center items-center rounded-full w-12 h-12">
              <fa-icon [icon]="Flag" class="text-2xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ summaryData.stages.total }} Etapas</p>
            <p class="text-neutral-400 text-sm">{{ summaryData.stages.description }}</p>
          </div>
          <!-- 3 -->
          <div class="bg-nightfall px-3 py-5 place-items-center shadow-md">
            <div class="bg-crimson flex justify-center items-center rounded-full w-12 h-12">
              <fa-icon [icon]="Trophy" class="text-2xl"></fa-icon>
            </div>
            <p class="font-semibold text-lg mt-2">{{ summaryData.objective }}</p>
            <p class="text-neutral-400 text-sm">Objetivo final del torneo</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionSummaryComponent {
  @Input() summaryData!: DivisionSummary;
  Shield = faShieldHalved;
  Trophy = faTrophy;
  Flag = faFlag;
}