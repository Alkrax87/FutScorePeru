import { Environments } from '../environment/environments';
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
  private apiUrl = Environments.apiUrl;

  constructor(private http: HttpClient) {}

  cachedResultsL1: ResultsDataL1[] | null = null;
  cachedResultsL2: ResultsDataL2[] | null = null;
  cachedResultsL3: ResultsDataL3[] | null = null;

  private resultsL1Subject = new BehaviorSubject<ResultsDataL1[]>([]);
  private resultsL2Subject = new BehaviorSubject<ResultsDataL2[]>([]);
  private resultsL3Subject = new BehaviorSubject<ResultsDataL3[]>([]);

  dataResultsL1$ = this.resultsL1Subject.asObservable();
  dataResultsL2$ = this.resultsL2Subject.asObservable();
  dataResultsL3$ = this.resultsL3Subject.asObservable();

  fetchResultsL1() {
    if (this.cachedResultsL1) {
      this.resultsL1Subject.next(this.cachedResultsL1);
      return;
    }

    this.http.get<ResultsDataL1[]>(this.apiUrl + '/results/1').subscribe({
      next: (response) => {
        this.cachedResultsL1 = response;
        this.resultsL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) results ', error),
    });
  }

  fetchResultsL2() {
    if (this.cachedResultsL2) {
      this.resultsL2Subject.next(this.cachedResultsL2);
      return;
    }

    this.http.get<ResultsDataL2[]>(this.apiUrl + '/results/2').subscribe({
      next: (response) => {
        this.cachedResultsL2 = response;
        this.resultsL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) results ', error),
    });
  }

  fetchResultsL3() {
    if (this.cachedResultsL3) {
      this.resultsL3Subject.next(this.cachedResultsL3);
      return;
    }

    this.http.get<ResultsDataL3[]>(this.apiUrl + '/results/3').subscribe({
      next: (response) => {
        this.cachedResultsL3 = response;
        this.resultsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) results ', error),
    });
  }
}