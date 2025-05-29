import { Injectable } from '@angular/core';
import { TeamNav } from '../interfaces/ui-models/team-nav';
import { TeamMap } from '../interfaces/ui-models/team-map';
import { TeamCard } from '../interfaces/ui-models/team-card';
import { ManagerCarousel } from '../interfaces/ui-models/manager-carousel';
import { StatisticCard } from '../interfaces/ui-models/statistic-card';
import { TeamData } from '../interfaces/api-models/team-data';
import { StadiumData } from '../interfaces/api-models/stadium-data';
import { ManagerData } from '../interfaces/api-models/manager-data';

@Injectable({
  providedIn: 'root',
})
export class UiDataMapperService {
  constructor() {}

  teamsNavMapper(dataTeams: TeamData[]): TeamNav[] {
    const newData = [];

    for (const team of dataTeams) {
      newData.push({
        category: team.category,
        teamId: team.teamId,
        imageThumbnail: team.imageThumbnail,
        alt: team.alt
      });
    }

    return newData;
  }

  teamMapMapper(dataTeams: TeamData[]): TeamMap[]  {
    const newData = [];

    for (const team of dataTeams) {
      newData.push({
        category: team.category,
        teamId: team.teamId,
        imageThumbnail: team.imageThumbnail,
        alt: team.alt,
        location: team.location,
      });
    }

    return newData;
  }

  teamCardMapper(dataTeams: TeamData[], dataStadiums: StadiumData[]): TeamCard[] {
    const newData = [];
    const stadiumMap = new Map(
      dataStadiums.map((stadium) => [stadium.stadiumId, stadium])
    );

    for (const team of dataTeams) {
      const stadium = stadiumMap.get(team.stadium);

      newData.push({
        category: team.category,
        teamId: team.teamId,
        name: team.name,
        image: team.image,
        alt: team.alt,
        color: team.color,
        stadium: {
          name: stadium?.name ?? 'Por Definir',
          capacity: stadium?.capacity ?? '',
          location: stadium?.location ?? '',
        },
      });
    }

    return newData;
  }

  managerCarouselMapper(dataTeams: TeamData[], dataManagers: ManagerData[]): ManagerCarousel[] {
    const newData = [];

    for (const team of dataTeams) {
      const managers = dataManagers.filter(
        (manager) => manager.teamId === team.teamId
      );

      newData.push({
        category: team.category,
        teamId: team.teamId,
        name: team.name,
        image: team.image,
        alt: team.alt,
        manager: managers,
      });
    }

    return newData;
  }

  statisticsCardMapper(dataTeams: TeamData[], statistics: any, valueKey: string): StatisticCard[] {
    const teamMap = new Map(
      dataTeams.map((team) => [team.teamId, team])
    );

    return statistics.map((element: any) => {
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