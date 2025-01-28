import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchMapService {
  constructor(private http: HttpClient) {}

  fetchMap(value: number) {
    return fetch('assets/json/mapL' + value + '.json')
      .then((response) => response.json()).then((data) => data)
      .catch((error) => console.log("Error: ", error)
      )
  }

  // async fetchMap(url: string): Promise<{name: string, capacity:string, location: string}> {
  //   try {
  //     const response = await firstValueFrom(this.http.get<any>(url));
  //     return {
  //       name: response.name || 'stadium',
  //       capacity: response.capacity || 'capacity',
  //       location: response.location || 'location'
  //     };
  //   } catch (error) {
  //     console.error('Failed to fetch stadium', error);
  //     return { name: 'stadium', capacity: 'capacity', location: 'location' };
  //   }
  // }
}
