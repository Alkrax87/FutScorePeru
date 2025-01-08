import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Facebook,
  Instagram,
  LandPlot,
  LucideAngularModule,
  Twitter,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  readonly Facebook = Facebook;
  readonly Instagram = Instagram;
  readonly Twitter = Twitter;
  readonly LandPlot = LandPlot;

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
