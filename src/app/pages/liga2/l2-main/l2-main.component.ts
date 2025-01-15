import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';

@Component({
  selector: 'app-l2-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  templateUrl: './l2-main.component.html',
  styleUrl: './l2-main.component.css',
})
export class L2MainComponent {
  constructor(private teamsService: FetchTeamDataService) {}

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
  ];

  ngOnInit() {
    this.teamsService.getDataLiga2();
  }
}
