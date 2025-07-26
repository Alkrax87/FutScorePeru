import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PerformanceData } from '../interfaces/api-models/performance-data';

@Injectable({
  providedIn: 'root',
})
export class FetchPerformanceService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedPerformanceL1: PerformanceData[] | null = null;
  cachedPerformanceL2: PerformanceData[] | null = null;
  cachedPerformanceL3: PerformanceData[] | null = null;

  private performanceL1Subject = new BehaviorSubject<PerformanceData[]>([]);
  private performanceL2Subject = new BehaviorSubject<PerformanceData[]>([]);
  private performanceL3Subject = new BehaviorSubject<PerformanceData[]>([]);

  dataPerformanceL1$ = this.performanceL1Subject.asObservable();
  dataPerformanceL2$ = this.performanceL2Subject.asObservable();
  dataPerformanceL3$ = this.performanceL3Subject.asObservable();

  fetchPerformanceL1() {
    if (this.cachedPerformanceL1) {
      this.performanceL1Subject.next(this.cachedPerformanceL1);
      return;
    }

    this.http.get<PerformanceData[]>(this.backendUrl + '/performance/category/1').subscribe({
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

    this.http.get<PerformanceData[]>(this.backendUrl + '/performance/category/2').subscribe({
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

    this.http.get<PerformanceData[]>(this.backendUrl + '/performance/category/3').subscribe({
      next: (response) => {
        this.cachedPerformanceL3 = response;
        this.performanceL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) performance ', error),
    });
  }
}