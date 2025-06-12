import { Component } from '@angular/core';
import { FetchDivisionService } from '../../../services/fetch-division.service';
import { FetchTeamDataService } from '../../../services/fetch-team-data.service';
import { FetchMapService } from '../../../services/fetch-map.service';
import { UiDataMapperService } from '../../../services/ui-data-mapper.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DivisionInfoComponent } from "../../../components/division-info/division-info.component";
import { MapComponent } from "../../../components/map/map.component";
import { TitleComponent } from "../../../components/title/title.component";
import { CityCardComponent } from "../../../components/city-card/city-card.component";
import { LeagueSummaryCardComponent } from "../../../components/league-summary-card/league-summary-card.component";
import { DivisionData } from '../../../interfaces/api-models/division-data';
import { MapElement } from '../../../interfaces/api-models/map-element';
import { TeamMap } from '../../../interfaces/ui-models/team-map';
import { LeagueSummaryCard } from '../../../interfaces/ui-models/league-summary-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cp-home',
  imports: [DivisionInfoComponent, CityCardComponent, FontAwesomeModule, MapComponent, TitleComponent, LeagueSummaryCardComponent],
  templateUrl: './cp-home.component.html',
  styles: ``,
})
export class CpHomeComponent {
  constructor(
    private divisionService: FetchDivisionService,
    private teamsService: FetchTeamDataService,
    private mapService: FetchMapService,
    private uiDataMapperService: UiDataMapperService,
  ) {}

  private unsubscribe$ = new Subject<void>();
  dataDivision: DivisionData | null = null;
  descriptionDivision: string = 'La Copa Perú es un torneo de fútbol amateur en Perú, organizado por la Federación Peruana de Fútbol (FPF) y la Subcomisión Nacional de Fútbol Aficionado, donde equipos de diversas regiones del país buscan ascender a la Liga 2 y Liga 3.';
  tagsDivision: string[] = ['Copa Perú', 'Cuarta Division', 'Fútbol Amateur'];
  mapConstructor: MapElement[] = [];
  dataMap: TeamMap[] = [];
  regions: { name: string; teams: number }[] = [
    { name: 'Áncash', teams: 3 },
    { name: 'Amazonas', teams: 2 },
    { name: 'Apurímac', teams: 3 },
    { name: 'Arequipa', teams: 3 },
    { name: 'Ayacucho', teams: 3 },
    { name: 'Cajamarca', teams: 2 },
    { name: 'Cusco', teams: 3 },
    { name: 'Huánuco', teams: 3 },
    { name: 'Huancavelica', teams: 2 },
    { name: 'Ica', teams: 3 },
    { name: 'Junín', teams: 3 },
    { name: 'Loreto', teams: 2 },
    { name: 'La Libertad', teams: 3 },
    { name: 'Lambayeque', teams: 3 },
    { name: 'Lima y Callao', teams: 5 },
    { name: 'Madre de Dios', teams: 2 },
    { name: 'Moquegua', teams: 2 },
    { name: 'Pasco', teams: 2 },
    { name: 'Piura', teams: 3 },
    { name: 'Puno', teams: 3 },
    { name: 'San Martín', teams: 3 },
    { name: 'Tacna', teams: 2 },
    { name: 'Tumbes', teams: 2 },
    { name: 'Ucayali', teams: 2 },
  ];
  Shield = faShieldHalved;
  summaryData: LeagueSummaryCard = {
      teams: '+10k',
      stages: {
        total: 6,
        description: 'Distrital, Provincial, Departamental y Nacional',
      },
      objective: 'Ascenso Liga 2 y Liga 3',
    }

  ngOnInit() {
    combineLatest([
      this.divisionService.dataDivisionCP$,
      // this.teamsService.dataTeamsCP$,
      this.mapService.dataMapCP$,
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([division, map]) => {
      this.dataDivision = division;
      this.mapConstructor = map;
      // this.dataMap = this.uiDataMapperService.teamMapMapper(teams);
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}