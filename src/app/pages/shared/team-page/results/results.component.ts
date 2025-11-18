import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [],
  template: `
    <div class="bg-night px-3 sm:px-5 py-10 md:py-20 duration-500 select-none"></div>
  `,
  styles: ``,
})
export class ResultsComponent {
  constructor(private route: ActivatedRoute) {
    this.route.parent!.paramMap.subscribe(params => {
      const category = params.get('category');
      const teamId = params.get('teamId');

      console.log(category + ' - ' + teamId);
    });
  }
}