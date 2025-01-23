import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ManagerData } from '../interfaces/api-models/manager-data';

@Injectable({
  providedIn: 'root',
})
export class FetchManagerService {
  constructor(private http: HttpClient) {}

  async fetchManager(url: string): Promise<ManagerData[]> {
    try {
      const response = await firstValueFrom(this.http.get<ManagerData[]>(url));
      return response;
    } catch (error) {
      console.error('Failed to fetch managers', error);
      return [
        {
          managerId: '',
          teamId: '',
          name: '',
          cod: '',
          photo: '',
        },
      ];
    }
  }
}
