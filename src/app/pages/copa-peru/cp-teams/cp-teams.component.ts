import { Component } from '@angular/core';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { TitleComponent } from '../../../components/title/title.component';
import { TeamCardCpComponent } from '../../../components/team-card-cp/team-card-cp.component';
import { TeamCardCp } from '../../../interfaces/ui-models/team-card-cp';

@Component({
  selector: 'app-cp-teams',
  imports: [TitleComponent, TeamCardCpComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night p-3 sm:p-5 duration-500">
      <div class="flex justify-center">
        <div class="w-full lg:w-11/12 xl:w-10/12 grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 duration-500">
          @for (item of dataTeams; track $index) {
            <app-team-card-cp [data]="dataTeams[$index]"></app-team-card-cp>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CpTeamsComponent {
  constructor(
    private leagueService: FetchLeaguesService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private leaguesSubscription: Subscription | null = null;
  dataTeams: TeamCardCp[] = [];

  ngOnInit() {
    this.leaguesSubscription = this.leagueService.dataLeagues$.subscribe({
      next: (data) => {
        this.dataTeams = this.uiDataMapperService.leagueCardMapper(data);
      },
    });
  }

  ngOnDestroy() {
    this.leaguesSubscription?.unsubscribe();
  }
}