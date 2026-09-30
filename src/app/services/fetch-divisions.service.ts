import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Division } from '../interfaces/api-models/division';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchDivisionsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private divisionL1Subject = new BehaviorSubject<LoadState<Division>>({ status: 'idle', data: null, error: null });
  private divisionL2Subject = new BehaviorSubject<LoadState<Division>>({ status: 'idle', data: null, error: null });
  private divisionL3Subject = new BehaviorSubject<LoadState<Division>>({ status: 'idle', data: null, error: null });
  private divisionCPSubject = new BehaviorSubject<LoadState<Division>>({ status: 'idle', data: null, error: null });

  divisionL1$ = this.divisionL1Subject.asObservable();
  divisionL2$ = this.divisionL2Subject.asObservable();
  divisionL3$ = this.divisionL3Subject.asObservable();
  divisionCP$ = this.divisionCPSubject.asObservable();

  fetchDivisionL1() {
    const currentState = this.divisionL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.divisionL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Division>(this.backendUrl + '/divisions/category/1').subscribe({
      next: (data) => this.divisionL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.divisionL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) Division', error);
      },
    });
  }

  fetchDivisionL2() {
    const currentState = this.divisionL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.divisionL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Division>(this.backendUrl + '/divisions/category/2').subscribe({
      next: (data) => this.divisionL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.divisionL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) Division', error);
      },
    });
  }

  fetchDivisionL3() {
    const currentState = this.divisionL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.divisionL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Division>(this.backendUrl + '/divisions/category/3').subscribe({
      next: (data) => this.divisionL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.divisionL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga3) Division', error);
      },
    });
  }

  fetchDivisionCP() {
    const currentState = this.divisionCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.divisionCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Division>(this.backendUrl + '/divisions/category/4').subscribe({
      next: (data) => this.divisionCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.divisionCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Division', error);
      },
    });
  }
}