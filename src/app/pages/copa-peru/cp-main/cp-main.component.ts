import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { ChartNoAxesGantt, Dice6, Shield } from 'lucide-angular';

@Component({
  selector: 'app-cp-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  templateUrl: './cp-main.component.html',
  styleUrl: './cp-main.component.css',
})
export class CpMainComponent {
  navOptions = [
    { name: 'Clubes', route: 'equipos', lucideIcon: Shield },
    { name: 'Fixture', route: 'fixture', lucideIcon: Dice6 },
    { name: 'Tabla', route: 'tabla', lucideIcon: ChartNoAxesGantt },
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
