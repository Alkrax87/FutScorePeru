import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faNetworkWired, faSoccerBall, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-l2-play-offs',
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
          @if (dataPlayOffs2.length > 0 && dataPlayOffs1.length > 0 && dataPlayOffsExtra.length > 0) {
            <div class="flex flex-col justify-center gap-4">
              <div class="flex flex-col gap-6 duration-500">
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
                    <app-bracket-card [bracket]="dataPlayOffs1[0]" [dualMatch]="true" [lastMatch]="'Campeón Liga 2'"></app-bracket-card>
                  </div>
                </div>
                <!-- Play-Offs de Ascenso -->
                <div>
                  <app-subtitle>Play-Offs de Ascenso</app-subtitle>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 duration-500">
                    <app-bracket-card [bracket]="dataPlayOffsExtra[0]" [dualMatch]="true"></app-bracket-card>
                    <app-bracket-card [bracket]="dataPlayOffsExtra[1]" [dualMatch]="false" [lastMatch]="'Subcampeón Liga 2'"></app-bracket-card>
                  </div>
                  <div class="text-white mt-4">
                    <p class="font-semibold"><fa-icon [icon]="Soccer"></fa-icon> Formato</p>
                    <ul>
                      <li>- Los equipos que perdieron las <b class="text-gold">semifinales</b> se enfrentan para acceder a una segunda opción de ascenso.</li>
                      <li>- El equipo <b class="text-gold">ganador del repechaje</b> y el <b class="text-gold">perdedor de la final</b> se enfrentan para definir el subcampeón de la <b class="text-gold">Liga 2</b>.</li>
                    </ul>
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
export class L2PlayOffsComponent {
  private viewPortScroller = inject(ViewportScroller);
  private bracketsService = inject(FetchBracketsService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);

  loadingState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  dataPlayOffs2: BracketCard[] = [];
  dataPlayOffs1: BracketCard[] = [];
  dataPlayOffsExtra: BracketCard[] = [];

  Soccer = faSoccerBall;
  Bracket = faNetworkWired;
  Error = faTriangleExclamation;

  constructor() {
    this.bracketsService.fetchBracketsL2();

    combineLatest([
      this.teamsService.teamsL2$,
      this.bracketsService.bracketsL2$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teamsState, bracketsState]) => {
        if (
          bracketsState.status === 'success' && teamsState.status === 'success' &&
          bracketsState.data !== null && teamsState.data !== null
        ) {
          this.dataPlayOffs2 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket2);
          this.dataPlayOffs1 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket1);
          this.dataPlayOffsExtra = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracketExtra);
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