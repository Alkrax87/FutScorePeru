import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-title',
  imports: [FaIconComponent, RouterLink],
  template: `
    <div class="relative bg-main text-white background-pattern px-3 sm:px-5 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto min-h-44 sm:min-h-52 flex flex-col justify-between gap-5 py-6 sm:pt-10 sm:pb-8 duration-500">
        <nav>
          <ol class="hidden md:flex gap-2 font-semibold text-sm items-center">
            <li>
              <a routerLink="/" aria-label="Inicio" class="flex items-center gap-2 text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <fa-icon [icon]="Home"></fa-icon>
                <span>Inicio</span>
              </a>
            </li>
            <li aria-hidden="true"><fa-icon [icon]="Arrow" class="text-white/70"></fa-icon></li>
            <li>
              <a [routerLink]="['/', leagueSegment]" class="text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{{ leagueLabel }}</a>
            </li>
            <li aria-hidden="true"><fa-icon [icon]="Arrow" class="text-white/70"></fa-icon></li>
            <li aria-current="page" class="font-bold text-white">{{ title }}</li>
          </ol>

          <ol class="flex md:hidden gap-2 font-semibold text-sm items-center min-w-0">
            <li class="truncate text-white/85">{{ leagueLabel }}</li>
            <li aria-hidden="true" class="shrink-0"><fa-icon [icon]="Arrow" class="text-white/70"></fa-icon></li>
            <li aria-current="page" class="truncate font-bold text-white">{{ title }}</li>
          </ol>
        </nav>

        <div class="font-bold flex items-center min-w-0">
          <h1 class="font-bold text-5xl sm:text-6xl leading-tight break-words duration-500">{{ title }}</h1>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TitleComponent {
  @Input() title!: string;
  private router = inject(Router);

  routeSegments: string[] = [];
  Arrow = faAngleRight;
  Home = faHome;

  constructor() {
    this.routeSegments = this.router.url.split('?')[0].split('/').filter(Boolean);
  }

  get leagueSegment(): string {
    return this.routeSegments[0] ?? '';
  }

  get leagueLabel(): string {
    const labels: Record<string, string> = {
      liga1: 'Liga 1',
      liga2: 'Liga 2',
      liga3: 'Liga 3',
      'copa-peru': 'Copa Perú',
    };

    return labels[this.leagueSegment] ?? this.leagueSegment;
  }
}