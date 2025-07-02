import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCircle, faCircleCheck, faCircleMinus, faCircleXmark, faEllipsis, faFlag, faLink, faLocationDot, faRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FetchPageInformationService } from '../../../services/fetch-page-information.service';
import { TeamInformation } from '../../../interfaces/api-models/team-information';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { BtnComponent } from "../../../components/btn/btn.component";
import { MatchesSetupService } from '../../../services/matches-setup.service';
import { TeamFixtureComponent } from "../../../components/team-fixture/team-fixture.component";
import { TitleComponent } from "../../../components/title/title.component";
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchResultsService } from '../../../services/fetch-results.service';
import { TeamData } from '../../../interfaces/api-models/team-data';
import { ResultsData } from '../../../interfaces/api-models/results-data';

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule, BtnComponent, TeamFixtureComponent, TitleComponent],
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
    private divisionService: FetchDivisionService,
    private teamService: FetchTeamDataService,
    private resultsService: FetchResultsService,
    private fetchTeamInformation: FetchPageInformationService,
    private transformDataService: MatchesSetupService,
    private router: Router
  ) {}

  private divisionSubscription: Subscription | null = null;
  private teamSubscription: Subscription | null = null;
  private resultsSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();
  teamId: string = "";
  category: number = 0;
  apertura: boolean = false;
  clausura: boolean = false;
  regional: boolean = false;
  grupos: boolean = false;
  final: boolean = false;
  teamData: TeamInformation | null = null;
  dataTeams: TeamData[] = [];
  dataResults: ResultsData[] = [];
  filteredFixtureStage: any;

  setActiveTab(tab: String) {
    this.apertura = tab === 'apertura';
    this.clausura = tab === 'clausura';
    this.regional = tab === 'regional';
    this.grupos = tab === 'grupos';
    this.final = tab === 'final';
  }

  get activeLastGames(): string | null {
    if (this.apertura) return 'apertura';
    if (this.clausura) return 'clausura';
    if (this.regional) return 'regional';
    if (this.grupos) return 'grupos';
    if (this.final) return 'final';
    return null;
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.teamId = params['teamId'];
      this.category = parseInt(params['category']);

      switch (this.category) {
        case 1:
          this.divisionSubscription = this.divisionService.dataDivisionL1$.subscribe({
            next: (data) => {
              this.apertura = data ? data.stages[0].status : false;
              this.clausura = data ? data.stages[1].status : false;
            }
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
            next: (data) => {
              this.regional = data ? data.stages[0].status : false;
              this.grupos = data ? data.stages[1].status : false;
            }
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
            next: (data) => {
              this.regional = data ? data.stages[0].status : false;
              this.final = data ? data.stages[1].status : false;
            }
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
    this.divisionSubscription?.unsubscribe();
    this.teamSubscription?.unsubscribe();
    this.resultsSubscription?.unsubscribe();
  }
}