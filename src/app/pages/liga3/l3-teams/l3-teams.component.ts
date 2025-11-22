import { Component, inject } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStadiumService } from '../../../services/fetch-stadium.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../components/title/title.component';
import { TeamCardComponent } from '../../../components/team-card/team-card.component';
import { TeamCard } from '../../../interfaces/ui-models/team-card';

@Component({
  selector: 'app-l3-teams',
  imports: [TitleComponent, TeamCardComponent],
  template: `
    <app-title [title]="'Clubes'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(310px,_1fr))] gap-3 sm:gap-5 max-w-screen-xl mx-auto duration-500">
        @for (item of dataTeamsCard; track $index) {
          <app-team-card [data]="item"></app-team-card>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class L3TeamsComponent {
  private teamsService = inject(FetchTeamDataService);
  private stadiumService = inject(FetchStadiumService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataTeamsCard: TeamCard[] = [];

  constructor() {
    combineLatest([this.teamsService.dataTeamsL3$, this.stadiumService.dataStadiums$,]).pipe(takeUntilDestroyed()).subscribe({
      next: ([teams, stadiums]) => this.dataTeamsCard = this.uiDataMapperService.teamCardMapper(teams, stadiums)
    });
  }
}