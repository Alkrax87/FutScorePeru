import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { TitleComponent } from "../../../components/title/title.component";
import { BtnComponent } from "../../../components/btn/btn.component";
import { BracketCardComponent } from "../../../components/bracket-card/bracket-card.component";
import { MatchCard } from '../../../interfaces/ui-models/match-card';
import { TeamCPData } from '../../../interfaces/api-models/team-cp-data';
import { FetchBracketsService } from '../../../services/fetch-brackets.service';
import { BracketsData } from '../../../interfaces/api-models/brackets-data';

@Component({
  selector: 'app-cp-brackets',
  imports: [TitleComponent, BtnComponent, RouterLink, BracketCardComponent],
  template: `
    <app-title [title]="'Brackets'"></app-title>
    <div class="bg-night p-5">
      @if (!dataBrackets) {
        <div class="bg-nightfall p-5 text-center">
          <p class="text-crimson font-semibold text-2xl">Copa Perú Etapa Nacional</p>
          <p class="text-white">LLaves de clasificación por definir.</p>
          <div class="w-full md:w-64 mx-auto mt-3 px-5">
            <app-btn routerLink="/copa-peru" [active]="false">Ir a Home</app-btn>
          </div>
        </div>
      } @else {
        <div class="flex justify-center mb-4">
          <div class="flex gap-0 md:gap-4 w-full xl:w-4/5 px-5 flex-wrap md:flex-nowrap duration-500">
            <app-btn class="w-full" (click)="setActiveTab('b16')" [active]="bracket16">16avos</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b8')" [active]="bracket8">Octavos</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b4')" [active]="bracket4">Cuartos</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b2')" [active]="bracket2">Semifinales</app-btn>
            <app-btn class="w-full" (click)="setActiveTab('b1')" [active]="bracket1">Final</app-btn>
          </div>
        </div>

        @if (bracket16) {
          <div class="w-full flex justify-center">
            <div class="w-full md:w-3/4 lg:w-full xl:w-3/4 duration-500">
              <div class="grid gap-8">
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Norte</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets16Norte; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Sur</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets16Sur; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        @if (bracket8) {
          <div class="w-full flex justify-center">
            <div class="w-full md:w-3/4 lg:w-full xl:w-3/4 duration-500">
              <div class="grid gap-8">
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Norte</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets8Norte; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Sur</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets8Sur; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        @if (bracket4) {
          <div class="w-full flex justify-center">
            <div class="w-full md:w-3/4 lg:w-full xl:w-3/4 duration-500">
              <div class="grid gap-8">
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Norte</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets4Norte; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Sur</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets4Sur; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        @if (bracket2) {
          <div class="w-full flex justify-center">
            <div class="w-full md:w-3/4 lg:w-full xl:w-3/4 duration-500">
              <div class="grid gap-8">
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Norte</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets2Norte; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
                <div>
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Sur</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    @for (bracket of dataBrackets2Sur; track $index) {
                      <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        @if (bracket1) {
          <div class="w-full flex justify-center">
            <div class="w-full md:w-3/4 lg:w-full xl:w-3/4 duration-500">
              <div class="flex flex-wrap lg:flex-nowrap gap-5">
                <div class="w-full">
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Norte</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  @for (bracket of dataBrackets1Norte; track $index) {
                    <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                  }
                </div>
                <div class="w-full">
                  <div class="w-fit mb-4">
                    <h1 class="text-3xl sm:text-4xl text-white font-bold">Zona <span class="text-crimson">Sur</span></h1>
                    <div class="bg-crimson skew-x-50 h-1.5 w-full mt-2"></div>
                  </div>
                  @for (bracket of dataBrackets1Sur; track $index) {
                    <app-bracket-card [bracket]="bracket" [dualMatch]="true"></app-bracket-card>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class CpBracketsComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private bracketsService: FetchBracketsService,
    private uiDataMapperService: UiDataMapperService,
  ) {}

  private divisionSubscription: Subscription | null = null;
  private teamsSubscription: Subscription | null = null;
  private bracketsSubscription: Subscription | null = null;
  dataTeams: TeamCPData[] = [];
  dataBrackets: BracketsData[] = [];
  dataBrackets16Norte: MatchCard[] = [];
  dataBrackets16Sur: MatchCard[] = [];
  dataBrackets8Norte: MatchCard[] = [];
  dataBrackets8Sur: MatchCard[] = [];
  dataBrackets4Norte: MatchCard[] = [];
  dataBrackets4Sur: MatchCard[] = [];
  dataBrackets2Norte: MatchCard[] = [];
  dataBrackets2Sur: MatchCard[] = [];
  dataBrackets1Norte: MatchCard[] = [];
  dataBrackets1Sur: MatchCard[] = [];

  bracket16: boolean = false;
  bracket8: boolean = false;
  bracket4: boolean = false;
  bracket2: boolean = false;
  bracket1: boolean = false;

  setActiveTab(tab: String) {
    this.bracket16 = tab === 'b16';
    this.bracket8 = tab === 'b8';
    this.bracket4 = tab === 'b4';
    this.bracket2 = tab === 'b2';
    this.bracket1 = tab === 'b1';
  }

  ngOnInit() {
    this.divisionSubscription = this.divisionService.dataDivisionCP$.subscribe({
      next: (data) => {
        this.bracket16 = data ? data?.brackets.bracket16.status : false;
        this.bracket8 = data ? data?.brackets.bracket8.status : false;
        this.bracket4 = data ? data?.brackets.bracket4.status : false;
        this.bracket2 = data ? data?.brackets.bracket2.status : false;
        this.bracket1 = data ? data?.brackets.bracket1.status : false;
      }
    });
    this.teamsSubscription = this.teamsService.dataTeamsCP$.subscribe({
      next: (data) => (this.dataTeams = data)
    });
    this.bracketsSubscription = this.bracketsService.dataBracketsCP$.subscribe({
      next: (data) => (this.dataBrackets = data)
    });

    if (this.dataTeams && this.dataBrackets && this.dataBrackets.length > 0) {
      const bracket1 = this.dataBrackets[0];
      const bracket2 = this.dataBrackets[1];
      if (
        bracket1.bracket16 && bracket1.bracket8 && bracket1.bracket4 && bracket1.bracket2 && bracket1.bracket1 &&
        bracket2.bracket16 && bracket2.bracket8 && bracket2.bracket4 && bracket2.bracket2 && bracket2.bracket1
      ) {
        this.dataBrackets16Norte = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket1.bracket16!);
        this.dataBrackets16Sur = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket2.bracket16);
        this.dataBrackets8Norte = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket1.bracket8);
        this.dataBrackets8Sur = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket2.bracket8);
        this.dataBrackets4Norte = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket1.bracket4);
        this.dataBrackets4Sur = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket2.bracket4);
        this.dataBrackets2Norte = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket1.bracket2);
        this.dataBrackets2Sur = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket2.bracket2);
        this.dataBrackets1Norte = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket1.bracket1);
        this.dataBrackets1Sur = this.uiDataMapperService.bracketCardMapper(this.dataTeams, bracket2.bracket1);
      }
    }
  }

  ngOnDestroy() {
    this.divisionSubscription?.unsubscribe();
    this.teamsSubscription?.unsubscribe();
    this.bracketsSubscription?.unsubscribe();
  }
}