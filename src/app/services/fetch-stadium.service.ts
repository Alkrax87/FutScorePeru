import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StadiumData } from '../interfaces/api-models/stadium-data';

@Injectable({
  providedIn: 'root',
})
export class FetchStadiumService {
  constructor(private http: HttpClient) {}

  cachedStadiums: StadiumData[] | null = null;

  private stadiumsSubject = new BehaviorSubject<StadiumData[]>([]);

  dataStadiums$ = this.stadiumsSubject.asObservable();

  fetchStadiums() {
    if (this.cachedStadiums) {
      this.stadiumsSubject.next(this.cachedStadiums);
      return;
    }

    this.http.get<StadiumData[]>("http://localhost:3000/api/stadiums").subscribe({
      next: (response) => {
        this.cachedStadiums = response;
        this.stadiumsSubject.next(response);
      },
      error: (error) => console.error("Failed to fetch stadiums ", error),
    });
  }
}