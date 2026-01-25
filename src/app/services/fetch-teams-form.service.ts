import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamForm } from '../interfaces/api-models/teamForm';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsFormService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedTeamsFormL1: TeamForm[] | null = null;
  private cachedTeamsFormL2: TeamForm[] | null = null;
  private cachedTeamsFormL3: TeamForm[] | null = null;

  private teamsFormL1Subject = new BehaviorSubject<TeamForm[]>([]);
  private teamsFormL2Subject = new BehaviorSubject<TeamForm[]>([]);
  private teamsFormL3Subject = new BehaviorSubject<TeamForm[]>([]);

  teamsFormL1$ = this.teamsFormL1Subject.asObservable();
  teamsFormL2$ = this.teamsFormL2Subject.asObservable();
  teamsFormL3$ = this.teamsFormL3Subject.asObservable();

  fetchTeamsFormL1() {
    if (this.cachedTeamsFormL1) {
      this.teamsFormL1Subject.next(this.cachedTeamsFormL1);
      return;
    }

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/1').subscribe({
      next: (response) => {
        this.cachedTeamsFormL1 = response;
        this.teamsFormL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Teams Form ', error),
    });
  }

  fetchTeamsFormL2() {
    if (this.cachedTeamsFormL2) {
      this.teamsFormL2Subject.next(this.cachedTeamsFormL2);
      return;
    }

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/2').subscribe({
      next: (response) => {
        this.cachedTeamsFormL2 = response;
        this.teamsFormL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Teams Form ', error),
    });
  }

  fetchTeamsFormL3() {
    if (this.cachedTeamsFormL3) {
      this.teamsFormL3Subject.next(this.cachedTeamsFormL3);
      return;
    }

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/3').subscribe({
      next: (response) => {
        this.cachedTeamsFormL3 = response;
        this.teamsFormL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) Teams Form ', error),
    });
  }
}