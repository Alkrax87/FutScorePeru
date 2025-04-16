import { Component } from '@angular/core';
import { TeamsCarouselComponent } from '../../../components/teams-carousel/teams-carousel.component';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { combineLatest, Subscription } from 'rxjs';
import { TitleComponent } from "../../../components/title/title.component";
import { LeagueCardComponent } from "../../../components/league-card/league-card.component";
import { TeamCarousel } from '../../../interfaces/ui-models/team-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from "../../../components/btn/btn.component";

@Component({
  selector: 'app-home',
  imports: [TeamsCarouselComponent, TitleComponent, LeagueCardComponent, FontAwesomeModule, BtnComponent],
  templateUrl: './home.component.html',
  styles: `
    .bg {
      background-image: radial-gradient(#dc143c 2px, transparent 2px);
      background-size: 49px 49px;
    }
  `,
})
export class HomeComponent {
  constructor(private teamsService: FetchTeamDataService) {}

  teamsSubscription: Subscription | null = null;
  teamsL1: TeamCarousel[] = [];
  teamsL2: TeamCarousel[] = [];
  teamsL3: TeamCarousel[] = [];

  Check = faCheck;

  ngOnInit() {
    this.teamsService.fetchTeamsL1();
    this.teamsService.fetchTeamsL2();
    this.teamsService.fetchTeamsL3();
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

  scrollTo() {
    const element = document.getElementById('leagues');

    if (element) {
      element.scrollIntoView();
    }
  }

  ngOnDestroy() {
    this.teamsSubscription?.unsubscribe();
  }
}