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
  selector: 'app-l3-home',
  imports: [DivisionOverviewComponent, TitleComponent, FontAwesomeModule, LeagueSummaryCardComponent, LeagueProgressCardComponent, DivisionMapComponent],
  templateUrl: './l3-home.component.html',
  styles: ``,
})
export class L3HomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private uiDataMapperService: UiDataMapperService
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  descriptionDivision: string = 'La Liga 3 es la tercera categoría del fútbol semiprofesional en Perú, organizada por la Federación Peruana de Fútbol (FPF), donde equipos buscan ascender a la Liga 2.';
  tagsDivision: string[] = ['Liga 3', 'Tercera División', 'Liga Semiprofesional'];
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 1 },
    { name: 'Amazonas', teams: 1 },
    { name: 'Apurímac', teams: 1 },
    { name: 'Arequipa', teams: 2 },
    { name: 'Ayacucho', teams: 1 },
    { name: 'Cajamarca', teams: 1 },
    { name: 'Cusco', teams: 2 },
    { name: 'Huánuco', teams: 1 },
    { name: 'Huancavelica', teams: 1 },
    { name: 'Ica', teams: 1 },
    { name: 'Junín', teams: 3 },
    { name: 'Loreto', teams: 1 },
    { name: 'La Libertad', teams: 2 },
    { name: 'Lambayeque', teams: 3 },
    { name: 'Lima y Callao', teams: 7 },
    { name: 'Madre de Dios', teams: 1 },
    { name: 'Moquegua', teams: 1 },
    { name: 'Pasco', teams: 1 },
    { name: 'Piura', teams: 1 },
    { name: 'Puno', teams: 1 },
    { name: 'San Martín', teams: 1 },
    { name: 'Tacna', teams: 1 },
    { name: 'Tumbes', teams: 1 },
    { name: 'Ucayali', teams: 1 },
  ];
  Shield = faShieldHalved;
  summaryData: LeagueSummaryCard = {
    teams: '37',
    stages: {
      total: 3,
      description: 'Fase Regional, Fase Final y PlayOffs',
    },
    objective: 'Ascenso a la Liga 2',
  }

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionL3$,
      this.teamsService.dataTeamsL3$,
      this.mapService.dataMapL3$,
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