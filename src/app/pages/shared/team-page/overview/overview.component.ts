import { Component, inject } from '@angular/core';
import { TeamPageProfile } from '../../../../interfaces/api-models/teamPageProfile';
import { FetchPageProfileService } from '../../../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { TeamOverviewNextMatchComponent } from "../../../../components/team-overview-next-match/team-overview-next-match.component";
import { TeamOverviewLatestComponent } from "../../../../components/team-overview-latest/team-overview-latest.component";
import { TeamOverviewTableComponent } from "../../../../components/team-overview-table/team-overview-table.component";

@Component({
  selector: 'app-overview',
  imports: [TeamOverviewNextMatchComponent, TeamOverviewLatestComponent, TeamOverviewTableComponent],
  template: `
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto flex flex-col gap-10">
        @if (overviewData) {
          <!-- Next Match -->
          <app-team-overview-next-match [nextMatchData]="overviewData.nextMatch" [category]="category" [teamId]="teamId"></app-team-overview-next-match>
          <!-- Latest 5 -->
          <app-team-overview-latest [latestData]="overviewData.latest" [category]="category" [teamId]="teamId"></app-team-overview-latest>
          <!-- Table -->
          <app-team-overview-table [standingsData]="overviewData.standings" [category]="category" [teamId]="teamId"></app-team-overview-table>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class OverviewComponent {
  private fetchPageProfile = inject(FetchPageProfileService);

  teamId!: string;
  category!: number;
  overviewData!: TeamPageProfile['teamOverviewData'];

  constructor() {
    this.fetchPageProfile.team$.pipe(filter(team => !!team), takeUntilDestroyed()).subscribe({
      next: (team) => {
        this.teamId = team.teamData.teamId;
        this.category = team.teamData.category;
        this.overviewData = team.teamOverviewData;
      },
    });
  }
}