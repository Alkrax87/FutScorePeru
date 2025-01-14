import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamDataL1 } from '../interfaces/team-data-l1';
import { TeamDataL2 } from '../interfaces/team-data-l2';
import { TeamDataL3 } from '../interfaces/team-data-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchTeamDataService {
  constructor(private http: HttpClient) {}

  private dataTeamsL1Subject = new BehaviorSubject<TeamDataL1[] | null>(null);
  private dataTeamsL2Subject = new BehaviorSubject<TeamDataL2[] | null>(null);
  private dataTeamsL3Subject = new BehaviorSubject<TeamDataL3[] | null>(null);

  dataTeamsL1$ = this.dataTeamsL1Subject.asObservable();
  dataTeamsL2$ = this.dataTeamsL2Subject.asObservable();
  dataTeamsL3$ = this.dataTeamsL3Subject.asObservable();

  getDataLiga1() {
    this.http.get<TeamDataL1[]>('http://localhost:3000/api/teams/l1').subscribe({
      next: (response) => this.dataTeamsL1Subject.next(response),
      error: (error) => console.error('Failed to fetch team data (Liga 1) ', error),
    });
  }

  getDataLiga2() {
    this.http.get<TeamDataL2[]>('http://localhost:3000/api/teams/l2').subscribe({
      next: (response) => this.dataTeamsL2Subject.next(response),
      error: (error) => console.error('Failed to fetch team data (Liga 2) ', error),
    });
  }

  getDataLiga3() {
    this.http.get<TeamDataL3[]>('http://localhost:3000/api/teams/l3').subscribe({
      next: (response) => this.dataTeamsL3Subject.next(response),
      error: (error) => console.error('Failed to fetch team data (Liga 3) ', error),
    });
  }
}
