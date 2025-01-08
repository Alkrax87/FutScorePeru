import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-options-nav',
  imports: [RouterModule, FontAwesomeModule],
  template: `
    <div class="bg-gray-100 w-full flex">
      <div class="flex mx-auto">
        @for (item of options; track $index) {
          <a [routerLink]="item.route" class="sm:w-32 md:w-40 lg:w-60 justify-items-center group relative inline-block px-4 py-4">
            <span routerLinkActive="scale-y-100" class="absolute bottom-0 left-0 w-full h-1.5 bg-gold scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
            <div class="flex text-neutral-600">
              <fa-icon class="items-center" [icon]="item.icon"></fa-icon>
              <span class="ml-1">{{ item.name }}</span>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class OptionsNavComponent {
  @Input() options: { name: string; route: string; icon: any }[] = [];
}
