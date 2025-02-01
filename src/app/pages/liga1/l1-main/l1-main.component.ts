import { Component } from '@angular/core';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchStatisticsService } from '../../../services/fetch-statistics.service';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { TeamDataL1 } from '../../../interfaces/api-models/team-data-l1';
import { TeamNav } from '../../../interfaces/ui-models/team-nav';

@Component({
  selector: 'app-l1-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  template: `
    <app-top-nav-teams [teams]="dataTeamsNav"></app-top-nav-teams>
    <div class="hidden md:block h-2 bg-crimson"></div>
    <app-options-nav [options]="navOptions" [division]="division"></app-options-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L1MainComponent {
  constructor(
    private teamsService: FetchTeamDataService,
    private statisticsService: FetchStatisticsService
  ) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
  ];
  dataTeamsNav: TeamNav[] = [];
  division: string = "Liga 1";

  ngOnInit() {
    this.teamsService.getDataLiga1();
    this.statisticsService.getStatisticsL1();
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        this.getDataForNav();
      },
    });
  }

  getDataForNav() {
    const newData: TeamNav[] = this.dataTeams ? this.dataTeams.map(({ imageThumbnail, alt, url }) => ({ imageThumbnail, alt, url })) : [];
    this.dataTeamsNav = newData;
  }

  ngOnDestroy() {
    this.teamSubscription?.unsubscribe();
  }
}
