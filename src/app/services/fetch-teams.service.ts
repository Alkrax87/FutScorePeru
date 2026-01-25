import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/api-models/team';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedTeamsL1: Team[] | null = null;
  private cachedTeamsL2: Team[] | null = null;
  private cachedTeamsL3: Team[] | null = null;

  private teamsL1Subject = new BehaviorSubject<Team[]>([]);
  private teamsL2Subject = new BehaviorSubject<Team[]>([]);
  private teamsL3Subject = new BehaviorSubject<Team[]>([]);

  teamsL1$ = this.teamsL1Subject.asObservable();
  teamsL2$ = this.teamsL2Subject.asObservable();
  teamsL3$ = this.teamsL3Subject.asObservable();

  fetchTeamsL1() {
    if (this.cachedTeamsL1) {
      this.teamsL1Subject.next(this.cachedTeamsL1);
      return;
    }

    this.http.get<Team[]>(this.backendUrl + '/teams/category/1').subscribe({
      next: (response) => {
        this.cachedTeamsL1 = response;
        this.teamsL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Teams ', error),
    });
  }

  fetchTeamsL2() {
    if (this.cachedTeamsL2) {
      this.teamsL2Subject.next(this.cachedTeamsL2);
      return;
    }

    this.http.get<Team[]>(this.backendUrl + '/teams/category/2').subscribe({
      next: (response) => {
        this.cachedTeamsL2 = response;
        this.teamsL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Teams ', error),
    });
  }

  fetchTeamsL3() {
    if (this.cachedTeamsL3) {
      this.teamsL3Subject.next(this.cachedTeamsL3);
      return;
    }

    this.http.get<Team[]>(this.backendUrl + '/teams/category/3').subscribe({
      next: (response) => {
        this.cachedTeamsL3 = response;
        this.teamsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) Teams ', error),
    });
  }
}