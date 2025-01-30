import { Component } from '@angular/core';
import { StatisticsL1Service } from '../../../services/statistics-l1.service';

@Component({
  selector: 'app-test',
  imports: [],
  template: `
    <p>
      test works!
    </p>
  `,
  styles: ``
})
export class TestComponent {
  constructor(private statisticsL1: StatisticsL1Service) {}

  ngOnInit() {
    this.statisticsL1.getDataForStatistics();
  }
}
