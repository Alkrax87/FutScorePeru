import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FixtureDataL1 } from '../interfaces/api-models/fixture-data-l1';
import { FixtureDataL2 } from '../interfaces/api-models/fixture-data-l2';
import { FixtureDataL3 } from '../interfaces/api-models/fixture-data-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchFixtureService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedFixtureL1: FixtureDataL1 | null = null;
  cachedFixtureL2: FixtureDataL2 | null = null;
  cachedFixtureL3: FixtureDataL3 | null = null;

  private fixtureL1Subject = new BehaviorSubject<FixtureDataL1 | null>(null);
  private fixtureL2Subject = new BehaviorSubject<FixtureDataL2 | null>(null);
  private fixtureL3Subject = new BehaviorSubject<FixtureDataL3 | null>(null);

  dataFixtureL1$ = this.fixtureL1Subject.asObservable();
  dataFixtureL2$ = this.fixtureL2Subject.asObservable();
  dataFixtureL3$ = this.fixtureL3Subject.asObservable();

  fetchFixtureL1() {
    if (this.cachedFixtureL1) {
      this.fixtureL1Subject.next(this.cachedFixtureL1);
      return;
    }

    this.http.get<FixtureDataL1>(this.backendUrl + '/fixture/1').subscribe({
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

    this.http.get<FixtureDataL2>(this.backendUrl + '/fixture/2').subscribe({
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

    this.http.get<FixtureDataL3>(this.backendUrl + '/fixture/3').subscribe({
      next: (response) => {
        this.cachedFixtureL3 = response;
        this.fixtureL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) fixture ', error),
    });
  }
}