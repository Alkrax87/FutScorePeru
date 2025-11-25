import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchTeamDataService } from '../../services/fetch-team-data.service';
import { FetchLeaguesService } from '../../services/fetch-leagues.service';
import { FetchDivisionService } from '../../services/fetch-division.service';
import { FetchMapService } from '../../services/fetch-map.service';
import { FetchBracketsService } from '../../services/fetch-brackets.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
import { faFlag, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { EntityNav } from '../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-cp-main',
  imports: [EntityNavBarComponent, SectionSubnavComponent, RouterOutlet],
  template: `
    <app-entity-nav-bar [entities]="navEntities" [leaguesBar]="true"></app-entity-nav-bar>
    <app-section-subnav [routes]="navRoutes" [division]="'Copa Perú'"></app-section-subnav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CpMainComponent {
  private teamsService = inject(FetchTeamDataService);
  private leaguesService = inject(FetchLeaguesService);
  private divisionService = inject(FetchDivisionService);
  private mapService = inject(FetchMapService);
  private bracketsService = inject(FetchBracketsService);
  private uiDataMapperService = inject(UiDataMapperService);

  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Ligas', route: 'ligas', icon: faFlag },
    { name: 'Brackets', route: 'brackets', icon: faSitemap },
  ];

  constructor() {
    this.leaguesService.dataLeagues$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => this.navEntities = this.uiDataMapperService.leagueNavMapper(data)
    });
  }

  ngOnInit() {
    this.teamsService.fetchTeamsCP();
    this.leaguesService.fetchLeagues();
    this.divisionService.fetchDivisionCP();
    this.bracketsService.fetchBracketsCP();
    this.mapService.fetchMapCP();
  }
}