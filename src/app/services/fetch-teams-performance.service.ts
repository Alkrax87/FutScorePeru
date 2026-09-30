import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamPerformance } from '../interfaces/api-models/teamPerformance';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsPerformanceService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private teamsPerformanceL1Subject = new BehaviorSubject<LoadState<TeamPerformance[]>>({ status: 'idle', data: null, error: null });
  private teamsPerformanceL2Subject = new BehaviorSubject<LoadState<TeamPerformance[]>>({ status: 'idle', data: null, error: null });
  private teamsPerformanceL3Subject = new BehaviorSubject<LoadState<TeamPerformance[]>>({ status: 'idle', data: null, error: null });
  private teamsPerformanceCPSubject = new BehaviorSubject<LoadState<TeamPerformance[]>>({ status: 'idle', data: null, error: null });

  teamsPerformanceL1$ = this.teamsPerformanceL1Subject.asObservable();
  teamsPerformanceL2$ = this.teamsPerformanceL2Subject.asObservable();
  teamsPerformanceL3$ = this.teamsPerformanceL3Subject.asObservable();
  teamsPerformanceCP$ = this.teamsPerformanceCPSubject.asObservable();

  fetchTeamsPerformanceL1() {
    const currentState = this.teamsPerformanceL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsPerformanceL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/1').subscribe({
      next: (data) => this.teamsPerformanceL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsPerformanceL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) Teams Performance', error);
      },
    });
  }

  fetchTeamsPerformanceL2() {
    const currentState = this.teamsPerformanceL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsPerformanceL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/2').subscribe({
      next: (data) => this.teamsPerformanceL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsPerformanceL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) Teams Performance', error);
      },
    });
  }

  fetchTeamsPerformanceL3() {
    const currentState = this.teamsPerformanceL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsPerformanceL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/3').subscribe({
      next: (data) => this.teamsPerformanceL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsPerformanceL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga3) Teams Performance', error);
      },
    });
  }

  fetchTeamsPerformanceCP() {
    const currentState = this.teamsPerformanceCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsPerformanceCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamPerformance[]>(this.backendUrl + '/teamsPerformance/category/4').subscribe({
      next: (data) => this.teamsPerformanceCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsPerformanceCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Teams Performance', error);
      },
    });
  }
}