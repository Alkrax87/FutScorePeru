import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchMapService {
  constructor() {}

  fetchMap(value: number) {
    return fetch('assets/json/mapL' + value + '.json')
      .then((response) => response.json()).then((data) => data)
      .catch((error) => console.log("Error: ", error)
      )
  }
}
