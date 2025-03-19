import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-league-card',
  imports: [RouterModule, FontAwesomeModule],
  template: `
    <div>
      <div class="bg-nightfall border-none">
        <div class="bg-white dark:bg-brightnight transition dark:transition duration-300 dark:duration-300 pt-5 px-9 overflow-hidden relative rounded-br-[30px]">
          <div class="w-20 h-20 bg-crimson rounded-full absolute -right-5 -top-7">
            <p class="absolute flex justify-center">1</p>
          </div>
          <img loading="lazy" [src]="item.image" alt="Liga-logo" class="w-16 min-w-16">
          <h2 class="text-crimson dark:text-gold transition dark:transition duration-300 dark:duration-300 font-bold text-2xl">{{ item.title }}</h2>
          <p class="text-zinc-500 dark:text-white transition dark:transition duration-300 dark:duration-300 text-sm font-semibold py-2">
            <fa-icon [icon]="Shield"></fa-icon> {{ item.teams }} Equipos
          </p>
        </div>
      </div>
      <div class="bg-white dark:bg-brightnight transition dark:transition duration-300 dark:duration-300 border-none">
        <div class="bg-nightfall py-3 px-9 rounded-tl-[30px]">
          <div class="text-white flex justify-center">
            <a [routerLink]="item.routes" class="skew-x-30 bg-crimson hover:bg-gold transition duration-300 w-20 py-1 flex justify-center">
              <div class="-skew-x-30 w-fit">
                <fa-icon [icon]="Arrow"></fa-icon>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LeagueCardComponent {
  @Input() item!: {
    title: string;
    image: string;
    teams: number;
    routes: string;
  };

  Shield = faShieldHalved;
  Arrow = faAngleRight;
}