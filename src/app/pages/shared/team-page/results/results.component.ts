import { Component, Input } from '@angular/core';
import { BtnComponent } from "../../../../components/btn/btn.component";
import { TeamFixtureComponent } from "../../../../components/team-fixture/team-fixture.component";
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TeamInformation } from '../../../../interfaces/api-models/team-information';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DivisionData } from '../../../../interfaces/api-models/division-data';

@Component({
  selector: 'app-results',
  imports: [BtnComponent, FontAwesomeModule, TeamFixtureComponent],
  template: `
    <div class="bg-night py-10 lg:py-16 duration-500 select-none">
      <!-- Phase Selector -->
      <div class="flex justify-center">
        <div class="w-full md:w-5/6 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-x-6 px-7 pb-5">
          @if (category === 1) {
            <app-btn (click)="setActiveTab('apertura')" [active]="apertura">Apertura</app-btn>
            <app-btn (click)="setActiveTab('clausura')" [active]="clausura">Clausura</app-btn>
          }
          @if (category === 2) {
            <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
            <app-btn (click)="setActiveTab('grupos')" [active]="grupos">Fase Grupos</app-btn>
          }
          @if (category === 3) {
            <app-btn (click)="setActiveTab('regional')" [active]="regional">Fase Regional</app-btn>
            <app-btn (click)="setActiveTab('final')" [active]="final">Fase Final</app-btn>
          }
        </div>
      </div>
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto px-3 sm:px-5">
        @if (activeLastGames) {
          <!-- Results -->
          <div class="w-fit">
            <h3 class="text-3xl text-white font-bold">Resultados</h3>
            <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
          </div>
          <div class="bg-white dark:bg-nightfall p-3 flex gap-2 sm:gap-0 justify-center sm:justify-evenly flex-wrap sm:flex-nowrap rounded-3xl duration-500">
            @for (lastGame of teamLastGames?.[activeLastGames]; track $index) {
              @switch (lastGame) {
                @case ("w") {
                  <fa-icon class="text-xl text-green-600" [icon]="Win"></fa-icon>
                }
                @case ("d") {
                  <fa-icon class="text-xl text-neutral-300" [icon]="Draw"></fa-icon>
                }
                @case ("l") {
                  <fa-icon class="text-xl text-red-600" [icon]="Lose"></fa-icon>
                }
                @default {
                  <fa-icon class="text-xl text-neutral-400" [icon]="Default"></fa-icon>
                }
              }
            }
          </div>
          <div class="flex justify-center gap-5 text-sm py-1">
            <div class="text-neutral-400">
              <fa-icon class="text-xs text-green-600" [icon]="Win"></fa-icon> Victoria
            </div>
            <div class="text-neutral-400">
              <fa-icon class="text-xs text-neutral-300" [icon]="Draw"></fa-icon> Empate
            </div>
            <div class="text-neutral-400">
              <fa-icon class="text-xs text-red-600" [icon]="Lose"></fa-icon> Derrota
            </div>
          </div>
          <!-- Fixture -->
          @if (teamFixture) {
            <div class="w-fit">
              <h3 class="text-3xl text-white font-bold">Fixture</h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <app-team-fixture [teamFixture]="teamFixture[activeLastGames]"></app-team-fixture>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ResultsComponent {
  @Input() division?: DivisionData;
  @Input() category?: number;
  @Input() teamLastGames?: TeamInformation['lastgames'];
  @Input() teamFixture?: any;

  apertura: boolean = false;
  clausura: boolean = false;
  regional: boolean = false;
  grupos: boolean = false;
  final: boolean = false;

  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;

  ngOnInit() {
    if (this.division && this.category) {
      switch (this.category) {
        case 1:
          this.apertura = this.division.firstPhase.status;
          this.clausura = this.division.secondPhase.status;
          break;
        case 2:
          if (this.division.thirdPhase.status === true) {
            this.grupos = true;
          } else {
            this.regional = this.division.firstPhase.status;
            this.grupos = this.division.secondPhase.status;
          }
          break;
        case 3:
          if (this.division.thirdPhase.status === true) {
            this.final = true;
          } else {
            this.regional = this.division.firstPhase.status;
            this.final = this.division.secondPhase.status;
          }
          break;
      }
    }
  }

  setActiveTab(tab: String) {
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
    this.final = tab === 'final';
  }

  get activeLastGames(): string | null {
    if (this.apertura) return 'apertura';
    if (this.clausura) return 'clausura';
    if (this.regional) return 'regional';
    if (this.grupos) return 'grupos';
    if (this.final) return 'final';
    return null;
  }
}