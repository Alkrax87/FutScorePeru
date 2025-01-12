import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { faShieldHalved, faWindowRestore, faBarsStaggered, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { TeamNav } from '../../../interfaces/team-nav';
import { ApiService } from '../../../services/api.service';
import { TeamData } from '../../../interfaces/team-data';

@Component({
  selector: 'app-l1-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  templateUrl: './l1-main.component.html',
  styleUrl: './l1-main.component.css',
})
export class L1MainComponent {
  constructor(private apiService: ApiService) {}

  navOptions = [
    { name: 'Clubes', route: 'equipos', icon: faShieldHalved },
    { name: 'Fixture', route: 'fixture', icon: faWindowRestore },
    { name: 'Tabla', route: 'tabla', icon: faBarsStaggered },
    { name: 'Técnicos', route: 'tecnicos', icon: faUserShield },
  ];

  data: TeamData[] = [];
  dataTeamsNav: TeamNav[] = [];

  ngOnInit() {
    this.apiService.fetchDataTeamsL1().subscribe({
      next: (response) => {
        this.data = response;
        this.getDataForNav();
      },
    });
  }

  getDataForNav() {
    const newData: TeamNav[] = this.data.map(({ image, alt, url }) => ({ image, alt, url }));
    this.dataTeamsNav = newData;
  }
}
