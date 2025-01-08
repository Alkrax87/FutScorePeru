import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-l3-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  templateUrl: './l3-main.component.html',
  styleUrl: './l3-main.component.css',
})
export class L3MainComponent {
  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
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
    'Team26',
    'Team27',
    'Team28',
    'Team29',
    'Team30',
    'Team31',
    'Team32',
    'Team33',
    'Team34',
    'Team35',
    'Team36',
  ];
}
