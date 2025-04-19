import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faEllipsis, faFlag, faLink, faLocationDot, faRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FetchTeamInformationService } from '../../../services/fetch-team-information.service';
import { FixtureData } from '../../../interfaces/api-models/fixture-data';
import { TeamInformation } from '../../../interfaces/api-models/team-information';
import { Subject, takeUntil } from 'rxjs';

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
  constructor(
    private route: ActivatedRoute,
    private fetchTeamInformation: FetchTeamInformationService,
  ) {}

  private destroy$ = new Subject<void>();
  teamId: string = "";

  teamData: TeamInformation | null = null;

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.teamId = params['teamId'];
      this.fetchTeamInformation.fetchTeamInformation(this.teamId).subscribe({
        next: (response) => (this.teamData = response),
        error: (error) => console.log('Failed to fetch Team Information ', error)
      });
    });
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}