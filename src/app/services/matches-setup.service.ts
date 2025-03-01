import { Injectable } from '@angular/core';
import { TeamData } from '../interfaces/api-models/team-data';
import { ResultsData } from '../interfaces/api-models/results-data';
import { StadiumData } from '../interfaces/api-models/stadium-data';
import { FixtureCard } from '../interfaces/ui-models/fixture-card';

@Injectable({
  providedIn: 'root',
})
export class MatchesSetupService {
  constructor() {}

  transformDataForFixture(
    teams: TeamData[],
    fixture: any,
    results: ResultsData[],
    stadiums: StadiumData[],
    stage: string
  ) {
    const stadiumMap = new Map(stadiums.map((stadium) => [stadium.stadiumId, stadium]));
    const teamMap = new Map(teams.map((team) => [team.teamId, team]));
    const resultsMap = new Map(results.map((result: any) => [result.teamId, result]));

    let index = 0;
    const mergedData = [];

    for (const key of fixture) {
      const rounds: FixtureCard[] = [];

      for (const element of key) {
        const homeTeam = teamMap.get(element.home);
        const awayTeam = teamMap.get(element.away);

        if (homeTeam && awayTeam) {
          const stadium = stadiumMap.get(homeTeam.stadium);

          const homeResults = resultsMap.get(homeTeam.teamId);
          const awayResults = resultsMap.get(awayTeam.teamId);

          const resultHome = homeResults[stage]?.[index] ?? "";
          const resultAway = awayResults[stage]?.[index] ?? "";

          rounds.push({
            stadium: stadium?.name ? stadium.name : "Sin Determinar",
            team1: homeTeam.name,
            team2: awayTeam.name,
            abbreviation1: homeTeam.abbreviation,
            abbreviation2: awayTeam.abbreviation,
            logo1: homeTeam.image,
            logo2: awayTeam.image,
            alt1: homeTeam.alt,
            alt2: awayTeam.alt,
            result1: resultHome,
            result2: resultAway,
          });
        }
      }
      if (rounds.length > 0) { mergedData.push(rounds) }
      index++;
    }

    return mergedData;
  }
}
