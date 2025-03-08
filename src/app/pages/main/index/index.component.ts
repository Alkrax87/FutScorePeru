import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionsNavComponent } from "../../../components/options-nav/options-nav.component";
import { faCircleInfo, faHouse, faShareNodes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  imports: [OptionsNavComponent, RouterOutlet],
  template: `
    <app-options-nav [options]="navOptions" [division]="'FutScorePerú'"></app-options-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class IndexComponent {
  navOptions = [
    { name: 'Home', route: 'home', icon: faHouse },
    { name: 'Acerca de', route: 'about', icon: faCircleInfo },
    { name: 'Social', route: 'social', icon: faShareNodes },
  ]
}