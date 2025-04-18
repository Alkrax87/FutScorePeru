import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cp-main',
  imports: [OptionsNavComponent, RouterOutlet],
  template: `
    <!-- <app-top-nav-teams [teams]="teams"></app-top-nav-teams> -->
    <div class="hidden md:block h-2 bg-crimson"></div>
    <app-options-nav [options]="navOptions"></app-options-nav>
    <div class="hidden md:block h-2 bg-crimson"></div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CpMainComponent {
  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
  ];
  teams: string[] = [
    'Team1',
    'Team2',
    'Team3',
    'Team4',
    'Team5',
    'Team6',
    'Team7',
    'Team8',
    'Team9',
    'Team10',
    'Team11',
    'Team12',
    'Team13',
    'Team14',
    'Team15',
    'Team16',
    'Team17',
    'Team18',
    'Team19',
    'Team20',
    'Team21',
    'Team22',
    'Team23',
    'Team24',
    'Team25',
  ];
}
