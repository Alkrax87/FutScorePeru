import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  imports: [NgClass],
  template: `
    <button
      class="w-full h-12 select-none border-0 text-base font-bold duration-300 skew-x-30"
      [ngClass]="{ 'bg-main text-white': active, 'bg-white hover:bg-main-hover hover:text-white': !active }"
    >
      <span class="inline-block -skew-x-30">
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class BtnComponent {
  @Input() active: boolean = false;
}