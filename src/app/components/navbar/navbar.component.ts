import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  menuOpen: boolean = false;
  routes = [
    { path: "/liga1" , name: "Liga 1" },
    { path: "/liga2" , name: "Liga 2" },
    { path: "/liga3" , name: "Liga 3" },
    { path: "/copa-peru" , name: "Copa Perú" },
  ]

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }
}
