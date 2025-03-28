import { Component } from '@angular/core';
import { TeamsCarouselComponent } from '../../../components/teams-carousel/teams-carousel.component';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { combineLatest, Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { LeagueCardComponent } from "../../../components/league-card/league-card.component";
import { TeamCarousel } from '../../../interfaces/ui-models/team-carousel';

@Component({
  selector: 'app-home',
  imports: [TeamsCarouselComponent, TitleComponent, LeagueCardComponent],
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
  teamsL1: TeamCarousel[] = [];
  teamsL2: TeamCarousel[] = [];
  teamsL3: TeamCarousel[] = [];

  ngOnInit() {
    this.teamsSubscription = combineLatest([
      this.teamsService.dataTeamsL1$,
      this.teamsService.dataTeamsL2$,
      this.teamsService.dataTeamsL3$,
    ]).subscribe(([dataL1, dataL2, dataL3]) => {
      this.teamsL1 = dataL1.map(element => ({
        teamId: element.teamId,
        image: element.image,
        alt: element.alt,
        abbreviation: element.abbreviation,
      }));

      this.teamsL2 = dataL2.map(element => ({
        teamId: element.teamId,
        image: element.image,
        alt: element.alt,
        abbreviation: element.abbreviation,
      }));

      this.teamsL3 = dataL3.map(element => ({
        teamId: element.teamId,
        image: element.image,
        alt: element.alt,
        abbreviation: element.abbreviation,
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

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
  }
}