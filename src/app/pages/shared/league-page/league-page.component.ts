import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { FetchPageProfileService } from '../../../services/fetch-page-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeaguePageProfile } from '../../../interfaces/api-models/leaguePageProfile';
import { switchMap } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-league-page',
  imports: [FontAwesomeModule],
  templateUrl: './league-page.component.html',
  styles: ``,
})
export class LeaguePageComponent {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private fetchPageProfile = inject(FetchPageProfileService);
  private title = inject(Title);
  private router = inject(Router);
  private viewPortScoller = inject(ViewportScroller);

  leagueId: string = '';
  league: LeaguePageProfile | null = null;

  ngOnInit() {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params) => {
        this.leagueId = params['leagueId'];
        return this.fetchPageProfile.fetchLeagueProfile(this.leagueId);
      })
    ).subscribe({
      next: (response) => {
        this.league = response;
        this.title.setTitle('Copa Perú | ' + response.leagueData.location);

        if (typeof window !== 'undefined') {
          this.viewPortScoller.scrollToPosition([0, 0]);
        }
      },
      error: () => this.router.navigate(['/not-found'])
    });
  }

  Flag = faFlag;
  Trophy = faTrophy;
  Location = faLocationDot;
}