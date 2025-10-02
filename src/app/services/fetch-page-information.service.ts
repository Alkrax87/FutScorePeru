import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamInformation } from '../interfaces/api-models/team-information';
import { LeagueInformation } from '../interfaces/api-models/league-information';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchPageInformationService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  fetchTeamInformation(teamId: string): Observable<TeamInformation> {
    return this.http.get<TeamInformation>(this.backendUrl + '/information/club/' + teamId);
  }

  fetchLeagueInformation(leagueId: string): Observable<LeagueInformation> {
    return this.http.get<LeagueInformation>(this.backendUrl + '/information/league/' + leagueId);
  }
}