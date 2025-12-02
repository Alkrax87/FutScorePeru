import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FetchPageInformationService } from '../../../services/fetch-page-information.service';
import { LeagueInformation } from '../../../interfaces/api-models/league-information';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-league-page',
  imports: [FontAwesomeModule],
  templateUrl: './league-page.component.html',
  styles: ``,
})
export class LeaguePageComponent {
  constructor(
    private route: ActivatedRoute,
    private fetchInformation: FetchPageInformationService,
    private router: Router,
    private title: Title
  ) {}

  private destroy$ = new Subject<void>();
  leagueId: string = '';
  leagueData: LeagueInformation | null = null;

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.leagueId = params['leagueId'];

      this.fetchInformation.fetchLeagueInformation(this.leagueId).subscribe({
        next: (response) => {
          this.leagueData = response;
          this.title.setTitle('Copa Perú | ' + response.location);
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  Flag = faFlag;
  Trophy = faTrophy;
  Location = faLocationDot;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}