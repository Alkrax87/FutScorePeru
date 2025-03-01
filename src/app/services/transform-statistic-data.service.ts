import { Injectable } from '@angular/core';
import { TeamData } from '../interfaces/api-models/team-data';

@Injectable({
  providedIn: 'root',
})
export class TransformStatisticDataService {
  constructor() {}

  transformData(dictionary: TeamData[], data: any, valueKey: string) {
    const teamMap = new Map(dictionary?.map((team) => [team.teamId, team]));

    return data.map((element: any) => {
      const team = teamMap.get(element.teamId);
      return {
        abbreviation: team?.abbreviation,
        image: team?.image,
        alt: team?.alt,
        value: element[valueKey],
        url: team?.url,
        color: team?.color?.c1,
      };
    });
  }
}