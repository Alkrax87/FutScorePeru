import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { League } from '../interfaces/api-models/league';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchLeaguesService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedLeagues: League[] | null = null;

  private leaguesSubject = new BehaviorSubject<League[]>([]);

  leagues$ = this.leaguesSubject.asObservable();

  fetchLeagues() {
    if (this.cachedLeagues) {
      this.leaguesSubject.next(this.cachedLeagues);
      return;
    }

    this.http.get<League[]>(this.backendUrl + '/leagues').subscribe({
      next: (response) => {
        this.cachedLeagues = response;
        this.leaguesSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Copa Perú) Leagues', error),
    });
  }
}