import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DivisionOverviewComponent } from "../../../components/division-overview/division-overview.component";
import { DivisionMapComponent } from "../../../components/division-map/division-map.component";
import { TitleComponent } from "../../../components/title/title.component";
import { LeagueSummaryCardComponent } from "../../../components/league-summary-card/league-summary-card.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { LeagueSummaryCard } from '../../../interfaces/ui-models/league-summary-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { LeagueProgressCardComponent } from "../../../components/league-progress-card/league-progress-card.component";

@Component({
  selector: 'app-l1-home',
  imports: [DivisionOverviewComponent, TitleComponent, FontAwesomeModule, LeagueSummaryCardComponent, LeagueProgressCardComponent, DivisionMapComponent],
  templateUrl: './l1-home.component.html',
  styles: ``,
})
export class L1HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  descriptionDivision: string = 'La Liga 1 es la máxima categoría del fútbol profesional en Perú, organizada por la Federación Peruana de Fútbol (FPF) y reúne a los mejores equipos del país en busca del título nacional.';
  tagsDivision: string[] = ['Liga 1', 'Primera División', 'Liga Profesional']
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Apurímac', teams: 1 },
    { name: 'Arequipa', teams: 1 },
    { name: 'Ayacucho', teams: 1 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Cusco', teams: 3 },
    { name: 'Huánuco', teams: 1 },
    { name: 'Junín', teams: 2 },
    { name: 'Lambayeque', teams: 1 },
    { name: 'Lima y Callao', teams: 4 },
    { name: 'Piura', teams: 2 },
    { name: 'Puno', teams: 1 },
  ];
  Shield = faShieldHalved;
  summaryData: LeagueSummaryCard = {
    teams: '18',
    stages: {
      total: 3,
      description: 'Apertura, Clausura y PlayOffs',
    },
    objective: 'Campeón Nacional',
  }

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionL1$,
      this.teamsService.dataTeamsL1$,
      this.mapService.dataMapL1$,
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