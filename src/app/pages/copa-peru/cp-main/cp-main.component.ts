import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavTeamsComponent } from '../../../components/top-nav-teams/top-nav-teams.component';
import { OptionsNavComponent } from '../../../components/options-nav/options-nav.component';
import { faFlag, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { TeamNav } from '../../../interfaces/ui-models/team-nav';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchMapService } from '../../../services/fetch-map.service';

@Component({
  selector: 'app-cp-main',
  imports: [OptionsNavComponent, RouterOutlet, TopNavTeamsComponent],
  template: `
    <app-top-nav-teams [teams]="dataTeamsNav"></app-top-nav-teams>
    <app-options-nav [options]="navOptions" [division]="'Copa Perú'"></app-options-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class CpMainComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private mapService: FetchMapService,
  ) {}

  dataTeamsNav: TeamNav[] = [
    {
      category: 4,
      teamId: 'LD1',
      imageThumbnail: 'assets/images/copa-peru/flags/amazonas-logo.webp',
      alt: 'LD1-logo',
    },
    {
      category: 4,
      teamId: 'LD2',
      imageThumbnail: 'assets/images/copa-peru/flags/ancash-logo.webp',
      alt: 'LD2-logo',
    },
    {
      category: 4,
      teamId: 'LD3',
      imageThumbnail: 'assets/images/copa-peru/flags/apurimac-logo.webp',
      alt: 'LD3-logo',
    },
    {
      category: 4,
      teamId: 'LD4',
      imageThumbnail: 'assets/images/copa-peru/flags/arequipa-logo.webp',
      alt: 'LD4-logo',
    },
    {
      category: 4,
      teamId: 'LD5',
      imageThumbnail: 'assets/images/copa-peru/flags/ayacucho-logo.webp',
      alt: 'LD5-logo',
    },
    {
      category: 4,
      teamId: 'LD6',
      imageThumbnail: 'assets/images/copa-peru/flags/cajamarca-logo.webp',
      alt: 'LD6-logo',
    },
    {
      category: 4,
      teamId: 'LD7',
      imageThumbnail: 'assets/images/copa-peru/flags/callao-logo.webp',
      alt: 'LD7-logo',
    },
    {
      category: 4,
      teamId: 'LD8',
      imageThumbnail: 'assets/images/copa-peru/flags/cusco-logo.webp',
      alt: 'LD8-logo',
    },
    {
      category: 4,
      teamId: 'LD9',
      imageThumbnail: 'assets/images/copa-peru/flags/huancavelica-logo.webp',
      alt: 'LD9-logo',
    },
    {
      category: 4,
      teamId: 'LD10',
      imageThumbnail: 'assets/images/copa-peru/flags/huanuco-logo.webp',
      alt: 'LD10-logo',
    },
    {
      category: 4,
      teamId: 'LD11',
      imageThumbnail: 'assets/images/copa-peru/flags/ica-logo.webp',
      alt: 'LD11-logo',
    },
    {
      category: 4,
      teamId: 'LD12',
      imageThumbnail: 'assets/images/copa-peru/flags/junin-logo.webp',
      alt: 'LD12-logo',
    },
    {
      category: 4,
      teamId: 'LD13',
      imageThumbnail: 'assets/images/copa-peru/flags/la_libertad-logo.webp',
      alt: 'LD13-logo',
    },
    {
      category: 4,
      teamId: 'LD14',
      imageThumbnail: 'assets/images/copa-peru/flags/lambayeque-logo.webp',
      alt: 'LD14-logo',
    },
    {
      category: 4,
      teamId: 'LD15',
      imageThumbnail: 'assets/images/copa-peru/flags/lima-logo.webp',
      alt: 'LD15-logo',
    },
    {
      category: 4,
      teamId: 'LD16',
      imageThumbnail: 'assets/images/copa-peru/flags/loreto-logo.webp',
      alt: 'LD16-logo',
    },
    {
      category: 4,
      teamId: 'LD17',
      imageThumbnail: 'assets/images/copa-peru/flags/madre_de_dios-logo.webp',
      alt: 'LD17-logo',
    },
    {
      category: 4,
      teamId: 'LD18',
      imageThumbnail: 'assets/images/copa-peru/flags/moquegua-logo.webp',
      alt: 'LD18-logo',
    },
    {
      category: 4,
      teamId: 'LD19',
      imageThumbnail: 'assets/images/copa-peru/flags/pasco-logo.webp',
      alt: 'LD19-logo',
    },
    {
      category: 4,
      teamId: 'LD20',
      imageThumbnail: 'assets/images/copa-peru/flags/piura-logo.webp',
      alt: 'LD20-logo',
    },
    {
      category: 4,
      teamId: 'LD21',
      imageThumbnail: 'assets/images/copa-peru/flags/puno-logo.webp',
      alt: 'LD21-logo',
    },
    {
      category: 4,
      teamId: 'LD22',
      imageThumbnail: 'assets/images/copa-peru/flags/san_martin-logo.webp',
      alt: 'LD22-logo',
    },
    {
      category: 4,
      teamId: 'LD23',
      imageThumbnail: 'assets/images/copa-peru/flags/tacna-logo.webp',
      alt: 'LD23-logo',
    },
    {
      category: 4,
      teamId: 'LD24',
      imageThumbnail: 'assets/images/copa-peru/flags/tumbes-logo.webp',
      alt: 'LD24-logo',
    },
    {
      category: 4,
      teamId: 'LD25',
      imageThumbnail: 'assets/images/copa-peru/flags/ucayali-logo.webp',
      alt: 'LD25-logo',
    },
  ];
  navOptions = [
    { name: 'Ligas', route: 'equipos', icon: faFlag },
    { name: 'Brackets', route: 'brackets', icon: faSitemap },
  ];

  ngOnInit() {
    this.divisionService.fetchDivisionCP();
    this.mapService.fetchMapCP();
  }
}