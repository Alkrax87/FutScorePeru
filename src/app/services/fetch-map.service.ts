import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapElement } from '../interfaces/api-models/map-element';

@Injectable({
  providedIn: 'root',
})
export class FetchMapService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedMapL1: MapElement[] | null = null;
  cachedMapL2: MapElement[] | null = null;
  cachedMapL3: MapElement[] | null = null;
  cachedMapCP: MapElement[] | null = null;

  private mapL1Subject = new BehaviorSubject<MapElement[]>([]);
  private mapL2Subject = new BehaviorSubject<MapElement[]>([]);
  private mapL3Subject = new BehaviorSubject<MapElement[]>([]);
  private mapCPSubject = new BehaviorSubject<MapElement[]>([]);

  dataMapL1$ = this.mapL1Subject.asObservable();
  dataMapL2$ = this.mapL2Subject.asObservable();
  dataMapL3$ = this.mapL3Subject.asObservable();
  dataMapCP$ = this.mapCPSubject.asObservable();

  fetchMapL1() {
    if (this.cachedMapL1) {
      this.mapL1Subject.next(this.cachedMapL1);
      return;
    }

    this.http.get<MapElement[]>(this.backendUrl + '/map/1').subscribe({
      next: (response) => {
        this.cachedMapL1 = response;
        this.mapL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga1) map ', error),
    });
  }

  fetchMapL2() {
    if (this.cachedMapL2) {
      this.mapL2Subject.next(this.cachedMapL2);
      return;
    }

    this.http.get<MapElement[]>(this.backendUrl + '/map/2').subscribe({
      next: (response) => {
        this.cachedMapL2 = response;
        this.mapL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga2) map ', error),
    });
  }

  fetchMapL3() {
    if (this.cachedMapL3) {
      this.mapL3Subject.next(this.cachedMapL3);
      return;
    }

    this.http.get<MapElement[]>(this.backendUrl + '/map/3').subscribe({
      next: (response) => {
        this.cachedMapL3 = response;
        this.mapL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga3) map ', error),
    });
  }

  fetchMapCP() {
    if (this.cachedMapCP) {
      this.mapCPSubject.next(this.cachedMapCP);
      return;
    }

    this.http.get<MapElement[]>(this.backendUrl + '/map/4').subscribe({
      next: (response) => {
        this.cachedMapCP = response;
        this.mapCPSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Copa Perú) map ', error),
    });
  }
}