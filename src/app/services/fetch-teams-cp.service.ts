import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamCP } from '../interfaces/api-models/team-cp';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamsCPService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private cachedTeamsCP: TeamCP[] | null = null;

  private teamsCPSubject = new BehaviorSubject<TeamCP[]>([]);

  teamsCP$ = this.teamsCPSubject.asObservable();

  fetchTeamsCP() {
    if (this.cachedTeamsCP) {
      this.teamsCPSubject.next(this.cachedTeamsCP);
      return;
    }

    this.http.get<TeamCP[]>(this.backendUrl + '/teamsCP').subscribe({
      next: (response) => {
        this.cachedTeamsCP = response;
        this.teamsCPSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Copa Perú) Teams ', error),
    });
  }
}