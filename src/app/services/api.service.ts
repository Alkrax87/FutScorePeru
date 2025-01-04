import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  data: any;

  constructor(private http: HttpClient) {}

  fetchDataTeamsL1() {
    this.http
      .get('localhost:3000/api/teams/l1')
      .subscribe((data) => (this.data = data));
  }
  fetchDataTeamsL2() {
    this.http
      .get('localhost:3000/api/teams/l2')
      .subscribe((data) => (this.data = data));
  }
  fetchDataTeamsL3() {
    this.http
      .get('localhost:3000/api/teams/l3')
      .subscribe((data) => (this.data = data));
  }
}
