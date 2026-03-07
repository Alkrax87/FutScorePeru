import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FetchTeamsService } from '../../services/fetch-teams.service';
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { UiDataMapperService } from '../../services/ui-data-mapper.service';
import { EntityNavBarComponent } from '../../components/entity-nav-bar/entity-nav-bar.component';
import { SectionSubnavComponent } from '../../components/section-subnav/section-subnav.component';
import { EntityNav } from '../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-l2-main',
  imports: [EntityNavBarComponent, SectionSubnavComponent, RouterOutlet],
  template: `
    <app-entity-nav-bar [entities]="navEntities"></app-entity-nav-bar>
    <app-section-subnav [routes]="navRoutes" [division]="'Liga 2'"></app-section-subnav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L2MainComponent {
  private teamsService = inject(FetchTeamsService);
  private divisionsService = inject(FetchDivisionsService);
  private uiDataMapperService = inject(UiDataMapperService);

  navEntities: EntityNav[] = [];
  navRoutes = [
    { name: 'Clubes', route: 'clubes', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
    { name: 'Estadísticas', route: 'estadisticas', icon: faRankingStar },
  ];

  constructor() {
    this.teamsService.fetchTeamsL2();
    this.divisionsService.fetchDivisionL2();

    this.teamsService.teamsL2$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.navEntities = this.uiDataMapperService.teamsNavMapper(data)),
    });
  }
}