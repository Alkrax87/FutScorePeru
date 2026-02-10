import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faFlag, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FetchLeaguesService } from '../../services/fetch-leagues.service';
import { FetchTeamsCPService } from '../../services/fetch-teams-cp.service';
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { FetchMapService } from '../../services/fetch-map.service';
import { FetchBracketsService } from '../../services/fetch-brackets.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
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
  private leaguesService = inject(FetchLeaguesService);
  private teamsCPService = inject(FetchTeamsCPService);
  private divisionsService = inject(FetchDivisionsService);
  private mapService = inject(FetchMapService);
  private bracketsService = inject(FetchBracketsService);
  private uiDataMapperService = inject(UiDataMapperService);

  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Ligas', route: 'ligas', icon: faFlag },
    { name: 'Brackets', route: 'brackets', icon: faSitemap },
  ];

  constructor() {
    this.leaguesService.leagues$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => this.navEntities = this.uiDataMapperService.leagueNavMapper(data)
    });
  }

  ngOnInit() {
    this.leaguesService.fetchLeagues();
    this.teamsCPService.fetchTeamsCP();
    this.divisionsService.fetchDivisionCP();
    this.mapService.fetchMapCP();
    this.bracketsService.fetchBracketsCP();
  }
}