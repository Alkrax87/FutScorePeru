import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeagueData } from '../interfaces/api-models/league-data';

@Injectable({
  providedIn: 'root',
})
export class FetchLeaguesService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedLeagues: LeagueData[] | null = null;

  private leaguesSubject = new BehaviorSubject<LeagueData[]>([]);

  dataLeagues$ = this.leaguesSubject.asObservable();

  fetchLeagues() {
    if (this.cachedLeagues) {
      this.leaguesSubject.next(this.cachedLeagues);
      return;
    }

    this.http.get<LeagueData[]>(this.backendUrl + '/leagues').subscribe({
      next: (response) => {
        this.cachedLeagues = response;
        this.leaguesSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch leagues', error),
    });
  }
}