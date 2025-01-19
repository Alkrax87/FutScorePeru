import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchLastGamesService {
  constructor(private http: HttpClient) {}

  async fetchLastGamesL1(url: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<any>(url));
      return {
        apertura: response.apertura,
        clausura: response.clausura,
      }
    } catch (error) {
      console.error('Failed to fetch last games', error);
    }
  }

  async fetchLastGamesL2(url: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<any>(url));
      return {
        regional: response.regional,
        grupos: response.grupos,
      }
    } catch (error) {
      console.error('Failed to fetch last games', error);
    }
  }
}
