import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { FixtureData } from '../interfaces/api-models/fixture-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchFixtureService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  cachedFixtureL1: FixtureData | null = null;
  cachedFixtureL2: FixtureData | null = null;
  cachedFixtureL3: FixtureData | null = null;

  private fixtureL1Subject = new BehaviorSubject<FixtureData | null>(null);
  private fixtureL2Subject = new BehaviorSubject<FixtureData | null>(null);
  private fixtureL3Subject = new BehaviorSubject<FixtureData | null>(null);

  dataFixtureL1$ = this.fixtureL1Subject.asObservable();
  dataFixtureL2$ = this.fixtureL2Subject.asObservable();
  dataFixtureL3$ = this.fixtureL3Subject.asObservable();

  fetchFixtureL1() {
    if (this.cachedFixtureL1) {
      this.fixtureL1Subject.next(this.cachedFixtureL1);
      return;
    }

    this.http.get<FixtureData>(this.backendUrl + '/fixture/1').subscribe({
      next: (response) => {
        this.cachedFixtureL1 = response;
        this.fixtureL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) fixture ', error),
    });
  }

  fetchFixtureL2() {
    if (this.cachedFixtureL2) {
      this.fixtureL2Subject.next(this.cachedFixtureL2);
      return;
    }

    this.http.get<FixtureData>(this.backendUrl + '/fixture/2').subscribe({
      next: (response) => {
        this.cachedFixtureL2 = response;
        this.fixtureL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) fixture ', error),
    });
  }

  fetchFixtureL3() {
    if (this.cachedFixtureL3) {
      this.fixtureL3Subject.next(this.cachedFixtureL3);
      return;
    }

    this.http.get<FixtureData>(this.backendUrl + '/fixture/3').subscribe({
      next: (response) => {
        this.cachedFixtureL3 = response;
        this.fixtureL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) fixture ', error),
    });
  }
}