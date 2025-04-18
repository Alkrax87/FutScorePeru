import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ManagerData } from '../interfaces/api-models/manager-data';

@Injectable({
  providedIn: 'root',
})
export class FetchManagerService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedManagersL1: ManagerData[] | null = null;
  cachedManagersL2: ManagerData[] | null = null;

  private managersL1Subject = new BehaviorSubject<ManagerData[]>([]);
  private managersL2Subject = new BehaviorSubject<ManagerData[]>([]);

  dataManagersL1$ = this.managersL1Subject.asObservable();
  dataManagersL2$ = this.managersL2Subject.asObservable();

  fetchManagersL1() {
    if (this.cachedManagersL1) {
      this.managersL1Subject.next(this.cachedManagersL1);
      return;
    }

    this.http.get<ManagerData[]>(this.backendUrl + '/managers/1').subscribe({
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

    this.http.get<ManagerData[]>(this.backendUrl + '/managers/2').subscribe({
      next: (response) => {
        this.cachedManagersL2 = response;
        this.managersL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) managers ', error),
    });
  }
}