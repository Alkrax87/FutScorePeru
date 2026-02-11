import { Component, inject } from '@angular/core';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from "../../../components/title/title.component";
import { TeamCardCpComponent } from "../../../components/team-card-cp/team-card-cp.component";
import { TeamCardCp } from '../../../interfaces/ui-models/team-card-cp';

@Component({
  selector: 'app-cp-leagues',
  imports: [TitleComponent, TeamCardCpComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(310px,_1fr))] gap-3 sm:gap-5 max-w-screen-xl mx-auto duration-500">
        @for (item of dataLeagues; track $index) {
          <app-team-card-cp [data]="dataLeagues[$index]"></app-team-card-cp>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CpLeaguesComponent {
  private leaguesService = inject(FetchLeaguesService);
  private uiDataMapperService = inject(UiDataMapperService);

  dataLeagues: TeamCardCp[] = [];

  constructor() {
    this.leaguesService.leagues$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => this.dataLeagues = this.uiDataMapperService.leagueCardMapper(data)
    });
  }
}