import { Injectable } from '@angular/core';
import { Team } from '../interfaces/api-models/team';
import { League } from '../interfaces/api-models/league';
import { TeamCP } from '../interfaces/api-models/team-cp';
import { Stadium } from '../interfaces/api-models/stadium';
import { TeamPerformance } from '../interfaces/api-models/teamPerformance';
import { TeamForm } from '../interfaces/api-models/teamForm';
import { Manager } from '../interfaces/api-models/manager';
import { BracketData } from '../interfaces/api-models/bracket-data';
import { EntityNav } from '../interfaces/ui-models/entity-nav';
import { TeamMap } from '../interfaces/ui-models/team-map';
import { TeamDivision } from '../interfaces/ui-models/team-division';
import { TeamCard } from '../interfaces/ui-models/team-card';
import { LeagueCard } from '../interfaces/ui-models/league-card';
import { TeamTable } from '../interfaces/ui-models/team-table';
import { ManagerCarousel } from '../interfaces/ui-models/manager-carousel';
import { StatisticCard } from '../interfaces/ui-models/statistic-card';
import { MatchCard } from '../interfaces/ui-models/match-card';
import { TeamMatchResults } from '../interfaces/api-models/teamMatchResults';
import { NextMatch } from '../interfaces/ui-models/team-overview';

@Injectable({
  providedIn: 'root',
})
export class UiDataMapperService {
  // ================================================
  // ================= Entity Nav ===================
  // ================================================
  teamsNavMapper(dataTeams: Team[]): EntityNav[] {
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
  leaguesNavMapper(dataLeagues: League[]): EntityNav[] {
    const newData = [];

    for (const league of dataLeagues) {
      newData.push({
        leagueId: league.leagueId,
        imageThumbnail: league.imageThumbnail,
        alt: league.alt
      });
    }

    return newData;
  }

  // ================================================
  // ===================== Map ======================
  // ================================================
  teamsMapMapper(dataTeams: Team[]): TeamMap[]  {
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
  teamsCPMapMapper(dataTeams: TeamCP[]): TeamMap[] {
    const newData = [];

    for (const [index, teamCP] of dataTeams.entries()) {
      newData.push({
        teamId: teamCP.teamId,
        imageThumbnail: teamCP.image ? teamCP.image : 'assets/images/pages/no-team.webp',
        alt: 'CPTeam' + (index + 1),
        location: teamCP.location,
      });
    }

    return newData;
  }

  // ================================================
  // =============== Division Teams =================
  // ================================================
  teamsDivisionMapper(dataTeams: Team[]): TeamDivision[] {
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
  teamsCPDivisionMapper(dataTeams: TeamCP[]): TeamDivision[] {
    const newData = [];

    for (const [index, team] of dataTeams.entries()) {
      newData.push({
        imageThumbnail: team.image ? team.image : 'assets/images/pages/no-team.webp',
        alt: 'CPTeam' + (index + 1),
      });
    }

    return newData;
  }

  // ================================================
  // ================= Teams Card ===================
  // ================================================
  teamsCardMapper(dataTeams: Team[], dataStadiums: Stadium[]): TeamCard[] {
    const newData = [];
    const stadiumMap = new Map(dataStadiums.map((stadium) => [stadium.stadiumId, stadium]));

    for (const team of dataTeams) {
      const stadium = stadiumMap.get(team.stadium);

      newData.push({
        category: team.category,
        teamId: team.teamId,
        name: team.name,
        image: team.image,
        alt: team.alt,
        location: team.location,
        color: team.color,
        stadium: {
          name: stadium?.name ?? 'Por Definir',
          capacity: stadium?.capacity ?? 0,
        },
      });
    }

    return newData;
  }

  // ================================================
  // ================= League Card ==================
  // ================================================
  leaguesCardMapper(dataLeague: League[]): LeagueCard[] {
    const newData = [];

    for (const league of dataLeague) {
      newData.push({
        leagueId: league.leagueId,
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

  // ================================================
  // ==================== Table =====================
  // ================================================
  teamsTableMapper(dataTeams: Team[], dataTeamsPerformance: TeamPerformance[], dataTeamsForm: TeamForm[], phase: 'overall' | 'phase1' | 'phase2', teamGroup?: string, activePhase?: 'phase1' | 'phase2'): TeamTable[] {
    const newData: TeamTable[] = [];
    let formPhase = phase;

    if (activePhase !== undefined) { formPhase = activePhase }

    const performanceMap = new Map(dataTeamsPerformance.map((performance) => [performance.teamId, performance[phase as keyof TeamPerformance]]));
    const formMap = new Map(dataTeamsForm.map((form) => [form.teamId, form[formPhase as keyof TeamForm]]));

    for (const team of dataTeams) {
      if (team.groupPhase1 === teamGroup || team.groupPhase2 === teamGroup || !teamGroup) {
        const teamPerformance = performanceMap.get(team.teamId) as TeamTable['performance'];
        const teamForm = formMap.get(team.teamId) as string[];

        newData.push({
          category: team.category,
          teamId: team.teamId,
          name: team.name,
          abbreviation: team.abbreviation,
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          form: teamForm ? teamForm.slice(-5) : ['','','','',''],
          performance: teamPerformance ?? { points: 0, played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0 },
        });
      }
    }

    return newData.sort((a, b) =>
      b.performance.points - a.performance.points ||
      b.performance.gd - a.performance.gd ||
      b.performance.gf - a.performance.gf
    );
  }

  // ================================================
  // =============== Managers Carousel ==============
  // ================================================
  managersCarouselMapper(dataTeams: Team[], dataManagers: Manager[]): ManagerCarousel[] {
    const newData = [];

    for (const team of dataTeams) {
      const managers = dataManagers.filter((manager) => manager.teamId === team.teamId);

      newData.push({
        category: team.category,
        teamId: team.teamId,
        name: team.name,
        imageThumbnail: team.imageThumbnail,
        alt: team.alt,
        managers: managers,
      });
    }

    return newData;
  }

  // ================================================
  // ================ Statistics Card ===============
  // ================================================
  statisticsCardMapper(dataTeams: Team[], dataStatistics: any, valueKey: string): StatisticCard[] {
    const newData = [];

    const teamMap = new Map(dataTeams.map((team) => [team.teamId, team]));

    for (const item of dataStatistics) {
      const team = teamMap.get(item.teamId);

      if (team) {
        newData.push({
          category: team.category,
          teamId: item.teamId,
          name: team.name,
          abbreviation: team.abbreviation,
          image: team.image,
          imageThumbnail: team.imageThumbnail,
          alt: team.alt,
          value: item[valueKey],
        });
      }
    }

    return newData;
  }

  // ================================================
  // ================= Brackeys Card ================
  // ================================================
  bracketsCardMapper(dataTeams: TeamCP[] | Team[], bracketData: BracketData[]): MatchCard[] {
    const newData: MatchCard[] = [];
    const teamMap = new Map(dataTeams.map((team) => [team.teamId, team]));

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

  // ================================================
  // =============== Overview Latest ==============
  // ================================================
  overviewLatestMapper(dataTeams: Team[], fixture: { round: number, home: string, away: string, postponed: boolean, date: Date | null }[], teamsMatchResults: TeamMatchResults[], teamId: string) {
    const newData = [];

    const teamMap = new Map(dataTeams.map((team) => [team.teamId, team]));
    const teamMatchResultsMap = new Map(teamsMatchResults.map((matchResult: TeamMatchResults) => [matchResult.teamId, matchResult]));

    for (const match of fixture) {
      const homeTeam = teamMap.get(match.home);
      const awayTeam = teamMap.get(match.away);

      if (homeTeam && awayTeam) {
        const homeResults = teamMatchResultsMap.get(homeTeam.teamId);
        const awayResults = teamMatchResultsMap.get(awayTeam.teamId);

        const resultHome = homeResults?.phase1[match.round - 1] ?? "";
        const resultAway = awayResults?.phase1[match.round - 1] ?? "";

        if (homeTeam.teamId === teamId) {
          newData.push({
            round: match.round,
            postponed: match.postponed,
            date: match.date,
            rivalTeamId: awayTeam.teamId,
            rivalTeamLogo: awayTeam.image,
            rivalTeamAlt: awayTeam.alt,
            homeTeamScore: resultHome as number,
            awayTeamScore: resultAway as number,
            home: true,
          });
        } else if (awayTeam.teamId === teamId) {
          newData.push({
            round: match.round,
            postponed: match.postponed,
            date: match.date,
            rivalTeamId: homeTeam.teamId,
            rivalTeamLogo: homeTeam.image,
            rivalTeamAlt: homeTeam.alt,
            homeTeamScore: resultHome as number,
            awayTeamScore: resultAway as number,
          });
        }
      } else {
        newData.push({
          round: match.round,
          postponed: match.postponed,
          date: match.date,
          homeTeamLogo: teamMap.get(match.home)?.image,
          homeTeamAlt: teamMap.get(match.home)?.alt,
          free: true,
          home: true,
        });
      }
    }

    return newData;
  }

  // ================================================
  // ============== Overview Next Match =============
  // ================================================
  overviewNextMatchMapper(dataTeams: Team[], nextMatchData: { round: number, home: string, away: string, postponed: boolean, date: Date | null }): NextMatch {
    const teamMap = new Map(dataTeams.map((team) => [team.teamId, team]));

    const homeTeam = teamMap.get(nextMatchData.home);
    const awayTeam = teamMap.get(nextMatchData.away);

    if (homeTeam && awayTeam) {
      return {
        round: nextMatchData.round,
        homeTeamId: homeTeam.teamId,
        awayTeamId: awayTeam.teamId,
        homeTeamName: homeTeam.name,
        awayTeamName: awayTeam.name,
        homeTeamAbbreviation: homeTeam.abbreviation,
        awayTeamAbbreviation: awayTeam.abbreviation,
        homeTeamImage: homeTeam.image,
        awayTeamImage: awayTeam.image,
        homeTeamAlt: homeTeam.alt,
        awayTeamAlt: awayTeam.alt,
        postponed: nextMatchData.postponed,
        date: nextMatchData.date,
        valid: true,
      }
    }

    return {
      valid: false,
    }
  }
}