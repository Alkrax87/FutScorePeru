import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamPerformance } from '../interfaces/api-models/teamPerformance';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsPerformanceService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedTeamsPerformanceL1: TeamPerformance[] | null = null;
  private cachedTeamsPerformanceL2: TeamPerformance[] | null = null;
  private cachedTeamsPerformanceL3: TeamPerformance[] | null = null;

  private teamsPerformanceL1Subject = new BehaviorSubject<TeamPerformance[]>([]);
  private teamsPerformanceL2Subject = new BehaviorSubject<TeamPerformance[]>([]);
  private teamsPerformanceL3Subject = new BehaviorSubject<TeamPerformance[]>([]);

  teamsPerformanceL1$ = this.teamsPerformanceL1Subject.asObservable();
  teamsPerformanceL2$ = this.teamsPerformanceL2Subject.asObservable();
  teamsPerformanceL3$ = this.teamsPerformanceL3Subject.asObservable();

  fetchTeamsPerformanceL1() {
    if (this.cachedTeamsPerformanceL1) {
      this.teamsPerformanceL1Subject.next(this.cachedTeamsPerformanceL1);
      return;
    }

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/1').subscribe({
      next: (response) => {
        this.cachedTeamsPerformanceL1 = response;
        this.teamsPerformanceL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Teams Performance ', error),
    });
  }

  fetchTeamsPerformanceL2() {
    if (this.cachedTeamsPerformanceL2) {
      this.teamsPerformanceL2Subject.next(this.cachedTeamsPerformanceL2);
      return;
    }

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/2').subscribe({
      next: (response) => {
        this.cachedTeamsPerformanceL2 = response;
        this.teamsPerformanceL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Teams Performance ', error),
    });
  }

  fetchTeamsPerformanceL3() {
    if (this.cachedTeamsPerformanceL3) {
      this.teamsPerformanceL3Subject.next(this.cachedTeamsPerformanceL3);
      return;
    }

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/3').subscribe({
      next: (response) => {
        this.cachedTeamsPerformanceL3 = response;
        this.teamsPerformanceL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) Teams Performance ', error),
    });
  }
}