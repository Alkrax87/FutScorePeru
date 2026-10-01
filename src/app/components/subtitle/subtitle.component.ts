import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  imports: [],
  template: `
    <div class="flex items-start sm:items-center gap-2 mb-2 min-w-0">
      <div class="bg-main h-8 sm:h-10 w-2 shrink-0"></div>
      <span class="min-w-0 text-white font-bold text-2xl lg:text-3xl leading-tight break-words duration-500">
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styles: ``,
})
export class SubtitleComponent {}