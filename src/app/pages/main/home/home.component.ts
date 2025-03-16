import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { TeamsCarouselComponent } from '../../../components/teams-carousel/teams-carousel.component';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { combineLatest, Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, RouterModule, TeamsCarouselComponent, TitleComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  constructor(private teamsService: FetchTeamDataService) {
    teamsService.fetchTeamsL1();
    teamsService.fetchTeamsL2();
    teamsService.fetchTeamsL3();
  }

  teamsSubscription: Subscription | null = null;
  teamsL1: { abbreviation: string, image: string, alt: string, url: string, color: { c1: string, c2?:string } }[] = [];
  teamsL2: { abbreviation: string, image: string, alt: string, url: string, color: { c1: string, c2?:string } }[] = [];
  teamsL3: { abbreviation: string, image: string, alt: string, url: string, color: { c1: string, c2?:string } }[] = [];

  ngOnInit() {
    this.teamsSubscription = combineLatest([
      this.teamsService.dataTeamsL1$,
      this.teamsService.dataTeamsL2$,
      this.teamsService.dataTeamsL3$,
    ]).subscribe(([dataL1, dataL2, dataL3]) => {
      this.teamsL1 = dataL1.map(element => ({
        abbreviation: element.abbreviation,
        image: element.image,
        alt: element.alt,
        url: element.url,
        color: element.color
      }));

      this.teamsL2 = dataL2.map(element => ({
        abbreviation: element.abbreviation,
        image: element.image,
        alt: element.alt,
        url: element.url,
        color: element.color
      }));

      this.teamsL3 = dataL3.map(element => ({
        abbreviation: element.abbreviation,
        image: element.image,
        alt: element.alt,
        url: element.url,
        color: element.color
      }));
    })
  }

  divisions: {
    title: string;
    image: string;
    teams: number;
    routes: string;
  }[] = [
    {
      title: 'Liga 1',
      image: 'assets/images/pages/liga-1.webp',
      teams: 19,
      routes: '/liga1',
    },
    {
      title: 'Liga 2',
      image: 'assets/images/pages/liga-2.webp',
      teams: 15,
      routes: '/liga2',
    },
    {
      title: 'Liga 3',
      image: 'assets/images/pages/liga-3.webp',
      teams: 37,
      routes: '/liga3',
    },
    {
      title: 'Copa Perú',
      image: 'assets/images/pages/copa-peru.webp',
      teams: 50,
      routes: '/copa-peru',
    },
  ];

  Shield = faShieldHalved;
  Arrow = faAngleRight;

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
  }
}