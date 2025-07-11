import { Injectable } from '@angular/core';
import { EntityNav } from '../interfaces/ui-models/entity-nav';
import { TeamMap } from '../interfaces/ui-models/team-map';
import { TeamCard } from '../interfaces/ui-models/team-card';
import { TeamTable } from '../interfaces/ui-models/team-table';
import { PerformanceData } from '../interfaces/api-models/performance-data';
import { LastGamesData } from '../interfaces/api-models/last-games-data';
import { ManagerCarousel } from '../interfaces/ui-models/manager-carousel';
import { StatisticCard } from '../interfaces/ui-models/statistic-card';
import { TeamData } from '../interfaces/api-models/team-data';
import { StadiumData } from '../interfaces/api-models/stadium-data';
import { ManagerData } from '../interfaces/api-models/manager-data';
import { LeagueData } from '../interfaces/api-models/league-data';
import { TeamCardCp } from '../interfaces/ui-models/team-card-cp';

@Injectable({
  providedIn: 'root',
})
export class UiDataMapperService {
  constructor() {}

  teamsNavMapper(dataTeams: TeamData[]): EntityNav[] {
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

  teamsTableMapper(dataTeams: TeamData[], dataPerformance: PerformanceData[], dataLastGames: LastGamesData[], stageKey: string, teamGroup?: string): TeamTable[] {
    const newData: TeamTable[] = [];
    const performanceMap = new Map(
      dataPerformance.map((performance) => [performance.teamId, performance[stageKey as keyof PerformanceData]])
    );
    const lastGamesMap = new Map(
      dataLastGames.map((lastGames) => [lastGames.teamId, lastGames[stageKey as keyof LastGamesData]]),
    );

    for (const team of dataTeams) {
      if (team.groupFirstPhase === teamGroup || team.groupSecondPhase === teamGroup || !teamGroup) {
        const teamPerformance = performanceMap.get(team.teamId) as TeamTable['performance'];
        const teamLastGames = lastGamesMap.get(team.teamId) as string[];

        newData.push({
          category: team.category,
          teamId: team.teamId,
          name: team.name,
          abbreviation: team.abbreviation,
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          performance: teamPerformance,
          lastgames: teamLastGames ? teamLastGames.slice(-5) : ['','','','',''],
        });
      }
    }

    return newData.sort(
      (a, b) =>
        b.performance.points - a.performance.points ||
        b.performance.dg - a.performance.dg ||
        b.performance.gf - a.performance.gf
    );
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
        imageThumbnail: team?.imageThumbnail,
        alt: team?.alt,
        value: element[valueKey],
      };
    });
  }

  leagueNavMapper(dataLeagues: LeagueData[]): EntityNav[] {
    const newData = [];

    for (const league of dataLeagues) {
      newData.push({
        category: league.category,
        leagueId: league.leagueId,
        imageThumbnail: league.imageThumbnail,
        alt: league.alt
      });
    }

    return newData;
  }

  leagueCardMapper(dataLeague: LeagueData[]): TeamCardCp[] {
    const newData = [];

    for (const league of dataLeague) {
      newData.push({
        leagueId: league.leagueId,
        category: league.category,
        region: league.location,
        flag: league.image,
        color: {
          c1: league.color.c1,
          c2: league.color.c2,
        },
        teams: league.teams.map((team) => ({
          name: team.name,
          image: team.image,
          city: team.city,
        })),
      });
    }

    return newData;
  }
}