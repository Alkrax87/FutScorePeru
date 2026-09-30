import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
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
  selector: 'app-l1-play-offs',
  imports: [TitleComponent, BracketCardComponent, SubtitleComponent],
  template: `
    <app-title [title]="'Play-Offs'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <!-- Content -->
      <div class="max-w-screen-xl mx-auto">
        @if (dataPlayOffs2.length > 0 && dataPlayOffs1.length > 0) {
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
                  <app-bracket-card [bracket]="dataPlayOffs1[0]" [dualMatch]="true" [lastMatch]="'Campeón Liga 1'"></app-bracket-card>
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
export class L1PlayOffsComponent {
  private viewPortScroller = inject(ViewportScroller);
  private bracketsService = inject(FetchBracketsService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataPlayOffs2: MatchCard[] = [];
  dataPlayOffs1: MatchCard[] = [];

  constructor() {
    this.bracketsService.fetchBracketsL1();

    combineLatest([
      this.bracketsService.bracketsL1$,
      this.teamsService.teamsL1$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([bracketsState, teamsState]) => {
        if (bracketsState.data !== null && teamsState.data !== null) {
          this.dataPlayOffs2 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket2);
          this.dataPlayOffs1 = this.uiDataMapperService.bracketsCardMapper(teamsState.data, bracketsState.data.bracket1);
        }
      }
    });

    if (typeof window !== 'undefined') {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}