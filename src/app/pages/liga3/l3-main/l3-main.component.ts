import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL3 } from '../../../interfaces/team-data-l3';
import { TeamNav } from '../../../interfaces/team-nav';

@Component({
  selector: 'app-l3-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  template: `
    <app-top-nav-teams [teams]="dataTeamsNav"></app-top-nav-teams>
    <div class="h-2 bg-crimson"></div>
    <app-options-nav [options]="navOptions"></app-options-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class L3MainComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL3[] | null = null;
  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
  ];
  dataTeamsNav: TeamNav[] = [];

  ngOnInit() {
    this.teamsService.getDataLiga3();
    this.teamSubscription = this.teamsService.dataTeamsL3$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
        this.getDataForNav();
      }
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
