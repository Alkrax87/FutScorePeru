import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faCalendarDays, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { Division } from '../../interfaces/api-models/division';

@Component({
  selector: 'app-main-division-card',
  imports: [RouterLink, FaIconComponent],
  template: `
    <div [routerLink]="route" class="bg-nightfall group cursor-pointer hover:-translate-y-1 duration-300">
      <div class="border-none">
        <div class="bg-white dark:bg-nightfall duration-300 py-4 px-4 overflow-hidden relative rounded-br-[32px]">
          <div class="w-20 h-20 bg-main rounded-full absolute -right-5 -top-7 duration-300 group-hover:scale-150"></div>
          <img loading="lazy" [src]="item.image" alt="Liga-logo" class="w-16 h-16 min-w-16" />
          <h2 class="dark:text-white duration-300 dark:duration-300 font-bold text-2xl">{{ item.name }}</h2>
          <div class="text-neutral-800 dark:text-neutral-300 text-sm tracking-tight flex flex-wrap gap-x-6 gap-y-1 mt-2 duration-300">
            <span class="inline-flex gap-1"><fa-icon [icon]="Shield" class="text-main"></fa-icon> {{ item.teams }} Equipos</span>
            <span class="inline-flex gap-1"><fa-icon [icon]="Calendar" class="text-main"></fa-icon> Temporada {{ item.season }}</span>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-nightfall duration-300 dark:duration-300 border-none">
        <div class="bg-nightfall py-3 px-9 rounded-tl-[32px]">
          <p class="flex gap-2 items-center justify-center text-base font-bold text-white group-hover:text-main duration-300">
            <fa-icon [icon]="Arrow" class="ml-0 group-hover:ml-2 duration-300"></fa-icon>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MainDivisionCardComponent {
  @Input() item!: Division;
  route: string = '';

  Shield = faShieldHalved;
  Arrow = faAngleRight;
  Calendar = faCalendarDays;

  ngOnInit() {
    if (this.item) {
      switch (this.item.category) {
        case 1:
          this.route = 'liga1';
          break;
        case 2:
          this.route = 'liga2';
          break;
        case 3:
          this.route = 'liga3';
          break;
        case 4:
          this.route = 'copa-peru';
          break;
        default:
          break;
      }
    }
  }
}