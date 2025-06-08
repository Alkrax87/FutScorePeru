import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink],
  template: `
    <div class="bg-night select-none hidden md:block">
      <div class="container mx-auto">
        <div class="flex justify-center">
          <div class="relative flex-none border-r-[48px] border-b-[48px] border-r-transparent border-b-night bg-crimson"></div>
          <div class="w-2/5 lg:w-1/3 2xl:w-3/12 duration-500 bg-crimson flex justify-center">
            <a routerLink="/" class="focus:outline-none">
              <img class="bg-white w-[48px] p-1" src="main-logo.webp" alt="main-logo"/>
            </a>
          </div>
          <div class="relative flex-none border-l-[48px] border-b-[48px] border-l-transparent border-b-night bg-crimson"></div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TopBarComponent {}