import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { Subscription } from 'rxjs';
import { TeamDataL1 } from '../../../interfaces/team-data-l1';
import { TeamNav } from '../../../interfaces/team-nav';

@Component({
  selector: 'app-l1-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  templateUrl: './l1-main.component.html',
  styleUrl: './l1-main.component.css',
})
export class L1MainComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  private teamSubscription: Subscription | null = null;
  dataTeams: TeamDataL1[] | null = null;
  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
  ];
  dataTeamsNav: TeamNav[] = [];

  ngOnInit() {
    this.teamsService.getDataLiga1();
    this.teamSubscription = this.teamsService.dataTeamsL1$.subscribe({
      next: (data) => {
        this.dataTeams = data;
        console.log(this.dataTeams);
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
