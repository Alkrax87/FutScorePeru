import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../interfaces/api-models/manager';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchManagersService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private managersL1Subject = new BehaviorSubject<LoadState<Manager[]>>({ status: 'idle', data: null, error: null });
  private managersL2Subject = new BehaviorSubject<LoadState<Manager[]>>({ status: 'idle', data: null, error: null });

  managersL1$ = this.managersL1Subject.asObservable();
  managersL2$ = this.managersL2Subject.asObservable();

  fetchManagersL1() {
    const currentState = this.managersL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.managersL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Manager[]>(this.backendUrl + '/managers/category/1').subscribe({
      next: (data) => this.managersL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.managersL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) Managers', error);
      },
    });
  }

  fetchManagersL2() {
    const currentState = this.managersL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.managersL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Manager[]>(this.backendUrl + '/managers/category/2').subscribe({
      next: (data) => this.managersL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.managersL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) Managers', error);
      },
    });
  }
}