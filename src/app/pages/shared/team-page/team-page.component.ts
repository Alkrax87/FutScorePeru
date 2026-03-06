import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEllipsis, faFlag, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { FetchPageProfileService } from '../../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeamPageProfile } from '../../../interfaces/api-models/teamPageProfile';
import { switchMap } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { OverviewComponent } from "./overview/overview.component";
import { StadiumComponent } from "./stadium/stadium.component";
import { ClubComponent } from "./club/club.component";

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, OverviewComponent, StadiumComponent, ClubComponent],
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
  private router = inject(Router);
  private viewPortScoller = inject(ViewportScroller);

  teamId: string = "";
  category: number = 0;
  team: TeamPageProfile | null = null;

  ngOnInit() {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        this.teamId = params['teamId'];
        this.category = parseInt(params['category']);

        return this.fetchPageProfile.fetchTeamProfile(this.teamId);
      })
    ).subscribe({
      next: (response) => {
        this.team = response;
        this.title.setTitle('Liga' + response.teamData.category + ' | ' + response.teamData.name);

        if (typeof window !== 'undefined') {
          this.viewPortScoller.scrollToPosition([0, 0]);
        }
      },
      error: () => this.router.navigate(['/not-found'])
    });
  }

  Flag = faFlag;
  Location = faLocationDot;
  Divider = faEllipsis;
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Youtube = faYoutube;
  Tiktok = faTiktok;

  options = [
    { name: 'General', section: 'overview' },
    { name: 'Estadio', section: 'stadium' },
  ];

  overview: boolean = true;
  stadium: boolean = false;

  setActiveSection(tab: String) {
    this.overview = tab === 'overview';
    this.stadium = tab === 'stadium';
  }
}