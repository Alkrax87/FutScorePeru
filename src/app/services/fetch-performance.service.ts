import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PerformanceDataL1 } from '../interfaces/api-models/performance-data-l1';
import { PerformanceDataL2 } from '../interfaces/api-models/performance-data-l2';
import { PerformanceDataL3 } from '../interfaces/api-models/performance-data-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchPerformanceService {
  constructor(private http: HttpClient) {}

  cachedPerformanceL1: PerformanceDataL1[] | null = null;
  cachedPerformanceL2: PerformanceDataL2[] | null = null;
  cachedPerformanceL3: PerformanceDataL3[] | null = null;

  private performanceL1Subject = new BehaviorSubject<PerformanceDataL1[]>([]);
  private performanceL2Subject = new BehaviorSubject<PerformanceDataL2[]>([]);
  private performanceL3Subject = new BehaviorSubject<PerformanceDataL3[]>([]);

  dataPerformanceL1$ = this.performanceL1Subject.asObservable();
  dataPerformanceL2$ = this.performanceL2Subject.asObservable();
  dataPerformanceL3$ = this.performanceL3Subject.asObservable();

  fetchPerformanceL1() {
    if (this.cachedPerformanceL1) {
      this.performanceL1Subject.next(this.cachedPerformanceL1);
      return;
    }

    this.http.get<PerformanceDataL1[]>('http://localhost:3000/api/performance/1').subscribe({
      next: (response) => {
        this.cachedPerformanceL1 = response;
        this.performanceL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) performance ', error),
    });
  }

  fetchPerformanceL2() {
    if (this.cachedPerformanceL2) {
      this.performanceL2Subject.next(this.cachedPerformanceL2);
      return;
    }

    this.http.get<PerformanceDataL2[]>('http://localhost:3000/api/performance/2').subscribe({
      next: (response) => {
        this.cachedPerformanceL2 = response;
        this.performanceL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) performance ', error),
    });
  }

  fetchPerformanceL3() {
    if (this.cachedPerformanceL3) {
      this.performanceL3Subject.next(this.cachedPerformanceL3);
      return;
    }

    this.http.get<PerformanceDataL3[]>('http://localhost:3000/api/performance/3').subscribe({
      next: (response) => {
        this.cachedPerformanceL3 = response;
        this.performanceL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) performance ', error),
    });
  }
}