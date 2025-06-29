import { Injectable } from '@angular/core';
import { TeamTable } from '../interfaces/ui-models/team-table';

@Injectable({
  providedIn: 'root',
})
export class SortDataTableService {
  constructor() {}

  sortTeams(teams: TeamTable[]) {
    return teams.sort((a, b) =>
      b.performance.points - a.performance.points ||
      b.performance.dg - a.performance.dg ||
      b.performance.gf - a.performance.gf
    );
  }
}