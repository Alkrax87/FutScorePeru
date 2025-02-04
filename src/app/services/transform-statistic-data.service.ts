import { Injectable } from '@angular/core';
import { TeamDataL1 } from '../interfaces/api-models/team-data-l1';
import { TeamDataL2 } from '../interfaces/api-models/team-data-l2';
import { TeamDataL3 } from '../interfaces/api-models/team-data-l3';

@Injectable({
  providedIn: 'root',
})
export class TransformStatisticDataService {
  constructor() {}

  transformData(dictionary: TeamDataL1[] | TeamDataL2[] | TeamDataL3[] | null, data: any, valueKey: string) {
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