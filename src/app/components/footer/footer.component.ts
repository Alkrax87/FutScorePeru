import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule , RouterModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  Facebook = faFacebookF;
  Instagram = faInstagram;
  Twitter = faXTwitter;
  Feather = faFeather;

  routesWeb = [
    { path: '/home', name: 'Home' },
    { path: '/about', name: 'Acerca de' },
    { path: '/social', name: 'Social' },
  ];

  routesLigas = [
    { path: '/liga1', name: 'Liga 1' },
    { path: '/liga2', name: 'Liga 2' },
    { path: '/liga3', name: 'Liga 3' },
    { path: '/copa-peru', name: 'Copa Perú' },
  ];
}
