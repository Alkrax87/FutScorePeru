import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  imports: [],
  template: `
    <button class="switch-button bg-crimson w-full select-none" [class]="{'active' : active}">
      <span>
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: `
    .active {
      background: #dc143c;
    }
    .switch-button {
      border: none;
      font-size: 16px;
      font-weight: 700;
      padding: 0.9rem 2rem;
      overflow: hidden;
      transform: skew(30deg);
    }
    .switch-button:hover,
    .switch-button.active {
      color: #fff;
    }
    .switch-button span {
      transition: color 0.3s;
      display:inline-block;
      transform: skew(-30deg);
    }
    .switch-button.active span {
      color: #fff;
    }
    .switch-button::before,
    .switch-button::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .switch-button::before {
      content: "";
      background: #ffffff;
      width: 120%;
      left: -10%;
      transition: transform 0.5s cubic-bezier(0.3, 1, 0.8, 1);
    }
    .switch-button:hover::before {
      transform: translate3d(100%, 0, 0);
    }
    .switch-button.active::before {
      transform: translate3d(100%, 0, 0);
    }
  `,
})
export class BtnComponent {
  @Input() active: boolean = false;
}
