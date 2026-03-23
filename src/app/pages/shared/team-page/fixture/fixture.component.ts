import { Component, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FetchPageProfileService } from '../../../../services/fetch-page-profile.service';
import { FetchDivisionsService } from '../../../../services/fetch-divisions.service';
import { FetchTeamsService } from '../../../../services/fetch-teams.service';
import { FetchTeamsMatchResultsService } from '../../../../services/fetch-teams-match-results.service';
import { MatchesSetupService } from '../../../../services/matches-setup.service';
import { TeamPageProfile } from '../../../../interfaces/api-models/teamPageProfile';
import { BtnComponent } from "../../../../components/btn/btn.component";
import { TeamFixtureComponent } from "../../../../components/team-fixture/team-fixture.component";

@Component({
  selector: 'app-fixture',
  imports: [TeamFixtureComponent, BtnComponent],
  template: `
    <div class="bg-night px-3 sm:px-5 py-10 lg:py-16 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto">
        @if (fixture) {
          <div class="flex flex-col gap-4">
            <div class="w-fit">
              <h3 class="text-3xl md:text-4xl text-white font-bold">Fixture </h3>
              <div class="bg-crimson skew-x-50 h-1.5 mt-1 mb-2"></div>
            </div>
            <!-- Switch -->
            <div class="mx-auto w-full md:w-5/6 lg:w-6/12 grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 px-4 md:px-0">
              @if (category === 1) {
                <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Apertura</app-btn>
                <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Clausura</app-btn>
              } @else {
                <app-btn (click)="setActiveTab('phase1')" [active]="phase1">Fase Regional</app-btn>
                <app-btn (click)="setActiveTab('phase2')" [active]="phase2">Fase Final</app-btn>
              }
            </div>
            <!-- Content -->
            @if (phase1) {
              @if (computedFixture && computedFixture.phase1.length > 0) {
                <app-team-fixture [teamFixture]="computedFixture.phase1"></app-team-fixture>
              } @else {
                <div class="flex h-64 justify-center items-center select-none">
                  <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
                </div>
              }
            }
            @if (phase2) {
              @if (computedFixture && computedFixture.phase2.length > 0) {
                <app-team-fixture [teamFixture]="computedFixture.phase2"></app-team-fixture>
              } @else {
                <div class="flex h-64 justify-center items-center select-none">
                  <h3 class="text-2xl text-white font-bold">Fixture por definir...</h3>
                </div>
              }
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class FixtureComponent {
  private fetchPageProfile = inject(FetchPageProfileService);
  private divisionService = inject(FetchDivisionsService);
  private teamsService = inject(FetchTeamsService);
  private teamsResultsService = inject(FetchTeamsMatchResultsService);
  private matchesSetupService = inject(MatchesSetupService);
  fixture!: TeamPageProfile['teamFixtureData'];
  category!: number;

  phase1: boolean = false;
  phase2: boolean = false;
  computedFixture: any;

  constructor() {
    this.fetchPageProfile.team$.pipe(takeUntilDestroyed()).subscribe({
      next: (team) => {
        this.category = team!.teamData.category;
        this.fixture = team!.teamFixtureData;
      },
    });
  }

  ngOnInit() {
    switch (this.category) {
      case 1:
        this.teamsResultsService.fetchTeamsMatchResultsL1();
        combineLatest([this.divisionService.divisionL1$, this.teamsService.teamsL1$, this.teamsResultsService.teamsMatchResultsL1$]).subscribe({
          next: ([division, teams, results]) => {
            if (division?.phase3.status === true) {
              this.phase2 = true;
            } else {
              this.phase1 = division ? division.phase1.status : false;
              this.phase2 = division ? division.phase2.status : false;
            }
            this.computedFixture = this.matchesSetupService.transformDataForTeamFixture(teams, this.fixture, results);
          }
        });
        break;
      case 2:
        this.teamsResultsService.fetchTeamsMatchResultsL2();
        combineLatest([this.divisionService.divisionL2$, this.teamsService.teamsL2$, this.teamsResultsService.teamsMatchResultsL2$]).subscribe({
          next: ([division, teams, results]) => {
            if (division?.phase3.status === true) {
              this.phase2 = true;
            } else {
              this.phase1 = division ? division.phase1.status : false;
              this.phase2 = division ? division.phase2.status : false;
            }
            this.computedFixture = this.matchesSetupService.transformDataForTeamFixture(teams, this.fixture, results);
          }
        });
        break;
      case 3:
        this.teamsResultsService.fetchTeamsMatchResultsL3();
        combineLatest([this.divisionService.divisionL3$, this.teamsService.teamsL3$, this.teamsResultsService.teamsMatchResultsL3$]).subscribe({
          next: ([division, teams, results]) => {
            if (division?.phase3.status === true) {
              this.phase2 = true;
            } else {
              this.phase1 = division ? division.phase1.status : false;
              this.phase2 = division ? division.phase2.status : false;
            }
            this.computedFixture = this.matchesSetupService.transformDataForTeamFixture(teams, this.fixture, results);
          }
        });
        break;
    }
  }

  setActiveTab(tab: String) {
    this.phase1 = tab === 'phase1';
    this.phase2 = tab === 'phase2';
  }
}