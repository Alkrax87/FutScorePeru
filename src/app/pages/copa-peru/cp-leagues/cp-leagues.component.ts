import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { LeagueCardComponent } from '../../../components/league-card/league-card.component';
import { LeagueCard } from '../../../interfaces/ui-models/league-card';

@Component({
  selector: 'app-cp-leagues',
  imports: [TitleComponent, LeagueCardComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night px-2 sm:px-4 py-10 lg:py-16 duration-500 select-none">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 max-w-screen-xl mx-auto duration-500">
        @for (item of dataLeagues; track $index) {
          <app-league-card [data]="dataLeagues[$index]"></app-league-card>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpLeaguesComponent {
  private viewportScroller = inject(ViewportScroller);
  private leaguesService = inject(FetchLeaguesService);
  private teamsService = inject(FetchTeamsCPService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataLeagues: LeagueCard[] = [];

  constructor() {
    combineLatest([this.leaguesService.leagues$, this.teamsService.teamsCP$]).pipe(takeUntilDestroyed()).subscribe({
      next: ([leagues, teams]) => {
        this.dataLeagues = this.uiDataMapperService.leaguesCardMapper(leagues, teams);
      },
    });

    if (typeof window !== 'undefined') {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }
}