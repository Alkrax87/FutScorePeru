import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-bar',
  imports: [RouterLink],
  template: `
    <div class="bg-night select-none hidden md:block">
      <div class="mx-auto flex justify-center">
        <div class="
          relative left-[0.5px] w-0 h-0 border-solid
          border-t-0 border-r-[40px] border-b-[40.5px] border-l-0
          border-t-transparent border-r-crimson border-b-transparent border-l-transparent
        "></div>
        <div class="bg-crimson w-2/5 lg:w-1/3 2xl:w-3/12 duration-500 h-10 flex justify-center items-center">
          <a routerLink="/" class="focus:outline-none">
            <img class="bg-white w-10 p-1" src="main-logo.webp" alt="main-logo"/>
          </a>
        </div>
        <div class="
          relative right-[0.5px] w-0 h-0 border-solid
          border-t-[40.5px] border-r-[40px] border-b-0 border-l-0
          border-t-crimson  border-r-transparent border-b-transparent border-l-transparent
        "></div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MainBarComponent {}