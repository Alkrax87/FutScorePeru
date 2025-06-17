import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { Observable } from 'rxjs';
import { TeamInformation } from '../interfaces/api-models/team-information';

@Injectable({
  providedIn: 'root',
})
export class FetchPageInformationService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  fetchTeamInformation(teamId: string): Observable<TeamInformation> {
    return this.http.get<TeamInformation>(this.backendUrl + '/information/' + teamId);
  }
}