import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Statistics } from '../interfaces/api-models/statistics';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchStatisticsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  cachedStatisticsL1: Statistics | null = null;
  cachedStatisticsL2: Statistics | null = null;
  cachedStatisticsL3: Statistics | null = null;

  private statisticsL1Subject = new BehaviorSubject<Statistics | null>(null);
  private statisticsL2Subject = new BehaviorSubject<Statistics | null>(null);
  private statisticsL3Subject = new BehaviorSubject<Statistics | null>(null);

  dataStatisticsL1$ = this.statisticsL1Subject.asObservable();
  dataStatisticsL2$ = this.statisticsL2Subject.asObservable();
  dataStatisticsL3$ = this.statisticsL3Subject.asObservable();

  fetchStatisticsL1() {
    if (this.cachedStatisticsL1) {
      this.statisticsL1Subject.next(this.cachedStatisticsL1);
      return;
    }

    this.http.get<Statistics>(this.backendUrl + '/statistics/category/1').subscribe({
      next: (response) => {
        this.cachedStatisticsL1 = response;
        this.statisticsL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga 1) statistics ', error),
    });
  }

  fetchStatisticsL2() {
    if (this.cachedStatisticsL2) {
      this.statisticsL2Subject.next(this.cachedStatisticsL2);
      return;
    }

    this.http.get<Statistics>(this.backendUrl + '/statistics/category/2').subscribe({
      next: (response) => {
        this.cachedStatisticsL2 = response;
        this.statisticsL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga 2) statistics ', error),
    });
  }

  fetchStatisticsL3() {
    if (this.cachedStatisticsL3) {
      this.statisticsL3Subject.next(this.cachedStatisticsL3);
      return;
    }

    this.http.get<Statistics>(this.backendUrl + '/statistics/category/3').subscribe({
      next: (response) => {
        this.cachedStatisticsL3 = response;
        this.statisticsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga 3) statistics ', error),
    });
  }
}