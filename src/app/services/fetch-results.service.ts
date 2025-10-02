import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { ResultsData } from '../interfaces/api-models/results-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchResultsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  cachedResultsL1: ResultsData[] | null = null;
  cachedResultsL2: ResultsData[] | null = null;
  cachedResultsL3: ResultsData[] | null = null;

  private resultsL1Subject = new BehaviorSubject<ResultsData[]>([]);
  private resultsL2Subject = new BehaviorSubject<ResultsData[]>([]);
  private resultsL3Subject = new BehaviorSubject<ResultsData[]>([]);

  dataResultsL1$ = this.resultsL1Subject.asObservable();
  dataResultsL2$ = this.resultsL2Subject.asObservable();
  dataResultsL3$ = this.resultsL3Subject.asObservable();

  fetchResultsL1() {
    if (this.cachedResultsL1) {
      this.resultsL1Subject.next(this.cachedResultsL1);
      return;
    }

    this.http.get<ResultsData[]>(this.backendUrl + '/results/category/1').subscribe({
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

    this.http.get<ResultsData[]>(this.backendUrl + '/results/category/2').subscribe({
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

    this.http.get<ResultsData[]>(this.backendUrl + '/results/category/3').subscribe({
      next: (response) => {
        this.cachedResultsL3 = response;
        this.resultsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) results ', error),
    });
  }
}