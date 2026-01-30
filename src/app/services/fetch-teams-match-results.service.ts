import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamMatchResults } from '../interfaces/api-models/teamMatchResults';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsMatchResultsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedTeamsMatchResultsL1: TeamMatchResults[] | null = null;
  private cachedTeamsMatchResultsL2: TeamMatchResults[] | null = null;
  private cachedTeamsMatchResultsL3: TeamMatchResults[] | null = null;

  private teamsMatchResultsL1Subject = new BehaviorSubject<TeamMatchResults[]>([]);
  private teamsMatchResultsL2Subject = new BehaviorSubject<TeamMatchResults[]>([]);
  private teamsMatchResultsL3Subject = new BehaviorSubject<TeamMatchResults[]>([]);

  teamsMatchResultsL1$ = this.teamsMatchResultsL1Subject.asObservable();
  teamsMatchResultsL2$ = this.teamsMatchResultsL2Subject.asObservable();
  teamsMatchResultsL3$ = this.teamsMatchResultsL3Subject.asObservable();

  fetchTeamsMatchResultsL1() {
    if (this.cachedTeamsMatchResultsL1) {
      this.teamsMatchResultsL1Subject.next(this.cachedTeamsMatchResultsL1);
      return;
    }

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/1').subscribe({
      next: (response) => {
        this.cachedTeamsMatchResultsL1 = response;
        this.teamsMatchResultsL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Teams Match Results ', error),
    });
  }

  fetchTeamsMatchResultsL2() {
    if (this.cachedTeamsMatchResultsL2) {
      this.teamsMatchResultsL2Subject.next(this.cachedTeamsMatchResultsL2);
      return;
    }

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/2').subscribe({
      next: (response) => {
        this.cachedTeamsMatchResultsL2 = response;
        this.teamsMatchResultsL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Teams Match Results ', error),
    });
  }

  fetchTeamsMatchResultsL3() {
    if (this.cachedTeamsMatchResultsL3) {
      this.teamsMatchResultsL3Subject.next(this.cachedTeamsMatchResultsL3);
      return;
    }

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/3').subscribe({
      next: (response) => {
        this.cachedTeamsMatchResultsL3 = response;
        this.teamsMatchResultsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) Teams Match Results ', error),
    });
  }
}