import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionSubnavComponent } from '../../../components/section-subnav/section-subnav.component';
import { faCircleInfo, faHouse, faShareNodes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  imports: [SectionSubnavComponent, RouterOutlet],
  template: `
    <app-section-subnav [routes]="navRoutes" [division]="'FutScorePerú'"></app-section-subnav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class IndexComponent {
  navRoutes = [
    { name: 'Home', route: 'home', icon: faHouse },
    { name: 'Acerca de', route: 'about', icon: faCircleInfo },
    { name: 'Social', route: 'social', icon: faShareNodes },
  ];
}