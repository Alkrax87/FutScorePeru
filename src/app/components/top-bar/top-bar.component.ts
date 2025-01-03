import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [RouterModule],
  template: `
    <div class="bg-[#161513]">
      <div class="container mx-auto">
        <div class="flex justify-center">
          <div class="relative flex-none h-10 sm:h-[60px] border-r-[40px] sm:border-r-[60px] border-b-[40px] sm:border-b-[60px] border-r-transparent  border-b-[#161513] bg-[#dc143c]"></div>
          <div class="w-3/12 bg-[rgb(220,20,60)] flex justify-center">
            <a routerLink="/">
              <img class="bg-white w-10 sm:w-[60px] p-1" src="assets/images/no-team-liga-1.png" alt="main-logo"
              />
            </a>
          </div>
          <div class="relative flex-none h-10 sm:h-[60px] border-l-[40px] sm:border-l-[60px] border-b-[40px] sm:border-b-[60px] border-l-transparent border-b-[#161513] bg-[#dc143c]"></div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TopBarComponent {}
