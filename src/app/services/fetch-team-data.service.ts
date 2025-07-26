import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamData } from '../interfaces/api-models/team-data';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamDataService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedTeamsL1: TeamData[] | null = null;
  cachedTeamsL2: TeamData[] | null = null;
  cachedTeamsL3: TeamData[] | null = null;

  private teamsL1Subject = new BehaviorSubject<TeamData[]>([]);
  private teamsL2Subject = new BehaviorSubject<TeamData[]>([]);
  private teamsL3Subject = new BehaviorSubject<TeamData[]>([]);

  dataTeamsL1$ = this.teamsL1Subject.asObservable();
  dataTeamsL2$ = this.teamsL2Subject.asObservable();
  dataTeamsL3$ = this.teamsL3Subject.asObservable();

  fetchTeamsL1() {
    if (this.cachedTeamsL1) {
      this.teamsL1Subject.next(this.cachedTeamsL1);
      return;
    }

    this.http.get<TeamData[]>(this.backendUrl + '/teams/category/1').subscribe({
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

    this.http.get<TeamData[]>(this.backendUrl + '/teams/category/2').subscribe({
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

    this.http.get<TeamData[]>(this.backendUrl + '/teams/category/3').subscribe({
      next: (response) => {
        this.cachedTeamsL3 = response;
        this.teamsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) teams ', error),
    });
  }
}