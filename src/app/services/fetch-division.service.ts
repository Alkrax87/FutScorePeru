import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DivisionData } from '../interfaces/api-models/division-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDivisionService {
  private apiUrl = Environments.apiUrl;

  constructor(private http:HttpClient) {}

  cachedDivisionL1: DivisionData | null = null;
  cachedDivisionL2: DivisionData | null = null;
  cachedDivisionL3: DivisionData | null = null;

  private divisionL1Subject = new BehaviorSubject<DivisionData | null>(null);
  private divisionL2Subject = new BehaviorSubject<DivisionData | null>(null);
  private divisionL3Subject = new BehaviorSubject<DivisionData | null>(null);

  dataDivisionL1$ = this.divisionL1Subject.asObservable();
  dataDivisionL2$ = this.divisionL2Subject.asObservable();
  dataDivisionL3$ = this.divisionL3Subject.asObservable();

  fetchDivisionL1() {
    if (this.cachedDivisionL1) {
      this.divisionL1Subject.next(this.cachedDivisionL1);
      return;
    }

    this.http.get<DivisionData>(this.apiUrl + "/division/1").subscribe({
      next: (response) => {
        this.cachedDivisionL1 = response;
        this.divisionL1Subject.next(response);
      },
      error: (error) => console.error("Failed to fetch (Liga1) Division ", error),
    });
  }

  fetchDivisionL2() {
    if (this.cachedDivisionL2) {
      this.divisionL2Subject.next(this.cachedDivisionL2);
      return;
    }

    this.http.get<DivisionData>(this.apiUrl + "/division/2").subscribe({
      next: (response) => {
        this.cachedDivisionL2 = response;
        this.divisionL2Subject.next(response);
      },
      error: (error) => console.error("Failed to fetch (Liga2) Division ", error),
    });
  }

  fetchDivisionL3() {
    if (this.cachedDivisionL3) {
      this.divisionL3Subject.next(this.cachedDivisionL3);
      return;
    }

    this.http.get<DivisionData>(this.apiUrl + "/division/3").subscribe({
      next: (response) => {
        this.cachedDivisionL3 = response;
        this.divisionL3Subject.next(response);
      },
      error: (error) => console.error("Failed to fetch (Liga3) Division ", error),
    });
  }
}