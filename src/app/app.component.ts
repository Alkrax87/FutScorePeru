import { Component } from '@angular/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [TopBarComponent, NavbarComponent, RouterOutlet, FooterComponent],
  template: `
    <app-top-bar></app-top-bar>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: ``,
})
export class AppComponent {}
