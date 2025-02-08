import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultsDataL1 } from '../interfaces/api-models/results-data-l1';
import { ResultsDataL2 } from '../interfaces/api-models/results-data-l2';
import { ResultsDataL3 } from '../interfaces/api-models/results-data-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchResultsService {
  constructor(private http: HttpClient) {}

  private dataResultsL1Subject = new BehaviorSubject<ResultsDataL1[]>([]);
  private dataResultsL2Subject = new BehaviorSubject<ResultsDataL2[]>([]);
  private dataResultsL3Subject = new BehaviorSubject<ResultsDataL3[]>([]);

  dataResultsL1$ = this.dataResultsL1Subject.asObservable();
  dataResultsL2$ = this.dataResultsL2Subject.asObservable();
  dataResultsL3$ = this.dataResultsL3Subject.asObservable();

  getResultsL1() {
    this.http.get<ResultsDataL1[]>('http://localhost:3000/api/results/l1').subscribe({
      next: (response) => this.dataResultsL1Subject.next(response),
      error: (error) => console.log('Failed to fetch results Liga 1 ', error),
    });
  }

  getResultsL2() {
    this.http.get<ResultsDataL2[]>('http://localhost:3000/api/results/l2').subscribe({
      next: (response) => this.dataResultsL2Subject.next(response),
      error: (error) => console.log('Failed to fetch results Liga 2 ', error),
    });
  }

  getResultsL3() {
    this.http.get<ResultsDataL3[]>('http://localhost:3000/api/results/l3').subscribe({
      next: (response) => this.dataResultsL3Subject.next(response),
      error: (error) => console.log('Failed to fetch results Liga 3 ', error),
    });
  }
}
