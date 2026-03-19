import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TeamPageProfile } from '../interfaces/api-models/teamPageProfile';
import { LeaguePageProfile } from '../interfaces/api-models/leaguePageProfile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FetchPageProfileService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);
  private router = inject(Router);

  private teamSubject = new BehaviorSubject<TeamPageProfile | null>(null);

  team$ = this.teamSubject.asObservable();

  fetchTeamProfile(teamId: string) {
    this.http.get<TeamPageProfile>(this.backendUrl + '/pageProfile/team/' + teamId).subscribe({
      next: (response) => (this.teamSubject.next(response)),
      error: (error) => {
        console.error('Failed to fetch Team Profile ', error);
        this.router.navigate(['/not-found']);
      },
    });
  }

  fetchLeagueProfile(leagueId: string): Observable<LeaguePageProfile> {
    return this.http.get<LeaguePageProfile>(this.backendUrl + '/pageProfile/league/' + leagueId);
  }
}