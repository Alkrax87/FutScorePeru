import { Injectable } from '@angular/core';
import { Team } from '../interfaces/api-models/team';
import { TeamMatchResults } from '../interfaces/api-models/teamMatchResults';
import { FixtureByDate, FixtureMatch } from '../interfaces/ui-models/fixture-models';
import { Fixture } from '../interfaces/api-models/fixture';

@Injectable({
  providedIn: 'root',
})
export class MatchesSetupService {
  // ================================================
  // ================= Fixture Card =================
  // ================================================
  transformDataForFixture(teams: Team[], fixture: Fixture['phase1' | 'phase2'], teamsMatchResults: TeamMatchResults[], phase: 'phase1' | 'phase2'): FixtureByDate[][] {
    const teamMap = new Map(teams.map((team) => [team.teamId, team]));
    const teamMatchResultsMap = new Map(teamsMatchResults.map((matchResult: TeamMatchResults) => [matchResult.teamId, matchResult]));

    let index = 0;
    const mergedData = [];

    for (const key of fixture) {
      const rounds: FixtureMatch[] = [];

      for (const element of key.matches) {
        const homeTeam = teamMap.get(element.home);
        const awayTeam = teamMap.get(element.away);
        const postponed = element.postponed;
        const date = element.date;
        const group = element.group;

        if (homeTeam && awayTeam) {
          const homeResults = teamMatchResultsMap.get(homeTeam.teamId);
          const awayResults = teamMatchResultsMap.get(awayTeam.teamId);

          const resultHome = homeResults?.[phase]?.[index] ?? null;
          const resultAway = awayResults?.[phase]?.[index] ?? null;

          rounds.push({
            category: homeTeam.category,
            homeTeamId: homeTeam.teamId,
            awayTeamId: awayTeam.teamId,
            homeTeamName: homeTeam.name,
            awayTeamName: awayTeam.name,
            homeTeamAbbreviation: homeTeam.abbreviation,
            awayTeamAbbreviation: awayTeam.abbreviation,
            homeTeamImageThumbnail: homeTeam.imageThumbnail,
            awayTeamImageThumbnail: awayTeam.imageThumbnail,
            homeTeamAlt: homeTeam.alt,
            awayTeamAlt: awayTeam.alt,
            homeTeamResult: resultHome,
            awayTeamResult: resultAway,
            postponed: postponed,
            date: date,
            group: group,
          });
        }
      }
      if (rounds.length > 0) { mergedData.push(rounds) }
      index++;
    }

    return mergedData.map((round: FixtureMatch[]) => this.groupMatchesByDate(round));
  }

  private groupMatchesByDate(matches: FixtureMatch[]): FixtureByDate[] {
    const map = new Map<string, FixtureByDate>();
    const UNDEFINED_KEY = 'undefined';

    for (const match of matches) {
      let key: string;
      let date: Date | null;

      if (match.date) {
        const dateObj = new Date(match.date);

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();

        key = `${year}-${month}-${day}`;
        date = dateObj;
      } else {
        key = UNDEFINED_KEY;
        date = null;
      }

      if (!map.has(key)) {
        map.set(key, {
          date,
          matches: [],
        });
      }

      map.get(key)!.matches.push(match);
    }

    for (const block of map.values()) {
      this.sortMatchesByTime(block.matches);
    }

    const definedDates = Array.from(map.values()).filter(item => item.date !== null).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    const undefinedDates = Array.from(map.values()).filter(item => item.date === null);

    return [...definedDates, ...undefinedDates];
  }

  private sortMatchesByTime(matches: FixtureMatch[]): FixtureMatch[] {
    return matches.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;

      return (new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }

  // ================================================
  // =============== Team Fixture Card ==============
  // ================================================
  transformDataForTeamFixture(teams: Team[], fixture: any, results: TeamMatchResults[]) {
    const stageList = ['phase1', 'phase2'];
    const teamMap = new Map(teams.map((team) => [team.teamId, team]));
    const resultsMap = new Map(results.map((result: any) => [result.teamId, result]));

    const teamFixture: { [key: string]: any[] } = {};

    for (const stage of stageList) {
      const mergedData = [];
      let index = 0;

      const fixtureStage = fixture[stage];
      if (!fixtureStage) continue;

      for (const match of fixtureStage) {
        const homeTeam = teamMap.get(match.home);
        const awayTeam = teamMap.get(match.away);

        if (match.away === null || match.away === undefined) {
          if (homeTeam) {
            mergedData.push({
              round: match.round,
              homeTeamLogo: homeTeam.image,
              homeTeamAlt: homeTeam.alt,
              free: true,
            });

            index++;
          }
          continue;
        }

        if (homeTeam && awayTeam) {
          const homeResults = resultsMap.get(homeTeam.teamId);
          const awayResults = resultsMap.get(awayTeam.teamId);

          const resultHome = homeResults[stage]?.[index] ?? "";
          const resultAway = awayResults[stage]?.[index] ?? "";

          mergedData.push({
            round: match.round,
            postponed: match.postponed,
            date: match.date,
            homeTeamId: homeTeam.teamId,
            awayTeamId: awayTeam.teamId,
            homeTeamLogo: homeTeam.image,
            awayTeamLogo: awayTeam.image,
            homeTeamAlt: homeTeam.alt,
            awayTeamAlt: awayTeam.alt,
            homeTeamName: homeTeam.name,
            awayTeamName: awayTeam.name,
            homeTeamScore: resultHome,
            awayTeamScore: resultAway,
            free: false,
          });
        }
        index++;
      }

      teamFixture[stage] = mergedData;
    }

    return teamFixture;
  }
}