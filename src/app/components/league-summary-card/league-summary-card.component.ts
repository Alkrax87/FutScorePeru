import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faShieldHalved, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { LeagueSummaryCard } from '../../interfaces/ui-models/league-summary-card';

@Component({
  selector: 'app-league-summary-card',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-nightfall w-full p-5 flex flex-col gap-5">
      <div class="flex items-center gap-5">
        <fa-icon [icon]="Trophy" size="2x" class="text-crimson"></fa-icon>
        <div>
          <h3 class="font-semibold text-2xl">Resumen del Torneo</h3>
          <p class="text-neutral-400">Estructura general y objetivos</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- 1 -->
        <div class="bg-brightnight p-5 place-items-center">
          <div class="bg-nightfall flex justify-center items-center rounded-full p-3 w-16 h-16">
            <fa-icon [icon]="Shield" size="2x"></fa-icon>
          </div>
          <p class="font-semibold text-lg">{{ summaryData.teams }} Equipos</p>
          <p class="text-neutral-400 text-sm">Participantes en el torneo</p>
        </div>
        <!-- 2 -->
         <div class="bg-brightnight p-5 place-items-center">
          <div class="bg-nightfall flex justify-center items-center rounded-full p-3 w-16 h-16">
            <fa-icon [icon]="Flag" size="2x"></fa-icon>
          </div>
          <p class="font-semibold text-lg">{{ summaryData.stages.total }} Etapas</p>
          <p class="text-neutral-400 text-sm">{{ summaryData.stages.description }}</p>
        </div>
        <!-- 3 -->
         <div class="bg-brightnight p-5 place-items-center">
          <div class="bg-nightfall flex justify-center items-center rounded-full p-3 w-16 h-16">
            <fa-icon [icon]="Trophy" size="2x"></fa-icon>
          </div>
          <p class="font-semibold text-lg">{{ summaryData.objective }}</p>
          <p class="text-neutral-400 text-sm">Objetivo final del torneo</p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LeagueSummaryCardComponent {
  @Input() summaryData!: LeagueSummaryCard;
  Shield = faShieldHalved;
  Trophy = faTrophy;
  Flag = faFlag;
}