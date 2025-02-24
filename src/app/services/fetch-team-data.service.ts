import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamDataL1 } from '../interfaces/api-models/team-data-l1';
import { TeamDataL2 } from '../interfaces/api-models/team-data-l2';
import { TeamDataL3 } from '../interfaces/api-models/team-data-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamDataService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedTeamsL1: TeamDataL1[] | null = null;
  cachedTeamsL2: TeamDataL2[] | null = null;
  cachedTeamsL3: TeamDataL3[] | null = null;

  private teamsL1Subject = new BehaviorSubject<TeamDataL1[]>([]);
  private teamsL2Subject = new BehaviorSubject<TeamDataL2[]>([]);
  private teamsL3Subject = new BehaviorSubject<TeamDataL3[]>([]);

  dataTeamsL1$ = this.teamsL1Subject.asObservable();
  dataTeamsL2$ = this.teamsL2Subject.asObservable();
  dataTeamsL3$ = this.teamsL3Subject.asObservable();

  fetchTeamsL1() {
    if (this.cachedTeamsL1) {
      this.teamsL1Subject.next(this.cachedTeamsL1);
      return;
    }

    this.http.get<TeamDataL1[]>(this.backendUrl + '/teams/1').subscribe({
      next: (response) => {
        this.cachedTeamsL1 = response;
        this.teamsL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) teams ', error),
    });
  }

  fetchTeamsL2() {
    if (this.cachedTeamsL2) {
      this.teamsL2Subject.next(this.cachedTeamsL2);
      return;
    }

    this.http.get<TeamDataL2[]>(this.backendUrl + '/teams/2').subscribe({
      next: (response) => {
        this.cachedTeamsL2 = response;
        this.teamsL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) teams ', error),
    });
  }

  fetchTeamsL3() {
    if (this.cachedTeamsL3) {
      this.teamsL3Subject.next(this.cachedTeamsL3);
      return;
    }

    this.http.get<TeamDataL3[]>(this.backendUrl + '/teams/3').subscribe({
      next: (response) => {
        this.cachedTeamsL3 = response;
        this.teamsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) teams ', error),
    });
  }
}