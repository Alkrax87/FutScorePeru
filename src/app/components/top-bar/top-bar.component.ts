import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink],
  template: `
    <div class="bg-night select-none">
      <div class="container mx-auto">
        <div class="flex justify-center">
          <div class="relative flex-none h-10 sm:h-[60px] border-r-[40px] sm:border-r-[60px] border-b-[40px] sm:border-b-[60px] border-r-transparent  border-b-night bg-crimson"></div>
          <div class="w-3/12 bg-crimson flex justify-center">
            <a routerLink="/" class="focus:outline-none">
              <img class="bg-white w-10 sm:w-[60px] p-1" src="main-logo.webp" alt="main-logo"
              />
            </a>
          </div>
          <div class="relative flex-none h-10 sm:h-[60px] border-l-[40px] sm:border-l-[60px] border-b-[40px] sm:border-b-[60px] border-l-transparent border-b-night bg-crimson"></div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TopBarComponent {}
