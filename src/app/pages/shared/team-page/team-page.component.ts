import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faEllipsis, faFlag, faLink, faLocationDot, faRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FetchTeamInformationService } from '../../../services/fetch-team-information.service';

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule],
  templateUrl: './team-page.component.html',
  styles: `
    .image {
      background-image: url('/assets/images/pages/Background-pattern.png');
      background-size: cover;
    }
  `,
})
export class TeamPageComponent {
  constructor(private fetchTeamInformation: FetchTeamInformationService) {}

  teamData: {
    division: string;
    name: string;
    image: string;
    alt: string;
    location: string;
    foundation: number;
    background: string;
    website?: string;
    social?: {
      website?: string;
      youtube?: string;
      tiktok?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
    },
    stadium?: {
      name: string;
      capacity: number;
      location: string;
      image: string;
    }
  } | null = null;
  teamLastGames: string[] = [];
  statistics: { data: string, value: number }[] = [];

  ngOnInit() {
    this.teamData = this.fetchTeamInformation.fetchTeamInformation();
    this.teamLastGames = this.fetchTeamInformation.fetchTeamLastGames();
    this.statistics = this.fetchTeamInformation.fetchTeamStatistics();
  }

  Flag = faFlag;
  Location = faLocationDot;
  Stadium = faRing;
  Divider = faEllipsis;
  Users = faUsers;

  Web = faLink;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;
  Win = faCircleCheck;
  Draw = faCircleMinus;
  Lose = faCircleXmark;
  Default = faCircle;
}
