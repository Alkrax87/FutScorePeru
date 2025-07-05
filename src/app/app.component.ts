import { Component } from '@angular/core';
import { MainBarComponent } from './components/main-bar/main-bar.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FabComponent } from "./components/fab/fab.component";
@Component({
  selector: 'app-root',
  imports: [MainBarComponent, MainNavComponent, RouterOutlet, FooterComponent, FabComponent],
  template: `
    <app-main-bar></app-main-bar>
    <app-main-nav></app-main-nav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-fab></app-fab>
  `,
  styles: ``,
})
export class AppComponent {}