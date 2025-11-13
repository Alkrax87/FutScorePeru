import { Injectable } from '@angular/core';
import { EntityNav } from '../interfaces/ui-models/entity-nav';
import { TeamDivision } from '../interfaces/ui-models/team-division';
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
import { TeamCPData } from '../interfaces/api-models/team-cp-data';
import { MatchCard } from '../interfaces/ui-models/match-card';
import { BracketData } from '../interfaces/api-models/bracket-data';
import { TeamCompactTable } from '../interfaces/ui-models/team-compact-table';

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

  teamDivisionMapper(dataTeams: TeamData[]): TeamDivision[] {
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

  teamDivisionMapperCP(dataTeams: TeamCPData[]): TeamDivision[] {
    const newData = [];

    for (const team of dataTeams) {
      newData.push({
        imageThumbnail: team.image,
      });
    }

    return newData;
  }

  teamCPMapMapper(dataTeams: TeamCPData[]): TeamMap[] {
    const newData = [];

    for (const teamCP of dataTeams) {
      newData.push({
        category: 4,
        teamId: teamCP.teamId,
        imageThumbnail: teamCP.image,
        alt: teamCP.abbreviation + '-logo',
        location: teamCP.location,
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
          capacity: stadium?.capacity ?? 0,
          location: stadium?.location ?? '',
        },
      });
    }

    return newData;
  }

  teamsTableMapper(dataTeams: TeamData[], dataPerformance: PerformanceData[], dataLastGames: LastGamesData[], phaseKey: string, teamGroup?: string, activePhase?: string): TeamTable[] {
    const newData: TeamTable[] = [];
    let phaseLastGames = phaseKey;

    if (activePhase !== undefined && activePhase !== null && activePhase !== '') {
      phaseLastGames = activePhase;
    }

    const performanceMap = new Map(
      dataPerformance.map((performance) => [performance.teamId, performance[phaseKey as keyof PerformanceData]])
    );
    const lastGamesMap = new Map(
      dataLastGames.map((lastGames) => [lastGames.teamId, lastGames[phaseLastGames as keyof LastGamesData]]),
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
        b.performance.gd - a.performance.gd ||
        b.performance.gf - a.performance.gf
    );
  }

  teamsTableCompactMapper(dataTeams: TeamData[], dataPerformance: PerformanceData[], phaseKey: string, teamGroup?: string): TeamCompactTable[] {
    const newData: TeamCompactTable[] = [];

    const performanceMap = new Map(
      dataPerformance.map((performance) => [performance.teamId, performance[phaseKey as keyof PerformanceData]])
    );

    for (const team of dataTeams) {
      if (team.groupFirstPhase === teamGroup || team.groupSecondPhase === teamGroup || !teamGroup) {
        const teamPerformance = performanceMap.get(team.teamId) as TeamCompactTable['performance'] | undefined;

        newData.push({
          category: team.category,
          teamId: team.teamId,
          name: team.name,
          abbreviation: team.abbreviation,
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          performance: {
            points: teamPerformance?.points ?? 0,
            gf: teamPerformance?.gf ?? 0,
            gd: teamPerformance?.gd ?? 0,
          },
        });
      }
    }

    return newData.sort(
      (a, b) =>
        b.performance.points - a.performance.points ||
        b.performance.gd - a.performance.gd ||
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

  bracketCardMapper(dataTeams: TeamCPData[] | TeamData[], bracketData: BracketData[]): MatchCard[] {
    const newData: MatchCard[] = [];
    const teamMap = new Map(
      dataTeams.map((team) => [team.teamId, team])
    );

    bracketData.forEach(bracket => {
      const team1 = teamMap.get(bracket.teamA.teamId);
      const team2 = teamMap.get(bracket.teamB.teamId);

      newData.push({
        matchKey: bracket.matchKey,
        nextKey: bracket.nextKey,
        teams: [
          {
            name: team1?.name ? team1?.name : '',
            image: team1?.image ? team1?.image : '',
            location: team1?.location ? team1?.location : '',
            results: {
              firstLegScore: bracket.teamA.results.firstLegScore,
              secondLegScore: bracket.teamA.results.secondLegScore,
              penalties: bracket.teamA.results.penalties,
            }
          },
          {
            name: team2?.name ? team2?.name : '',
            image: team2?.image ? team2?.image : '',
            location: team2?.location ? team2?.location : '',
            results: {
              firstLegScore: bracket.teamB.results.firstLegScore,
              secondLegScore: bracket.teamB.results.secondLegScore,
              penalties: bracket.teamB.results.penalties,
            }
          }
        ]
      });
    });

    return newData;
  }
}