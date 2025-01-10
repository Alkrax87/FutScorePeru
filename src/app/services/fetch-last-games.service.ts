import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchLastGamesService {
  constructor(private http: HttpClient) {}

  fetchLastGamesL1(url: string): Observable<any> {
    return this.http.get(url);
  }
  fetchLastGamesL2(url: string): Observable<any> {
    return this.http.get(url);
  }
  fetchLastGamesL3(url: string): Observable<any> {
    return this.http.get(url);
  }
}
