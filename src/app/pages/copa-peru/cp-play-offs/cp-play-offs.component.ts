import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BtnComponent } from '../../../components/btn/btn.component';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { BracketCardComponent } from '../../../components/bracket-card/bracket-card.component';
import { MatchCard } from '../../../interfaces/ui-models/match-card';

@Component({
  selector: 'app-cp-play-offs',
  imports: [TitleComponent, BtnComponent, BracketCardComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Play-Offs'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto">
        @if (
          dataBrackets16.length > 0 &&
          dataBrackets8.length > 0 &&
          dataBrackets4.length > 0 &&
          dataBrackets2.length > 0 &&
          dataBrackets1.length > 0
        ) {
          <!-- Switch -->
          <div class="max-w-screen-xl grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4 mx-auto mb-6 px-4 duration-500">
            <app-btn (click)="setActiveTab('b16')" [active]="bracket16">Dieciseisavos</app-btn>
            <app-btn (click)="setActiveTab('b8')" [active]="bracket8">Octavos</app-btn>
            <app-btn (click)="setActiveTab('b4')" [active]="bracket4">Cuartos</app-btn>
            <app-btn (click)="setActiveTab('b2')" [active]="bracket2">Semifinales</app-btn>
            <app-btn (click)="setActiveTab('b1')" [active]="bracket1">Final</app-btn>
          </div>
          <!-- Content -->
          <div class="flex flex-col justify-center gap-4">
            <div class="flex flex-col gap-6 duration-500">
              <!-- Dieciseisavos de Final -->
              @if (bracket16) {
                <div>
                  <app-subtitle>Dieciseisavos de Final</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataBrackets16; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
              }
              <!-- Octavos de Final -->
              @if (bracket8) {
                <div>
                  <app-subtitle>Octavos de Final</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataBrackets8; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
              }
              <!-- Cuartos de Final -->
              @if (bracket4) {
                <div>
                  <app-subtitle>Cuartos de Final</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataBrackets4; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="false"></app-bracket-card>
                    }
                  </div>
                </div>
              }
              <!-- Semifinales -->
              @if (bracket2) {
                <div>
                  <app-subtitle>Semifinales</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataBrackets2; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="false"></app-bracket-card>
                    }
                  </div>
                </div>
              }
              <!-- Final -->
              @if (bracket1) {
                <div>
                  <app-subtitle>Final</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataBrackets1; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="false"></app-bracket-card>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="bg-nightfall py-20 text-center duration-500">
            <p class="text-main font-semibold text-3xl">Play-Offs</p>
            <p class="text-white">LLaves de clasificación por definir.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpPlayOffsComponent {
  private viewPortScroller = inject(ViewportScroller);
  private bracketsService = inject(FetchBracketsService);
  private teamsCPService = inject(FetchTeamsCPService);
  private uiDataMapperService = inject(UiDataMapperService);

  bracket16: boolean = true;
  bracket8: boolean = false;
  bracket4: boolean = false;
  bracket2: boolean = false;
  bracket1: boolean = false;

  dataBrackets16: MatchCard[] = [];
  dataBrackets8: MatchCard[] = [];
  dataBrackets4: MatchCard[] = [];
  dataBrackets2: MatchCard[] = [];
  dataBrackets1: MatchCard[] = [];

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