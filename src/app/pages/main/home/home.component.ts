import { Component } from '@angular/core';
import { TitleComponent } from "../../../components/title/title.component";
import { LeagueCardComponent } from "../../../components/league-card/league-card.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from "../../../components/btn/btn.component";

@Component({
  selector: 'app-home',
  imports: [TitleComponent, LeagueCardComponent, FontAwesomeModule, BtnComponent],
  templateUrl: './home.component.html',
  styles: `
    .bg {
      background-image: radial-gradient(#dc143c 2px, transparent 2px);
      background-size: 49px 49px;
    }
  `,
})
export class HomeComponent {
  Check = faCheck;

  tags: string[] = ['Clubes', 'Fixture', 'Resultados', 'Posiciones', 'Estadísticas', 'Técnicos', 'Y mucho más'];

  divisions: {
    title: string;
    image: string;
    teams: number;
    routes: string;
  }[] = [
    {
      title: 'Liga 1',
      image: 'assets/images/pages/liga-1.webp',
      teams: 19,
      routes: '/liga1',
    },
    {
      title: 'Liga 2',
      image: 'assets/images/pages/liga-2.webp',
      teams: 15,
      routes: '/liga2',
    },
    {
      title: 'Liga 3',
      image: 'assets/images/pages/liga-3.webp',
      teams: 37,
      routes: '/liga3',
    },
    {
      title: 'Copa Perú',
      image: 'assets/images/pages/copa-peru.webp',
      teams: 50,
      routes: '/copa-peru',
    },
  ];

  scrollTo() {
    const element = document.getElementById('leagues');

    if (element) {
      element.scrollIntoView();
    }
  }
}