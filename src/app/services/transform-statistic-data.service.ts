import { Injectable } from '@angular/core';
import { TeamData } from '../interfaces/api-models/team-data';
import { StatisticCard } from '../interfaces/ui-models/statistic-card';

@Injectable({
  providedIn: 'root',
})
export class TransformStatisticDataService {
  constructor() {}

  transformData(dictionary: TeamData[], data: any, valueKey: string): StatisticCard[] {
    const teamMap = new Map(dictionary?.map((team) => [team.teamId, team]));

    return data.map((element: any) => {
      const team = teamMap.get(element.teamId);
      return {
        category: team?.category,
        teamId: element.teamId,
        name: team?.name,
        abbreviation: team?.abbreviation,
        image: team?.image,
        alt: team?.alt,
        value: element[valueKey],
      };
    });
  }
}