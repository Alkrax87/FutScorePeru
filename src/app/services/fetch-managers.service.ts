import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../interfaces/api-models/manager';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchManagersService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedManagersL1: Manager[] | null = null;
  private cachedManagersL2: Manager[] | null = null;

  private managersL1Subject = new BehaviorSubject<Manager[]>([]);
  private managersL2Subject = new BehaviorSubject<Manager[]>([]);

  managersL1$ = this.managersL1Subject.asObservable();
  managersL2$ = this.managersL2Subject.asObservable();

  fetchManagersL1() {
    if (this.cachedManagersL1) {
      this.managersL1Subject.next(this.cachedManagersL1);
      return;
    }

    this.http.get<Manager[]>(this.backendUrl + '/managers/category/1').subscribe({
      next: (response) => {
        this.cachedManagersL1 = response;
        this.managersL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) Managers ', error),
    });
  }

  fetchManagersL2() {
    if (this.cachedManagersL2) {
      this.managersL2Subject.next(this.cachedManagersL2);
      return;
    }

    this.http.get<Manager[]>(this.backendUrl + '/managers/category/2').subscribe({
      next: (response) => {
        this.cachedManagersL2 = response;
        this.managersL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) Managers ', error),
    });
  }
}