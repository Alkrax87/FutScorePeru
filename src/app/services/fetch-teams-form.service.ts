import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamForm } from '../interfaces/api-models/teamForm';
import { BehaviorSubject } from 'rxjs';
import { LoadState } from '../interfaces/async-state/load-state';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsFormService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private teamsFormL1Subject = new BehaviorSubject<LoadState<TeamForm[]>>({ status: 'idle', data: null, error: null });
  private teamsFormL2Subject = new BehaviorSubject<LoadState<TeamForm[]>>({ status: 'idle', data: null, error: null });
  private teamsFormL3Subject = new BehaviorSubject<LoadState<TeamForm[]>>({ status: 'idle', data: null, error: null });
  private teamsFormCPSubject = new BehaviorSubject<LoadState<TeamForm[]>>({ status: 'idle', data: null, error: null });

  teamsFormL1$ = this.teamsFormL1Subject.asObservable();
  teamsFormL2$ = this.teamsFormL2Subject.asObservable();
  teamsFormL3$ = this.teamsFormL3Subject.asObservable();
  teamsFormCP$ = this.teamsFormCPSubject.asObservable();

  fetchTeamsFormL1() {
    const currentState = this.teamsFormL1Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsFormL1Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/1').subscribe({
      next: (data) => this.teamsFormL1Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsFormL1Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga1) Teams Form', error);
      },
    });
  }

  fetchTeamsFormL2() {
    const currentState = this.teamsFormL2Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsFormL2Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/2').subscribe({
      next: (data) => this.teamsFormL2Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsFormL2Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga2) Teams Form', error);
      },
    });
  }

  fetchTeamsFormL3() {
    const currentState = this.teamsFormL3Subject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsFormL3Subject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/3').subscribe({
      next: (data) => this.teamsFormL3Subject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsFormL3Subject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Liga3) Teams Form', error);
      },
    });
  }

  fetchTeamsFormCP() {
    const currentState = this.teamsFormCPSubject.value;
    if (currentState.status === 'loading' || currentState.status === 'success') return;

    this.teamsFormCPSubject.next({ status: 'loading', data: currentState.data, error: null });

    this.http.get<TeamForm[]>(this.backendUrl + '/teamsForm/category/4').subscribe({
      next: (data) => this.teamsFormCPSubject.next({ status: 'success', data, error: null }),
      error: (error: unknown) => {
        this.teamsFormCPSubject.next({ status: 'error', data: currentState.data, error });
        console.error('Failed to fetch (Copa Perú) Teams Form', error);
      },
    });
  }
}