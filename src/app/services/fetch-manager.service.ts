import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ManagerData } from '../interfaces/api-models/manager-data';

@Injectable({
  providedIn: 'root',
})
export class FetchManagerService {
  constructor(private http: HttpClient) {}

  cachedManagersL1: ManagerData[] | null = null;
  cachedManagersL2: ManagerData[] | null = null;
  cachedManagersL3: ManagerData[] | null = null;

  private managersL1Subject = new BehaviorSubject<ManagerData[]>([]);
  private managersL2Subject = new BehaviorSubject<ManagerData[]>([]);
  private managersL3Subject = new BehaviorSubject<ManagerData[]>([]);

  dataManagersL1$ = this.managersL1Subject.asObservable();
  dataManagersL2$ = this.managersL2Subject.asObservable();
  dataManagersL3$ = this.managersL3Subject.asObservable();

  fetchManagersL1() {
    if (this.cachedManagersL1) {
      this.managersL1Subject.next(this.cachedManagersL1);
      return;
    }

    this.http.get<ManagerData[]>('http://localhost:3000/api/managers/l1').subscribe({
      next: (response) => {
        this.cachedManagersL1 = response;
        this.managersL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) managers ', error),
    });
  }

  fetchManagersL2() {
    if (this.cachedManagersL2) {
      this.managersL2Subject.next(this.cachedManagersL2);
      return;
    }

    this.http.get<ManagerData[]>('http://localhost:3000/api/managers/l2').subscribe({
      next: (response) => {
        this.cachedManagersL2 = response;
        this.managersL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) managers ', error),
    });
  }

  fetchManagersL3() {
    if (this.cachedManagersL3) {
      this.managersL3Subject.next(this.cachedManagersL3);
      return;
    }

    this.http.get<ManagerData[]>('http://localhost:3000/api/managers/l3').subscribe({
      next: (response) => {
        this.cachedManagersL3 = response;
        this.managersL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) managers ', error),
    });
  }
}