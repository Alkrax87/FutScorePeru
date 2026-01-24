import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Division } from '../interfaces/api-models/division';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDivisionService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  cachedDivisionL1: Division | null = null;
  cachedDivisionL2: Division | null = null;
  cachedDivisionL3: Division | null = null;
  cachedDivisionCP: Division | null = null;

  private divisionL1Subject = new BehaviorSubject<Division | null>(null);
  private divisionL2Subject = new BehaviorSubject<Division | null>(null);
  private divisionL3Subject = new BehaviorSubject<Division | null>(null);
  private divisionCPSubject = new BehaviorSubject<Division | null>(null);

  dataDivisionL1$ = this.divisionL1Subject.asObservable();
  dataDivisionL2$ = this.divisionL2Subject.asObservable();
  dataDivisionL3$ = this.divisionL3Subject.asObservable();
  dataDivisionCP$ = this.divisionCPSubject.asObservable();

  fetchDivisionL1() {
    if (this.cachedDivisionL1) {
      this.divisionL1Subject.next(this.cachedDivisionL1);
      return;
    }

    this.http.get<Division>(this.backendUrl + '/divisions/category/1').subscribe({
      next: (response) => {
        this.cachedDivisionL1 = response;
        this.divisionL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Division ', error),
    });
  }

  fetchDivisionL2() {
    if (this.cachedDivisionL2) {
      this.divisionL2Subject.next(this.cachedDivisionL2);
      return;
    }

    this.http.get<Division>(this.backendUrl + '/divisions/category/2').subscribe({
      next: (response) => {
        this.cachedDivisionL2 = response;
        this.divisionL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Division ', error),
    });
  }

  fetchDivisionL3() {
    if (this.cachedDivisionL3) {
      this.divisionL3Subject.next(this.cachedDivisionL3);
      return;
    }

    this.http.get<Division>(this.backendUrl + '/divisions/category/3').subscribe({
      next: (response) => {
        this.cachedDivisionL3 = response;
        this.divisionL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) Division ', error),
    });
  }

  fetchDivisionCP() {
    if (this.cachedDivisionCP) {
      this.divisionCPSubject.next(this.cachedDivisionCP);
      return;
    }

    this.http.get<Division>(this.backendUrl + '/divisions/category/4').subscribe({
      next: (response) => {
        this.cachedDivisionCP = response;
        this.divisionCPSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Copa Perú) Division ', error),
    });
  }
}