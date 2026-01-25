import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { StadiumData } from '../interfaces/api-models/stadium-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchStadiumsService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  cachedStadiums: StadiumData[] | null = null;

  private stadiumsSubject = new BehaviorSubject<StadiumData[]>([]);

  stadiums$ = this.stadiumsSubject.asObservable();

  fetchStadiums() {
    if (this.cachedStadiums) {
      this.stadiumsSubject.next(this.cachedStadiums);
      return;
    }

    this.http.get<StadiumData[]>(this.backendUrl + '/stadiums').subscribe({
      next: (response) => {
        this.cachedStadiums = response;
        this.stadiumsSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch Stadiums ', error),
    });
  }
}