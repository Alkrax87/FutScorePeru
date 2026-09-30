import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { League } from '../interfaces/api-models/league';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchLeaguesService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private leaguesSubject = new BehaviorSubject<LoadState<League[]>>({ status: 'idle', data: null, error: null });

  leagues$ = this.leaguesSubject.asObservable();

  fetchLeagues() {
    const currentState = this.leaguesSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.leaguesSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<League[]>(this.backendUrl + '/leagues').subscribe({
      next: (data) => this.leaguesSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.leaguesSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Leagues', error);
      },
    });
  }
}