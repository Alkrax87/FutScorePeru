import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LastGamesL1 } from '../interfaces/api-models/last-games-l1';
import { LastGamesL2 } from '../interfaces/api-models/last-games-l2';
import { LastGamesL3 } from '../interfaces/api-models/last-games-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchLastGamesService {
  constructor(private http: HttpClient) {}

  async fetchLastGamesL1(url: string): Promise<{apertura: string[], clausura:string[]}> {
    try {
      const response = await firstValueFrom(this.http.get<LastGamesL1>(url));
      return {
        apertura: response.apertura,
        clausura: response.clausura,
      }
    } catch (error) {
      console.error('Failed to fetch last games', error);
      return { apertura: [], clausura: [] };
    }
  }

  async fetchLastGamesL2(url: string): Promise<{regional: string[], grupos:string[]}> {
    try {
      const response = await firstValueFrom(this.http.get<LastGamesL2>(url));
      return {
        regional: response.regional,
        grupos: response.grupos,
      }
    } catch (error) {
      console.error('Failed to fetch last games', error);
      return { regional: [], grupos: [] };
    }
  }

  async fetchLastGamesL3(url: string): Promise<{regular: string[], final:string[]}> {
    try {
      const response = await firstValueFrom(this.http.get<LastGamesL3>(url));
      return {
        regular: response.regular,
        final: response.final,
      }
    } catch (error) {
      console.error('Failed to fetch last games', error);
      return { regular: [], final: [] };
    }
  }
}
