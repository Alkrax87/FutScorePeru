import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchStatisticsService {

  constructor(private http:HttpClient) {}

  private dataStatisticsL1Subject = new BehaviorSubject<any>(null);
  private dataStatisticsL2Subject = new BehaviorSubject<any>(null);
  private dataStatisticsL3Subject = new BehaviorSubject<any>(null);

  dataStatisticsL1$ = this.dataStatisticsL1Subject.asObservable();
  dataStatisticsL2$ = this.dataStatisticsL2Subject.asObservable();
  dataStatisticsL3$ = this.dataStatisticsL3Subject.asObservable();

  getStatisticsL1() {
    this.http.get('http://localhost:3000/api/statistics/l1').subscribe({
      next: (response) => this.dataStatisticsL1Subject.next(response),
      error: (error) => console.error('Failed to fetch statistics (Liga 1) ', error),
    });
  }

  getStatisticsL2() {
    this.http.get('http://localhost:3000/api/statistics/l2').subscribe({
      next: (response) => this.dataStatisticsL2Subject.next(response),
      error: (error) => console.error('Failed to fetch statistics (Liga 1) ', error),
    });
  }

  getStatisticsL3() {
    this.http.get('http://localhost:3000/api/statistics/l3').subscribe({
      next: (response) => this.dataStatisticsL3Subject.next(response),
      error: (error) => console.error('Failed to fetch statistics (Liga 1) ', error),
    });
  }
}
