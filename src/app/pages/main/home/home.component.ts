import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  divisions: {
    title: string;
    image: string;
    teams: number;
    routes: string;
  }[] = [
    {
      title: "Liga 1",
      image: "assets/images/pages/liga-1.webp",
      teams: 19,
      routes: "/liga1"
    },
    {
      title: "Liga 2",
      image: "assets/images/pages/liga-2.webp",
      teams: 15,
      routes: "/liga2"
    },
    {
      title: "Liga 3",
      image: "assets/images/pages/liga-3.webp",
      teams: 37,
      routes: "/liga3"
    },
    {
      title: "Copa Perú",
      image: "assets/images/pages/copa-peru.webp",
      teams: 50,
      routes: "/copa-peru"
    },
  ]

  Shield = faShieldHalved;
  Arrow = faAngleRight;
}