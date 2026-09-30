import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSoccerBall } from '@fortawesome/free-solid-svg-icons';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { FetchTeamsService } from '../../../services/fetch-teams.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { BracketCardComponent } from '../../../components/bracket-card/bracket-card.component';
import { MatchCard } from '../../../interfaces/ui-models/match-card';

@Component({
  selector: 'app-l2-play-offs',
  imports: [TitleComponent, SubtitleComponent, BracketCardComponent, FaIconComponent],
  template: `
    <app-title [title]="'Play-Offs'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
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
export class L2PlayOffsComponent {
  private viewPortScroller = inject(ViewportScroller);
  private bracketsService = inject(FetchBracketsService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataPlayOffs2: MatchCard[] = [];
  dataPlayOffs1: MatchCard[] = [];
  dataPlayOffsExtra: MatchCard[] = [];

  Soccer = faSoccerBall;

  constructor() {
    this.bracketsService.fetchBracketsL2();

    combineLatest([
      this.bracketsService.bracketsL2$,
      this.teamsService.teamsL2$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([bracketsState, teamsState]) => {
        if (bracketsState.data !== null && teamsState.data !== null) {
          this.dataPlayOffs2 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket2);
          this.dataPlayOffs1 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket1);
          this.dataPlayOffsExtra = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracketExtra);
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}