import { Component } from '@angular/core';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { RouterOutlet } from '@angular/router';
import { ClipboardPenLine, ChartNoAxesGantt, Dice6, Shield } from 'lucide-angular';

@Component({
  selector: 'app-l1-main',
  imports: [TopNavTeamsComponent, OptionsNavComponent, RouterOutlet],
  templateUrl: './l1-main.component.html',
  styleUrl: './l1-main.component.css',
})
export class L1MainComponent {
  navOptions = [
    { name: 'Clubes', route: 'equipos', lucideIcon: Shield },
    { name: 'Fixture', route: 'fixture', lucideIcon: Dice6 },
    { name: 'Tabla', route: 'tabla', lucideIcon: ChartNoAxesGantt },
    { name: 'Técnicos', route: 'tecnicos', lucideIcon: ClipboardPenLine },
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
  ];
}
