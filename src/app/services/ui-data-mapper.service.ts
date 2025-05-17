import { Injectable } from '@angular/core';
import { TeamData } from '../interfaces/api-models/team-data';
import { StadiumData } from '../interfaces/api-models/stadium-data';
import { TeamCard } from '../interfaces/ui-models/team-card';

@Injectable({
  providedIn: 'root',
})
export class UiDataMapperService {
  constructor() {}

  teamCardMapper(dataTeams: TeamData[], dataStadiums: StadiumData[]) {
    let newData: TeamCard[] = [];
    const teamMap = new Map(
      dataStadiums.map((stadium) => [stadium.stadiumId, stadium])
    );

    for (const team of dataTeams) {
      const stadium = teamMap.get(team.stadium);

      newData.push({
        category: team.category,
        teamId: team.teamId,
        name: team.name,
        abbreviation: team.abbreviation,
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
}
