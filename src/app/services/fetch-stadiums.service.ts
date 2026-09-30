import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Stadium } from '../interfaces/api-models/stadium';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchStadiumsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private stadiumsSubject = new BehaviorSubject<LoadState<Stadium[]>>({ status: 'idle', data: null, error: null });

  stadiums$ = this.stadiumsSubject.asObservable();

  fetchStadiums() {
    const currentState = this.stadiumsSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.stadiumsSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Stadium[]>(this.backendUrl + '/stadiums').subscribe({
      next: (data) => this.stadiumsSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.stadiumsSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch Stadiums', error);
      },
    });
  }
}