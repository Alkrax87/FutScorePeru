import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PerformanceDataL1 } from '../interfaces/api-models/performance-data-l1';
import { PerformanceDataL2 } from '../interfaces/api-models/performance-data-l2';
import { PerformanceDataL3 } from '../interfaces/api-models/performance-data-l3';

@Injectable({
  providedIn: 'root',
})
export class FetchPerformanceService {
  constructor(private http: HttpClient) {}

  async fetchPerformanceL1(url: string): Promise<{apertura: object, clausura: object, sanction: number | null}> {
    try {
      const response = await firstValueFrom(this.http.get<PerformanceDataL1>(url));
      return {
        apertura: response.apertura,
        clausura: response.clausura,
        sanction: response.sanction,
      }
    } catch (error) {
      console.error('Failed to fetch performance', error);
      return { apertura: {}, clausura: {}, sanction: null };
    }
  }

  async fetchPerformanceL2(url: string): Promise<{regional: object, grupos: object}> {
    try {
      const response = await firstValueFrom(this.http.get<PerformanceDataL2>(url));
      return {
        regional: response.regional,
        grupos: response.grupos,
      }
    } catch (error) {
      console.error('Failed to fetch performance', error);
      return { regional: {}, grupos: {} };
    }
  }

  async fetchPerformanceL3(url: string): Promise<{regular: object, final: object}> {
    try {
      const response = await firstValueFrom(this.http.get<PerformanceDataL3>(url));
      return {
        regular: response.regular,
        final: response.final,
      }
    } catch (error) {
      console.error('Failed to fetch performance', error);
      return { regular: {}, final: {} };
    }
  }
}
