import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faNetworkWired, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { BracketCardComponent } from '../../../components/bracket-card/bracket-card.component';
import { BracketCard } from '../../../interfaces/ui-models/bracket-card';

@Component({
  selector: 'app-l3-play-offs',
  imports: [TitleComponent, SubtitleComponent, BracketCardComponent, FaIconComponent],
  template: `
    <app-title [title]="'Play-Offs'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        @if (loadingState === 'idle' || loadingState === 'loading') {
          <div class="flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-main"></div>
            <p class="font-semibold">Cargando play-Offs...</p>
          </div>
        } @else if (loadingState === 'error') {
          <div class="flex flex-col items-center justify-center min-h-48 gap-2 text-light">
            <fa-icon [icon]="Error" class="text-4xl text-main"></fa-icon>
            <p class="font-semibold">Hubo un problema cargando los play-offs.</p>
          </div>
        } @else {
          @if (dataPlayOffs4.length > 0 && dataPlayOffs2.length > 0 && dataPlayOffs1.length > 0) {
            <div class="flex flex-col justify-center gap-4">
              <div class="flex flex-col gap-6 duration-500">
                <!-- Cuartos de Final -->
                <div>
                  <app-subtitle>Cuartos de Final</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataPlayOffs4; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
                <!-- Semifinales -->
                <div>
                  <app-subtitle>Semifinales</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    @for (bracket of dataPlayOffs2; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
                <!-- Final -->
                <div>
                  <app-subtitle>Final</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    <app-bracket-card [bracket]="dataPlayOffs1[0]" [dualMatch]="true" [lastMatch]="'Campeón Liga 3'"></app-bracket-card>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <div class="flex flex-col items-center justify-center min-h-48 gap-2 text-light">
              <fa-icon [icon]="Bracket" class="text-4xl text-main"></fa-icon>
              <p class="font-semibold">LLaves de clasificación por definir.</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L3PlayOffsComponent {
  private viewPortScroller = inject(ViewportScroller);
  private bracketsService = inject(FetchBracketsService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  dataPlayOffs4: BracketCard[] = [];
  dataPlayOffs2: BracketCard[] = [];
  dataPlayOffs1: BracketCard[] = [];

  Bracket = faNetworkWired;
  Error = faTriangleExclamation;

  constructor() {
    this.bracketsService.fetchBracketsL3();

    combineLatest([
      this.teamsService.teamsL3$,
      this.bracketsService.bracketsL3$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, bracketsState]) => {
        if (
          bracketsState.status === 'success' && teamsState.status === 'success' &&
          bracketsState.data !== null && teamsState.data !== null
        ) {
          this.dataPlayOffs4 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket4);
          this.dataPlayOffs2 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket2);
          this.dataPlayOffs1 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket1);
          this.loadingState = 'success';
        } else if (bracketsState.status === 'error' || teamsState.status === 'error') {
          this.loadingState = 'error';
        } else {
          this.loadingState = 'loading';
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}