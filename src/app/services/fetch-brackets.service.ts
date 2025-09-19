import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BracketsData } from '../interfaces/api-models/brackets-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchBracketsService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  cachedBracketL1: BracketsData[] | null = null;
  cachedBracketL2: BracketsData[] | null = null;
  cachedBracketL3: BracketsData[] | null = null;
  cachedBracketsCP: BracketsData[] | null = null;

  private bracketsL1Subject = new BehaviorSubject<BracketsData[]>([]);
  private bracketsL2Subject = new BehaviorSubject<BracketsData[]>([]);
  private bracketsL3Subject = new BehaviorSubject<BracketsData[]>([]);
  private bracketsCPSubject = new BehaviorSubject<BracketsData[]>([]);

  dataBracketsL1$ = this.bracketsL1Subject.asObservable();
  dataBracketsL2$ = this.bracketsL2Subject.asObservable();
  dataBracketsL3$ = this.bracketsL3Subject.asObservable();
  dataBracketsCP$ = this.bracketsCPSubject.asObservable();

  fetchBracketsL1() {
    if (this.cachedBracketL1) {
      this.bracketsL1Subject.next(this.cachedBracketL1);
      return;
    }

    this.http.get<BracketsData[]>(this.backendUrl + '/brackets/1').subscribe({
      next: (response) => {
        this.cachedBracketL1 = response;
        this.bracketsL1Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga 1) Brackets ', error),
    });
  }

  fetchBracketsL2() {
    if (this.cachedBracketL2) {
      this.bracketsL2Subject.next(this.cachedBracketL2);
      return;
    }

    this.http.get<BracketsData[]>(this.backendUrl + '/brackets/2').subscribe({
      next: (response) => {
        this.cachedBracketL2 = response;
        this.bracketsL2Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga 2) Brackets ', error),
    });
  }

  fetchBracketsL3() {
    if (this.cachedBracketL3) {
      this.bracketsL3Subject.next(this.cachedBracketL3);
      return;
    }

    this.http.get<BracketsData[]>(this.backendUrl + '/brackets/3').subscribe({
      next: (response) => {
        this.cachedBracketL3 = response;
        this.bracketsL3Subject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Liga 3) Brackets ', error),
    });
  }

  fetchBracketsCP() {
    if (this.cachedBracketsCP) {
      this.bracketsCPSubject.next(this.cachedBracketsCP);
      return;
    }

    this.http.get<BracketsData[]>(this.backendUrl + '/brackets/4').subscribe({
      next: (response) => {
        this.cachedBracketsCP = response;
        this.bracketsCPSubject.next(response);
      },
      error: (error) => console.error('Failed to fetch (Copa Perú) Brackets ', error),
    });
  }
}