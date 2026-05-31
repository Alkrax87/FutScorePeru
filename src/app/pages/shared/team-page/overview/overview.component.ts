import { Component, DestroyRef, inject } from '@angular/core';
import { TeamPageProfile } from '../../../../interfaces/api-models/teamPageProfile';
import { FetchPageProfileService } from '../../../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FetchTeamsService } from '../../../../services/fetch-teams.service';
import { FetchTeamsMatchResultsService } from '../../../../services/fetch-teams-match-results.service';
import { combineLatest } from 'rxjs';
import { UiDataMapperService } from '../../../../services/ui-data-mapper.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NextMatch } from '../../../../interfaces/ui-models/team-overview';
import { TeamOverviewNextMatchComponent } from "../../../../components/team-overview-next-match/team-overview-next-match.component";
import { TeamOverviewLatestComponent } from "../../../../components/team-overview-latest/team-overview-latest.component";

@Component({
  selector: 'app-overview',
  imports: [FontAwesomeModule, TeamOverviewNextMatchComponent, TeamOverviewLatestComponent],
  template: `
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto flex flex-col gap-10">
        @if (overviewData) {
          <!-- Next Match -->
          <app-team-overview-next-match [matchData]="nextMatchData"></app-team-overview-next-match>
          <!-- Latest 5 -->
          <app-team-overview-latest [overviewData]="overviewData" [category]="category" [teamId]="teamId"></app-team-overview-latest>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class OverviewComponent {
  private fetchPageProfile = inject(FetchPageProfileService);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private teamsService = inject(FetchTeamsService);
  private uiDataMapperService = inject(UiDataMapperService);
  private destroyRef = inject(DestroyRef);
  overviewData!: TeamPageProfile['teamOverviewData'];
  teamId!: string;
  category!: number;

  nextMatchData!: NextMatch;

  constructor() {
    this.fetchPageProfile.team$.pipe(takeUntilDestroyed()).subscribe({
      next: (team) => {
        this.teamId = team!.teamData.teamId;
        this.category = team!.teamData.category;
        this.overviewData = team!.teamOverviewData;
        this.loadData();
      },
    });
  }

  loadData() {
    switch (this.category) {
      case 1:
        this.teamsMatchResultsService.fetchTeamsMatchResultsL1();
        combineLatest([
          this.teamsService.teamsL1$,
        ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: ([teams]) => {
            this.nextMatchData = this.uiDataMapperService.overviewNextMatchMapper(teams, this.overviewData.nextMatch);
          }
        });
        break;
      case 2:
        this.teamsMatchResultsService.fetchTeamsMatchResultsL2();
        combineLatest([
          this.teamsService.teamsL2$,
        ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: ([teams]) => {
            this.nextMatchData = this.uiDataMapperService.overviewNextMatchMapper(teams, this.overviewData.nextMatch);
          }
        });
        break;
      case 3:
        this.teamsMatchResultsService.fetchTeamsMatchResultsL3();
        combineLatest([
          this.teamsService.teamsL3$,
        ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: ([teams]) => {
            this.nextMatchData = this.uiDataMapperService.overviewNextMatchMapper(teams, this.overviewData.nextMatch);
          }
        });
        break;
    }
  }
}