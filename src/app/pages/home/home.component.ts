import { Component, inject } from '@angular/core';
import { MainDivisionCardComponent } from "../../components/main-division-card/main-division-card.component";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faBarsStaggered, faCalendarDays, faFlag, faNetworkWired, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from "../../components/btn/btn.component";
import { FetchDivisionsService } from '../../services/fetch-divisions.service';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Division } from '../../interfaces/api-models/division';
import { SubtitleComponent } from '../../components/subtitle/subtitle.component';
import { NgClass } from '@angular/common';
import { DivisionFixtureComponent } from '../../components/division-fixture/division-fixture.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FaIconComponent, BtnComponent, MainDivisionCardComponent, SubtitleComponent, NgClass, DivisionFixtureComponent, RouterLink],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  private divisionsService = inject(FetchDivisionsService);

  activeDivision: number = 1;
  divisions: Division[] = [];

  Calendar = faCalendarDays;
  Arrow = faArrowRight;

  constructor() {
    this.divisionsService.fetchDivisionL1();
    this.divisionsService.fetchDivisionL2();
    this.divisionsService.fetchDivisionL3();
    this.divisionsService.fetchDivisionCP();

    combineLatest([
      this.divisionsService.divisionL1$,
      this.divisionsService.divisionL2$,
      this.divisionsService.divisionL3$,
      this.divisionsService.divisionCP$,
    ]).pipe(takeUntilDestroyed()).subscribe({
      next: ([d1, d2, d3, dcp]) => {
        if (d1.data !== null && d2.data !== null && d3.data !== null && dcp.data !== null) {
          this.divisions = [d1.data, d2.data, d3.data, dcp.data];
        }
      }
    });
  }

  get quickLinks() {
    return [
      {
        name: this.activeDivision === 4 ? 'Ligas' : 'Clubes',
        description: this.activeDivision === 4 ? 'Explora las ligas regionales' : 'Conoce los equipos y sus perfiles',
        route: this.activeDivision === 4 ? 'copa-peru/ligas' : 'liga' + this.activeDivision + '/clubes',
        icon: this.activeDivision === 4 ? faFlag : faShieldHalved,
      },
      {
        name: 'Tabla',
        description: 'Revisa posiciones y rendimiento',
        route: this.activeDivision === 4 ? 'copa-peru/tabla' : 'liga' + this.activeDivision + '/tabla',
        icon: faBarsStaggered,
      },
      {
        name: 'Play-Offs',
        description: 'Sigue las llaves de clasificación',
        route: this.activeDivision === 4 ? 'copa-peru/playoffs' : 'liga' + this.activeDivision + '/playoffs',
        icon: faNetworkWired,
      },
    ]
  }

  selectDivision(value: number) {
    this.activeDivision = value;
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
