import { Component } from '@angular/core';

@Component({
  selector: 'app-btn',
  imports: [],
  template: `
    <button class="px-6 py-3 text-white bg-crimson rounded-full focus:outline-none">
      <span>
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: ``,
})
export class BtnComponent {}
