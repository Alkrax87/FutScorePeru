import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEllipsis, faFlag, faLocationDot, faRing } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team-page',
  imports: [FontAwesomeModule],
  templateUrl: './team-page.component.html',
  styles: `
    .image {
      background-image: url('/assets/images/pages/Background-pattern.png');
      background-size: cover;
    }
  `,
})
export class TeamPageComponent {
  teamData: {
    division: string;
    name: string;
    image: string;
    alt: string;
    location: string;
    foundation: number;
    background: string;
  } = {
    division: 'Liga 1',
    name: 'FBC Melgar',
    image: 'assets/images/liga-1/mel.webp',
    alt: 'MEL-logo',
    location: 'Arequipa',
    foundation: 1915,
    background: 'https://imgmedia.libero.pe/600x330/libero/original/2025/01/14/67869952dc93420f8f5fe169.webp',
  };

  Flag = faFlag;
  Location = faLocationDot;
  Stadium = faRing;
  Divider = faEllipsis;

}
