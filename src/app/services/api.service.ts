import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchDataTeamsL1(): Observable<any> {
    return this.http.get('http://localhost:3000/api/teams/l1');
  }
  fetchDataTeamsL2(): Observable<any> {
    return this.http.get('http://localhost:3000/api/teams/l2');
  }
  fetchDataTeamsL3(): Observable<any> {
    return this.http.get('http://localhost:3000/api/teams/l3');
  }
}
