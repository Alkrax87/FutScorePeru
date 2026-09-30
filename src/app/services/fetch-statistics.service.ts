import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Statistics } from '../interfaces/api-models/statistics';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchStatisticsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private statisticsL1Subject = new BehaviorSubject<LoadState<Statistics>>({ status: 'idle', data: null, error: null });
  private statisticsL2Subject = new BehaviorSubject<LoadState<Statistics>>({ status: 'idle', data: null, error: null });
  private statisticsL3Subject = new BehaviorSubject<LoadState<Statistics>>({ status: 'idle', data: null, error: null });

  statisticsL1$ = this.statisticsL1Subject.asObservable();
  statisticsL2$ = this.statisticsL2Subject.asObservable();
  statisticsL3$ = this.statisticsL3Subject.asObservable();

  fetchStatisticsL1() {
    const currentState = this.statisticsL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.statisticsL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Statistics>(this.backendUrl + '/statistics/category/1').subscribe({
      next: (data) => this.statisticsL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.statisticsL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 1) Statistics', error);
      },
    });
  }

  fetchStatisticsL2() {
    const currentState = this.statisticsL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.statisticsL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Statistics>(this.backendUrl + '/statistics/category/2').subscribe({
      next: (data) => this.statisticsL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.statisticsL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 2) Statistics', error);
      },
    });
  }

  fetchStatisticsL3() {
    const currentState = this.statisticsL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.statisticsL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Statistics>(this.backendUrl + '/statistics/category/3').subscribe({
      next: (data) => this.statisticsL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.statisticsL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 3) Statistics', error);
      },
    });
  }
}