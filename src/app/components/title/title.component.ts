import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <div class="w-full h-48 bg-crimson text-white image md:px-16 select-none">
      <div class="h-full flex justify-center md:justify-start items-center">
        <p class="font-bold">{{ title }}</p>
      </div>
    </div>
  `,
  styles: `
    .image {
      background-image: url('/assets/images/pages/Background-pattern.png');
      background-size: cover;
      font-size: 61px;
    }
  `,
})
export class TitleComponent {
  @Input() title!: string;
}
