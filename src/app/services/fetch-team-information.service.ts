import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamInformation } from '../interfaces/api-models/team-information';
import { Environments } from '../environment/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamInformationService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  fetchTeamInformation(teamId: string): Observable<TeamInformation> {
    return this.http.get<TeamInformation>(this.backendUrl + '/information/' + teamId);
  }
}