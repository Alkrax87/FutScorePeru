import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `
    <div class="w-full h-48 text-6xl bg-crimson text-white background-pattern md:px-16 select-none">
      <div class="h-full flex justify-center md:justify-start items-center">
        <p class="font-bold">{{ title }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class TitleComponent {
  @Input() title!: string;
}
