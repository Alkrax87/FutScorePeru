import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchFixtureService {
  constructor(private http: HttpClient) {}

  private dataFixtureL1Subject = new BehaviorSubject<any | null>(null);
  private dataFixtureL2Subject = new BehaviorSubject<any | null>(null);
  private dataFixtureL3Subject = new BehaviorSubject<any | null>(null);

  dataFixtureL1$ = this.dataFixtureL1Subject.asObservable();
  dataFixtureL2$ = this.dataFixtureL2Subject.asObservable();
  dataFixtureL3$ = this.dataFixtureL3Subject.asObservable();

  getDataFixtureLiga1() {
    this.http.get<any>('http://localhost:3000/api/fixture/l1').subscribe({
      next: (response) => this.dataFixtureL1Subject.next(response),
      error: (error) => console.error('Failed to fetch fixture Liga 1 ', error),
    });
  }

  getDataFixtureLiga2() {
    this.http.get<any>('http://localhost:3000/api/fixture/l2').subscribe({
      next: (response) => this.dataFixtureL2Subject.next(response),
      error: (error) => console.error('Failed to fetch fixture Liga 2 ', error),
    });
  }

  getDataFixtureLiga3() {
    this.http.get<any>('http://localhost:3000/api/fixture/l3').subscribe({
      next: (response) => this.dataFixtureL3Subject.next(response),
      error: (error) => console.error('Failed to fetch fixture Liga 3 ', error),
    });
  }
}
