import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FetchPageInformationService } from '../../../services/fetch-page-information.service';
import { LeagueInformation } from '../../../interfaces/api-models/league-information';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-league-page',
  imports: [FontAwesomeModule],
  templateUrl: './league-page.component.html',
  styles: `
    .image {
      background-image: url('/assets/images/pages/Background-pattern.png');
      background-size: cover;
    }
  `,
})
export class LeaguePageComponent {
  constructor(
    private route: ActivatedRoute,
    private fetchInformation: FetchPageInformationService,
    private router: Router
  ) {}

  private destroy$ = new Subject<void>();
  leagueId: string = '';
  leagueData: LeagueInformation | null = null;

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.leagueId = params['leagueId'];

      this.fetchInformation.fetchLeagueInformation(this.leagueId).subscribe({
        next: (response) => {
          this.leagueData = response;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        }
      });

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })
  };

  Flag = faFlag;
  Trophy = faTrophy;
  Location = faLocationDot;
}