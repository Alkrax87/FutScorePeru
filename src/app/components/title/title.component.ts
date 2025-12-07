import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-title',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  template: `
    <div class="bg-crimson text-white background-pattern px-3 sm:px-5 duration-500 select-none">
      <div class="max-w-screen-xl mx-auto h-52 flex flex-col justify-between pt-10 pb-8">
        <div class="flex gap-2 font-bold text-xs sm:text-sm items-center duration-500">
          <div [routerLink]="routeSections[0]" class="cursor-pointer hover:opacity-100 hover:duration-200 opacity-70">
            HOME
          </div>
          <fa-icon [icon]="Arrow" class="opacity-70"></fa-icon>
          <div [routerLink]="['/', routeSections[1]]" class="cursor-pointer hover:opacity-100 hover:duration-200 opacity-70">
            {{ routeSections[1].toUpperCase() }}
          </div>
          <fa-icon [icon]="Arrow" class="opacity-70"></fa-icon>
          <div [routerLink]="['/', routeSections[1], routeSections[2]]" routerLinkActive="text-white" class="cursor-pointer hover:opacity-100 hover:duration-200">
            {{ routeSections[2].toUpperCase() }}
          </div>
        </div>
        <div class="font-bold flex md:justify-start items-center duration-500">
          <p class="font-bold text-6xl">{{ title }}</p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TitleComponent {
  @Input() title!: string;

  routeSections: string[] = [];
  Arrow = faCaretRight;

  constructor(private router: Router) {
    this.routeSections = router.url.split('/');
  }
}