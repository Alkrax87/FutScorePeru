import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFlag, faLocationDot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { LeagueInformation } from '../../../interfaces/api-models/league-information';
import { FetchPageInformationService } from '../../../services/fetch-page-information.service';
import { ActivatedRoute } from '@angular/router';
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
    private fetchInformation: FetchPageInformationService
  ) {}

  private destroy$ = new Subject<void>();
  leagueId: string = '';
  data: LeagueInformation | null = null;

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.leagueId = params['leagueId'];

      this.fetchInformation.fetchLeagueInformation(this.leagueId).subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (error) => console.log('Error fetching league information:', error)
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