import { Component } from '@angular/core';
import { MainBarComponent } from './components/main-bar/main-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FabComponent } from "./components/fab/fab.component";
@Component({
  selector: 'app-root',
  imports: [MainBarComponent, NavbarComponent, RouterOutlet, FooterComponent, FabComponent],
  template: `
    <app-main-bar></app-main-bar>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-fab></app-fab>
  `,
  styles: ``,
})
export class AppComponent {}
