import { Component, inject } from '@angular/core';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { LeagueCardComponent } from '../../../components/league-card/league-card.component';
import { LeagueCard } from '../../../interfaces/ui-models/league-card';
import { combineLatest } from 'rxjs';
import { FetchTeamsCPService } from '../../../services/fetch-teams-cp.service';

@Component({
  selector: 'app-cp-leagues',
  imports: [TitleComponent, LeagueCardComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 max-w-screen-xl mx-auto duration-500">
        @for (item of dataLeagues; track $index) {
          <app-league-card [data]="dataLeagues[$index]"></app-league-card>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpLeaguesComponent {
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
  }
}