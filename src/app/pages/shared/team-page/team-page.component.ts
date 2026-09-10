import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEllipsis, faFlag, faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { FetchPageProfileService } from '../../../services/fetch-page-profile.service';
import { TeamPageProfile } from '../../../interfaces/api-models/teamPageProfile';
import { ViewportScroller } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FetchTeamsMatchResultsService } from '../../../services/fetch-teams-match-results.service';

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './team-page.component.html',
  styles: `
    *::-webkit-scrollbar {
      display: none;
    }
  `,
})
export class TeamPageComponent {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private fetchPageProfile = inject(FetchPageProfileService);
  private title = inject(Title);
  private teamsMatchResultsService = inject(FetchTeamsMatchResultsService);
  private viewPortScoller = inject(ViewportScroller);

  team: TeamPageProfile | null = null;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe({
      next: (params) => this.fetchPageProfile.fetchTeamProfile(params.get('teamId')!)
    });
  }

  ngOnInit() {
    this.fetchPageProfile.team$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response) {
          this.team = response;
          this.title.setTitle('Liga ' + response.teamData.category + ' | ' + response.teamData.name);

          switch (response.teamData.category) {
            case 1:
              this.teamsMatchResultsService.fetchTeamsMatchResultsL1();
              break;
            case 2:
              this.teamsMatchResultsService.fetchTeamsMatchResultsL2();
              break;
            case 3:
              this.teamsMatchResultsService.fetchTeamsMatchResultsL3();
              break;
            default:
              return;
          }
        }

        if (typeof window !== 'undefined') {
          this.viewPortScoller.scrollToPosition([0, 0]);
        }
      },
    });
  }

  Flag = faFlag;
  Location = faLocationDot;
  Divider = faEllipsis;
  Web = faGlobe;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;

  options = [
    { name: 'General', section: 'overview' },
    { name: 'Fixture', section: 'fixture' },
    { name: 'Estadio', section: 'stadium' },
  ];
}