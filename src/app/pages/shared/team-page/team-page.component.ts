import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEllipsis, faFlag, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FetchPageInformationService } from '../../../services/fetch-page-information.service';
import { TeamInformation } from '../../../interfaces/api-models/team-information';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ResultsData } from '../../../interfaces/api-models/results-data';
import { Title } from '@angular/platform-browser';
import { OverviewComponent } from "./overview/overview.component";
import { ResultsComponent } from "./results/results.component";
import { StadiumComponent } from "./stadium/stadium.component";
import { ClubComponent } from "./club/club.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, OverviewComponent, ResultsComponent, StadiumComponent, ClubComponent],
  templateUrl: './team-page.component.html',
  styles: `
    *::-webkit-scrollbar {
      display: none;
    }
  `,
})
export class TeamPageComponent {
  constructor(
    private route: ActivatedRoute,
    private divisionService: FetchDivisionService,
    private teamService: FetchTeamDataService,
    private resultsService: FetchResultsService,
    private fetchTeamInformation: FetchPageInformationService,
    private transformDataService: MatchesSetupService,
    private router: Router,
    private title: Title
  ) {}

  private divisionSubscription: Subscription | null = null;
  private teamSubscription: Subscription | null = null;
  private resultsSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();

  teamId: string = "";
  category: number = 0;
  division: DivisionData | null = null;
  teamData: TeamInformation | null = null;
  dataTeams: TeamData[] = [];
  dataResults: ResultsData[] = [];
  filteredFixtureStage: any;

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.teamId = params['teamId'];
      this.category = parseInt(params['category']);

      switch (this.category) {
        case 1:
          this.divisionSubscription = this.divisionService.dataDivisionL1$.subscribe({
            next: (data) => (this.division = data)
          });
          this.teamSubscription = this.teamService.dataTeamsL1$.subscribe({
            next: (data) => (this.dataTeams = data)
          });
          this.resultsSubscription = this.resultsService.dataResultsL1$.subscribe({
            next: (data) => (this.dataResults = data)
          });
          break;
        case 2:
          this.divisionSubscription = this.divisionService.dataDivisionL2$.subscribe({
            next: (data) => (this.division = data)
          });
          this.teamSubscription = this.teamService.dataTeamsL2$.subscribe({
            next: (data) => (this.dataTeams = data)
          });
          this.resultsSubscription = this.resultsService.dataResultsL2$.subscribe({
            next: (data) => (this.dataResults = data)
          });
          break;
        case 3:
          this.divisionSubscription = this.divisionService.dataDivisionL3$.subscribe({
            next: (data) => (this.division = data)
          });
          this.teamSubscription = this.teamService.dataTeamsL3$.subscribe({
            next: (data) => (this.dataTeams = data)
          });
          this.resultsSubscription = this.resultsService.dataResultsL3$.subscribe({
            next: (data) => (this.dataResults = data)
          });
          break;
        default:
          break;
      }

      this.fetchTeamInformation.fetchTeamInformation(this.teamId).subscribe({
        next: (response) => {
          this.teamData = response;
          this.filteredFixtureStage = this.transformDataService.transformDataForTeamFixture(
            this.category,
            this.dataTeams,
            response.fixture,
            this.dataResults
          );
          this.title.setTitle(response.division + ' | ' + response.name);
        },
        error: () => {
          this.router.navigate(['/not-found']);
        }
      });

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
    { name: 'Resultados', section: 'results' },
    { name: 'Estadio', section: 'stadium' },
    { name: 'Club', section: 'club' },
  ];

  overview: boolean = true;
  results: boolean = false;
  stadium: boolean = false;
  club: boolean = false;

  setActiveSection(tab: String) {
    this.overview = tab === 'overview';
    this.results = tab === 'results';
    this.stadium = tab === 'stadium';
    this.club = tab === 'club';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.divisionSubscription?.unsubscribe();
    this.teamSubscription?.unsubscribe();
    this.resultsSubscription?.unsubscribe();
  }
}