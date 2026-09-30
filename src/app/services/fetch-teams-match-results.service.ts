import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamMatchResults } from '../interfaces/api-models/teamMatchResults';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsMatchResultsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private teamsMatchResultsL1Subject = new BehaviorSubject<LoadState<TeamMatchResults[]>>({ status: 'idle', data: null, error: null });
  private teamsMatchResultsL2Subject = new BehaviorSubject<LoadState<TeamMatchResults[]>>({ status: 'idle', data: null, error: null });
  private teamsMatchResultsL3Subject = new BehaviorSubject<LoadState<TeamMatchResults[]>>({ status: 'idle', data: null, error: null });
  private teamsMatchResultsCPSubject = new BehaviorSubject<LoadState<TeamMatchResults[]>>({ status: 'idle', data: null, error: null });

  teamsMatchResultsL1$ = this.teamsMatchResultsL1Subject.asObservable();
  teamsMatchResultsL2$ = this.teamsMatchResultsL2Subject.asObservable();
  teamsMatchResultsL3$ = this.teamsMatchResultsL3Subject.asObservable();
  teamsMatchResultsCP$ = this.teamsMatchResultsCPSubject.asObservable();

  fetchTeamsMatchResultsL1() {
    const currentState = this.teamsMatchResultsL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsMatchResultsL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/1').subscribe({
      next: (data) => this.teamsMatchResultsL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsMatchResultsL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) Teams Match Results', error);
      },
    });
  }

  fetchTeamsMatchResultsL2() {
    const currentState = this.teamsMatchResultsL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsMatchResultsL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/2').subscribe({
      next: (data) => this.teamsMatchResultsL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsMatchResultsL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) Teams Match Results', error);
      },
    });
  }

  fetchTeamsMatchResultsL3() {
    const currentState = this.teamsMatchResultsL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsMatchResultsL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/3').subscribe({
      next: (data) => this.teamsMatchResultsL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsMatchResultsL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga3) Teams Match Results', error);
      },
    });
  }

  fetchTeamsMatchResultsCP() {
    const currentState = this.teamsMatchResultsCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsMatchResultsCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamMatchResults[]>(this.backendUrl + '/teamsMatchResults/category/4').subscribe({
      next: (data) => this.teamsMatchResultsCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsMatchResultsCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Teams Match Results', error);
      },
    });
  }
}