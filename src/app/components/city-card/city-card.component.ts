import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city-card',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-white dark:bg-brightnight duration-500 flex justify-between font-semibold gap-1.5 mx-0.5 my-1 shadow-sm">
      <p class="text-dark dark:text-white duration-500 text-sm pl-2 truncate my-auto">{{ city.name }}</p>
      <div class="bg-night text-white min-w-10 py-1 text-center text-sm">
        <fa-icon [icon]="Shield"></fa-icon> {{ city.teams }}
      </div>
    </div>
  `,
  styles: ``
})
export class CityCardComponent {
  @Input() city!: { name: string; teams: number };
  Shield = faShieldHalved;
}