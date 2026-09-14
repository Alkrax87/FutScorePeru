import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FetchDivisionsService } from '../../../services/fetch-divisions.service';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { BtnComponent } from '../../../components/btn/btn.component';
import { BracketCardComponent } from '../../../components/bracket-card/bracket-card.component';
import { MatchCard } from '../../../interfaces/ui-models/match-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-cp-brackets',
  imports: [TitleComponent, BtnComponent, RouterLink, BracketCardComponent],
  template: `
    <app-title [title]="'Brackets'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        @if (
          dataBrackets16.length < 1 &&
          dataBrackets8.length < 1 &&
          dataBrackets4.length < 1 &&
          dataBrackets2.length < 1 &&
          dataBrackets1.length < 1
        ) {
          <div class="bg-nightfall py-20 text-center">
            <p class="text-main font-semibold text-3xl">Copa Perú Etapa Nacional</p>
            <p class="text-white">LLaves de clasificación por definir.</p>
            <div class="w-64 mx-auto mt-3 px-5">
              <app-btn routerLink="/copa-peru" [active]="false">Ir a Home</app-btn>
            </div>
          </div>
        } @else {
          <div class="flex flex-wrap md:flex-nowrap gap-4 justify-center px-4 mb-3 sm:mb-5 duration-500">
            <app-btn class="w-full" (click)="setActiveTab('b16')" [active]="bracket16">Dieciseisavos</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b8')" [active]="bracket8">Octavos</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b4')" [active]="bracket4">Cuartos</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b2')" [active]="bracket2">Semifinales</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b1')" [active]="bracket1">Final</app-btn>
          </div>
          <!-- Container -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
            @if (bracket16) {
              @for (bracket of dataBrackets16; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
              }
            }
            @if (bracket8) {
              @for (bracket of dataBrackets8; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
              }
            }
            @if (bracket4) {
              @for (bracket of dataBrackets4; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="false"></app-bracket-card>
              }
            }
            @if (bracket2) {
              @for (bracket of dataBrackets2; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="false"></app-bracket-card>
              }
            }
            @if (bracket1) {
              @for (bracket of dataBrackets1; track $index) {
                <app-bracket-card [bracket]="bracket" [dualMatch]="false"></app-bracket-card>
              }
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpBracketsComponent {
  private viewPortScroller = inject(ViewportScroller);
  private divisionsService = inject(FetchDivisionsService);
  private teamsCPService = inject(FetchTeamsCPService);
  private bracketsService = inject(FetchBracketsService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataBrackets16: MatchCard[] = [];
  dataBrackets8: MatchCard[] = [];
  dataBrackets4: MatchCard[] = [];
  dataBrackets2: MatchCard[] = [];
  dataBrackets1: MatchCard[] = [];

  bracket16: boolean = true;
  bracket8: boolean = false;
  bracket4: boolean = false;
  bracket2: boolean = false;
  bracket1: boolean = false;

  constructor() {
    this.bracketsService.fetchBracketsCP();

    combineLatest([
      this.teamsCPService.teamsCP$,
      this.bracketsService.bracketsCP$
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, brackets]) => {
        if (teams && brackets) {
          this.dataBrackets16 = this.uiDataMapperService.bracketsCardMapper(teams, brackets.bracket16);
          this.dataBrackets8 = this.uiDataMapperService.bracketsCardMapper(teams, brackets.bracket8);
          this.dataBrackets4 = this.uiDataMapperService.bracketsCardMapper(teams, brackets.bracket4);
          this.dataBrackets2 = this.uiDataMapperService.bracketsCardMapper(teams, brackets.bracket2);
          this.dataBrackets1 = this.uiDataMapperService.bracketsCardMapper(teams, brackets.bracket1);
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }

  setActiveTab(tab: String) {
    this.bracket16 = tab === 'b16';
    this.bracket8 = tab === 'b8';
    this.bracket4 = tab === 'b4';
    this.bracket2 = tab === 'b2';
    this.bracket1 = tab === 'b1';
  }
}