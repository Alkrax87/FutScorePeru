import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Fixture } from '../interfaces/api-models/fixture';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchFixturesService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedFixtureL1: Fixture | null = null;
  private cachedFixtureL2: Fixture | null = null;
  private cachedFixtureL3: Fixture | null = null;

  private fixtureL1Subject = new BehaviorSubject<Fixture | null>(null);
  private fixtureL2Subject = new BehaviorSubject<Fixture | null>(null);
  private fixtureL3Subject = new BehaviorSubject<Fixture | null>(null);

  fixtureL1$ = this.fixtureL1Subject.asObservable();
  fixtureL2$ = this.fixtureL2Subject.asObservable();
  fixtureL3$ = this.fixtureL3Subject.asObservable();

  fetchFixtureL1() {
    if (this.cachedFixtureL1) {
      this.fixtureL1Subject.next(this.cachedFixtureL1);
      return;
    }

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/1').subscribe({
      next: (response) => {
        this.cachedFixtureL1 = response;
        this.fixtureL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Fixture ', error),
    });
  }

  fetchFixtureL2() {
    if (this.cachedFixtureL2) {
      this.fixtureL2Subject.next(this.cachedFixtureL2);
      return;
    }

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/2').subscribe({
      next: (response) => {
        this.cachedFixtureL2 = response;
        this.fixtureL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Fixture ', error),
    });
  }

  fetchFixtureL3() {
    if (this.cachedFixtureL3) {
      this.fixtureL3Subject.next(this.cachedFixtureL3);
      return;
    }

    this.http.get<Fixture>(this.backendUrl + '/fixture/category/3').subscribe({
      next: (response) => {
        this.cachedFixtureL3 = response;
        this.fixtureL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) Fixture ', error),
    });
  }
}