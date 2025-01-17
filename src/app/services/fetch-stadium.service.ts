import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StadiumData } from '../interfaces/stadium-data';

@Injectable({
  providedIn: 'root',
})
export class FetchStadiumService {
  constructor(private http: HttpClient) {}

  async fetchStadium(url: string): Promise<{name: string, capacity:string, location: string}> {
    try {
      const response = await firstValueFrom(this.http.get<StadiumData>(url));
      return {
        name: response.name || 'stadium',
        capacity: response.capacity || 'capacity',
        location: response.location || 'location'
      };
    } catch (error) {
      console.error('Failed to fetch stadium', error);
      return { name: 'stadium', capacity: 'capacity', location: 'location' };
    }
  }
}
