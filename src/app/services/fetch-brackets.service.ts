import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Brackets } from '../interfaces/api-models/brackets';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchBracketsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private bracketsL1Subject = new BehaviorSubject<LoadState<Brackets>>({ status: 'idle', data: null, error: null });
  private bracketsL2Subject = new BehaviorSubject<LoadState<Brackets>>({ status: 'idle', data: null, error: null });
  private bracketsL3Subject = new BehaviorSubject<LoadState<Brackets>>({ status: 'idle', data: null, error: null });
  private bracketsCPSubject = new BehaviorSubject<LoadState<Brackets>>({ status: 'idle', data: null, error: null });

  bracketsL1$ = this.bracketsL1Subject.asObservable();
  bracketsL2$ = this.bracketsL2Subject.asObservable();
  bracketsL3$ = this.bracketsL3Subject.asObservable();
  bracketsCP$ = this.bracketsCPSubject.asObservable();

  fetchBracketsL1() {
    const currentState = this.bracketsL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.bracketsL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Brackets>(this.backendUrl + '/brackets/category/1').subscribe({
      next: (data) => this.bracketsL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.bracketsL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 1) Brackets', error);
      },
    });
  }

  fetchBracketsL2() {
    const currentState = this.bracketsL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.bracketsL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Brackets>(this.backendUrl + '/brackets/category/2').subscribe({
      next: (data) => this.bracketsL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.bracketsL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 2) Brackets', error);
      },
    });
  }

  fetchBracketsL3() {
    const currentState = this.bracketsL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.bracketsL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Brackets>(this.backendUrl + '/brackets/category/3').subscribe({
      next: (data) => this.bracketsL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.bracketsL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga 3) Brackets', error);
      },
    });
  }

  fetchBracketsCP() {
    const currentState = this.bracketsCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.bracketsCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Brackets>(this.backendUrl + '/brackets/category/4').subscribe({
      next: (data) => this.bracketsCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.bracketsCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Brackets', error);
      },
    });
  }
}