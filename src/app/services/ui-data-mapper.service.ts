import { Injectable } from '@angular/core';
import { TeamNav } from '../interfaces/ui-models/team-nav';
import { TeamData } from '../interfaces/api-models/team-data';
import { StadiumData } from '../interfaces/api-models/stadium-data';
import { TeamCard } from '../interfaces/ui-models/team-card';
import { ManagerCarousel } from '../interfaces/ui-models/manager-carousel';
import { ManagerData } from '../interfaces/api-models/manager-data';

@Injectable({
  providedIn: 'root',
})
export class UiDataMapperService {
  constructor() {}

  teamsNavMapper(dataTeams: TeamData[]): TeamNav[] {
    let newData: TeamNav[] = [];

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

  teamCardMapper(dataTeams: TeamData[], dataStadiums: StadiumData[]) {
    let newData: TeamCard[] = [];
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

  managerCarouselMapper(dataTeams: TeamData[], dataManagers: ManagerData[]) {
    let newData: ManagerCarousel[] = [];

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
}
