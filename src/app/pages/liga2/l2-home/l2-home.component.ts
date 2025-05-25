import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DivisionInfoComponent } from "../../../components/division-info/division-info.component";
import { MapComponent } from '../../../components/map/map.component';
import { TitleComponent } from "../../../components/title/title.component";
import { CityCardComponent } from "../../../components/city-card/city-card.component";
import { LeagueSummaryCardComponent } from "../../../components/league-summary-card/league-summary-card.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { LeagueSummaryCard } from '../../../interfaces/ui-models/league-summary-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { LeagueProgressCardComponent } from "../../../components/league-progress-card/league-progress-card.component";

@Component({
  selector: 'app-l2-home',
  imports: [MapComponent, DivisionInfoComponent, TitleComponent, CityCardComponent, FontAwesomeModule, LeagueSummaryCardComponent, LeagueProgressCardComponent],
  templateUrl: './l2-home.component.html',
  styles: ``,
})
export class L2HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 1 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Ica', teams: 1 },
    { name: 'Loreto', teams: 1 },
    { name: 'La Libertad', teams: 3 },
    { name: 'Lambayeque', teams: 1 },
    { name: 'Lima y Callao', teams: 3 },
    { name: 'Moquegua', teams: 1 },
    { name: 'San Martín', teams: 1 },
    { name: 'Tacna', teams: 1 },
  ];
  Shield = faShieldHalved;
  summaryData: LeagueSummaryCard = {
    teams: 15,
    stages: {
      total: 3,
      description: 'Fase Regional, Fase Grupos y PlayOffs',
    },
    objective: 'Ascenso a la Liga 1',
  }

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionL2$,
      this.teamsService.dataTeamsL2$,
      this.mapService.dataMapL2$,
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([division, teams, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      this.dataMap = this.uiDataMapperService.teamMapMapper(teams);
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}