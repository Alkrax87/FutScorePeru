import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Fixture } from '../interfaces/api-models/fixture';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchFixturesService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private fixtureL1Subject = new BehaviorSubject<LoadState<Fixture>>({ status: 'idle', data: null, error: null });
  private fixtureL2Subject = new BehaviorSubject<LoadState<Fixture>>({ status: 'idle', data: null, error: null });
  private fixtureL3Subject = new BehaviorSubject<LoadState<Fixture>>({ status: 'idle', data: null, error: null });
  private fixtureCPSubject = new BehaviorSubject<LoadState<Fixture>>({ status: 'idle', data: null, error: null });

  fixtureL1$ = this.fixtureL1Subject.asObservable();
  fixtureL2$ = this.fixtureL2Subject.asObservable();
  fixtureL3$ = this.fixtureL3Subject.asObservable();
  fixtureCP$ = this.fixtureCPSubject.asObservable();

  fetchFixtureL1() {
    const currentState = this.fixtureL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.fixtureL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/1').subscribe({
      next: (data) => this.fixtureL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.fixtureL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) Fixture', error);
      },
    });
  }

  fetchFixtureL2() {
    const currentState = this.fixtureL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.fixtureL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/2').subscribe({
      next: (data) => this.fixtureL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.fixtureL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) Fixture', error);
      },
    });
  }

  fetchFixtureL3() {
    const currentState = this.fixtureL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.fixtureL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/3').subscribe({
      next: (data) => this.fixtureL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.fixtureL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga3) Fixture', error);
      },
    });
  }

  fetchFixtureCP() {
    const currentState = this.fixtureCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.fixtureCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/4').subscribe({
      next: (data) => this.fixtureCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.fixtureCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Fixture', error);
      },
    });
  }
}