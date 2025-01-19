import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchPerformanceService {
  constructor(private http: HttpClient) {}

  async fetchPerformanceL1(url: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<any>(url));
      return {
        apertura: response.apertura,
        clausura: response.clausura,
        sanction: response.saction,
      }
    } catch (error) {
      console.error('Failed to fetch performance', error);
    }
  }

  async fetchPerformanceL2(url: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<any>(url));
      return {
        regional: response.regional,
        grupos: response.grupos,
      }
    } catch (error) {
      console.error('Failed to fetch performance', error);
    }
  }
}
