import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavItemsComponent } from '../../../components/top-nav-teams/top-nav-items.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { faFlag, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { ItemNav } from '../../../interfaces/ui-models/item-nav';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cp-main',
  imports: [OptionsNavComponent, RouterOutlet, TopNavItemsComponent],
  template: `
    <app-top-nav-items [items]="dataTeamsNav"></app-top-nav-items>
    <app-options-nav [options]="navOptions" [division]="'Copa Perú'"></app-options-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CpMainComponent {
  constructor(
    private leaguesService: FetchLeaguesService,
    private divisionService: FetchDivisionService,
    private mapService: FetchMapService,
    private uiDataMapper: UiDataMapperService
  ) {}

  private leaguesSubscription: Subscription | null = null;
  dataTeamsNav: ItemNav[] = [];
  navOptions = [
    { name: 'Ligas', route: 'equipos', icon: faFlag },
    { name: 'Brackets', route: 'brackets', icon: faSitemap },
  ];

  ngOnInit() {
    this.leaguesService.fetchLeagues();
    this.divisionService.fetchDivisionCP();
    this.mapService.fetchMapCP();
    this.leaguesSubscription = this.leaguesService.dataLeagues$.subscribe({
      next: (data) => {
        this.dataTeamsNav = this.uiDataMapper.leagueNavMapper(data);
      }
    });
  }

  ngOnDestroy() {
    this.leaguesSubscription?.unsubscribe();
  }
}