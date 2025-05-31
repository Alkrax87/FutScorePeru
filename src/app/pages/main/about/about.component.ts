import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullseye, faHandFist, faTrophy, faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  Trophy = faTrophy;
  Signal = faBullseye;
  People = faUserGroup;
  Hand = faHandFist
}