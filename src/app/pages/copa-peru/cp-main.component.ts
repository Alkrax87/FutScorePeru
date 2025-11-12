import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchTeamDataService } from '../../services/fetch-team-data.service';
import { FetchLeaguesService } from '../../services/fetch-leagues.service';
import { FetchDivisionService } from '../../services/fetch-division.service';
import { FetchMapService } from '../../services/fetch-map.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
import { faFlag, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { EntityNav } from '../../interfaces/ui-models/entity-nav';
import { FetchBracketsService } from '../../services/fetch-brackets.service';

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
  constructor(
    private teamsService: FetchTeamDataService,
    private leaguesService: FetchLeaguesService,
    private divisionService: FetchDivisionService,
    private bracketsService: FetchBracketsService,
    private mapService: FetchMapService,
    private uiDataMapper: UiDataMapperService
  ) {}

  private leaguesSubscription: Subscription | null = null;
  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Ligas', route: 'ligas', icon: faFlag },
    { name: 'Brackets', route: 'brackets', icon: faSitemap },
  ];

  ngOnInit() {
    this.teamsService.fetchTeamsCP();
    this.leaguesService.fetchLeagues();
    this.divisionService.fetchDivisionCP();
    this.bracketsService.fetchBracketsCP();
    this.mapService.fetchMapCP();
    this.leaguesSubscription = this.leaguesService.dataLeagues$.subscribe({
      next: (data) => {
        this.navEntities = this.uiDataMapper.leagueNavMapper(data);
      }
    });
  }

  ngOnDestroy() {
    this.leaguesSubscription?.unsubscribe();
  }
}