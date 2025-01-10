import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchPerformanceService {
  constructor(private http: HttpClient) {}

  fetchPerformanceL1(url: string): Observable<any> {
    return this.http.get(url);
  }
  fetchPerformanceL2(url: string): Observable<any> {
    return this.http.get(url);
  }
  fetchPerformanceL3(url: string): Observable<any> {
    return this.http.get(url);
  }
}
