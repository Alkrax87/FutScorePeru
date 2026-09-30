import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { MapElement } from '../interfaces/api-models/map-element';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchMapService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private mapL1Subject = new BehaviorSubject<LoadState<MapElement[]>>({ status: 'idle', data: null, error: null });
  private mapL2Subject = new BehaviorSubject<LoadState<MapElement[]>>({ status: 'idle', data: null, error: null });
  private mapL3Subject = new BehaviorSubject<LoadState<MapElement[]>>({ status: 'idle', data: null, error: null });
  private mapCPSubject = new BehaviorSubject<LoadState<MapElement[]>>({ status: 'idle', data: null, error: null });

  dataMapL1$ = this.mapL1Subject.asObservable();
  dataMapL2$ = this.mapL2Subject.asObservable();
  dataMapL3$ = this.mapL3Subject.asObservable();
  dataMapCP$ = this.mapCPSubject.asObservable();

  fetchMapL1() {
    const currentState = this.mapL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.mapL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<MapElement[]>(this.backendUrl + '/map/category/1').subscribe({
      next: (data) => this.mapL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.mapL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) map', error);
      },
    });
  }

  fetchMapL2() {
    const currentState = this.mapL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.mapL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<MapElement[]>(this.backendUrl + '/map/category/2').subscribe({
      next: (data) => this.mapL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.mapL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) map', error);
      },
    });
  }

  fetchMapL3() {
    const currentState = this.mapL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.mapL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<MapElement[]>(this.backendUrl + '/map/category/3').subscribe({
      next: (data) => this.mapL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.mapL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga3) map', error);
      },
    });
  }

  fetchMapCP() {
    const currentState = this.mapCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.mapCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<MapElement[]>(this.backendUrl + '/map/category/4').subscribe({
      next: (data) => this.mapCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.mapCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) map', error);
      },
    });
  }
}