import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamPageProfile } from '../interfaces/api-models/team-page-profile';
import { LeaguePageProfile } from '../interfaces/api-models/leaguePageProfile';

@Injectable({
  providedIn: 'root',
})
export class FetchPageProfileService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  fetchTeamProfile(teamId: string): Observable<TeamPageProfile> {
    return this.http.get<TeamPageProfile>(this.backendUrl + '/pageProfile/team/' + teamId);
  }

  fetchLeagueProfile(leagueId: string): Observable<LeaguePageProfile> {
    return this.http.get<LeaguePageProfile>(this.backendUrl + '/pageProfile/league/' + leagueId);
  }
}