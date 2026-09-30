import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/api-models/team';
import { TeamCP } from '../interfaces/api-models/team-cp';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private teamsL1Subject = new BehaviorSubject<LoadState<Team[]>>({ status: 'idle', data: null, error: null });
  private teamsL2Subject = new BehaviorSubject<LoadState<Team[]>>({ status: 'idle', data: null, error: null });
  private teamsL3Subject = new BehaviorSubject<LoadState<Team[]>>({ status: 'idle', data: null, error: null });
  private teamsCPSubject = new BehaviorSubject<LoadState<TeamCP[]>>({ status: 'idle', data: null, error: null });

  teamsL1$ = this.teamsL1Subject.asObservable();
  teamsL2$ = this.teamsL2Subject.asObservable();
  teamsL3$ = this.teamsL3Subject.asObservable();
  teamsCP$ = this.teamsCPSubject.asObservable();

  fetchTeamsL1() {
    const currentState = this.teamsL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Team[]>(this.backendUrl + '/teams/category/1').subscribe({
      next: (data) => this.teamsL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 1) Teams', error);
      },
    });
  }

  fetchTeamsL2() {
    const currentState = this.teamsL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Team[]>(this.backendUrl + '/teams/category/2').subscribe({
      next: (data) => this.teamsL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 2) Teams', error);
      },
    });
  }

  fetchTeamsL3() {
    const currentState = this.teamsL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Team[]>(this.backendUrl + '/teams/category/3').subscribe({
      next: (data) => this.teamsL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 3) Teams', error);
      },
    });
  }

  fetchTeamsCP() {
    const currentState = this.teamsCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamCP[]>(this.backendUrl + '/teamsCP').subscribe({
      next: (data) => this.teamsCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Teams', error);
      },
    });
  }
}