import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchLeaguesService } from '../../../services/fetch-leagues.service';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { Subscription } from 'rxjs';
import { EntityNavBarComponent } from '../../../components/entity-nav-bar/entity-nav-bar.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { faFlag, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { EntityNav } from '../../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-cp-main',
  imports: [EntityNavBarComponent, OptionsNavComponent, RouterOutlet],
  template: `
    <app-entity-nav-bar [entities]="navEntities" [leaguesBar]="true"></app-entity-nav-bar>
    <app-options-nav [routes]="navRoutes" [division]="'Copa Perú'"></app-options-nav>
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
  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Ligas', route: 'equipos', icon: faFlag },
    { name: 'Brackets', route: 'brackets', icon: faSitemap },
  ];

  ngOnInit() {
    this.leaguesService.fetchLeagues();
    this.divisionService.fetchDivisionCP();
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