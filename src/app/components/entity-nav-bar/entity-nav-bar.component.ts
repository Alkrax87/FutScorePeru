import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { EntityNav } from '../../interfaces/ui-models/entity-nav';

@Component({
  selector: 'app-entity-nav-bar',
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <div class="bg-gray-100 dark:bg-night duration-500 select-none">
      <div class="mx-auto hidden md:block md:w-11/12 lg:w-4/5">
        <div class="flex gap-4 lg:gap-6">
          <div class="flex items-center text-xs lg:text-sm">
            <div class="animate-fade-right text-nowrap delay-100">
              <span class="text-neutral-600 dark:text-neutral-200 duration-500">
                {{ leaguesBar ? 'Ligas' : 'Clubes' }} <fa-icon class="ml-2" [icon]="Icon"></fa-icon>
              </span>
            </div>
          </div>
          <div class="flex-grow flex justify-evenly overflow-hidden md:py-2 lg:py-4">
            @for (entity of entities; track $index) {
              <a [routerLink]="[entity.category === 4 ? 'liga': 'club', entity.category, entity.category === 4 ? entity.leagueId : entity.teamId]" class="animate-fade-up delay-75">
                <img [src]="entity.imageThumbnail" [alt]="entity.alt" class="md:w-6 md:h-6 lg:w-8 lg:h-8 object-contain"/>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    @keyframes fadeUp {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeRight {
      0% {
        opacity: 0;
        transform: translateX(-40px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    .animate-fade-up {
      animation: fadeUp 1s ease-out forwards;
    }
    .animate-fade-right {
      animation: fadeRight 1s ease-out forwards;
    }
    img {
      transition: 0.5s;
    }
    img:hover {
      transform: scale(1.2);
    }
  `,
})
export class EntityNavBarComponent {
  @Input() entities!: EntityNav[];
  @Input() leaguesBar?: boolean = false;
  Icon = faUpRightFromSquare;
}