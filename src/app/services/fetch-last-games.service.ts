import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LastGamesData } from '../interfaces/api-models/last-games-data';

@Injectable({
  providedIn: 'root',
})
export class FetchLastGamesService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedLastGamesL1: LastGamesData[] | null = null;
  cachedLastGamesL2: LastGamesData[] | null = null;
  cachedLastGamesL3: LastGamesData[] | null = null;

  private lastGamesL1Subject = new BehaviorSubject<LastGamesData[]>([]);
  private lastGamesL2Subject = new BehaviorSubject<LastGamesData[]>([]);
  private lastGamesL3Subject = new BehaviorSubject<LastGamesData[]>([]);

  dataLastGamesL1$ = this.lastGamesL1Subject.asObservable();
  dataLastGamesL2$ = this.lastGamesL2Subject.asObservable();
  dataLastGamesL3$ = this.lastGamesL3Subject.asObservable();

  fetchLastGamesL1() {
    if (this.cachedLastGamesL1) {
      this.lastGamesL1Subject.next(this.cachedLastGamesL1);
      return;
    }

    this.http.get<LastGamesData[]>(this.backendUrl + '/lastgames/1').subscribe({
      next: (response) => {
        this.cachedLastGamesL1 = response;
        this.lastGamesL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) last games ', error),
    });
  }

  fetchLastGamesL2() {
    if (this.cachedLastGamesL2) {
      this.lastGamesL2Subject.next(this.cachedLastGamesL2);
      return;
    }

    this.http.get<LastGamesData[]>(this.backendUrl + '/lastgames/2').subscribe({
      next: (response) => {
        this.cachedLastGamesL2 = response;
        this.lastGamesL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) last games ', error),
    });
  }

  fetchLastGamesL3() {
    if (this.cachedLastGamesL3) {
      this.lastGamesL3Subject.next(this.cachedLastGamesL3);
      return;
    }

    this.http.get<LastGamesData[]>(this.backendUrl + '/lastgames/3').subscribe({
      next: (response) => {
        this.cachedLastGamesL3 = response;
        this.lastGamesL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) last games ', error),
    });
  }
}