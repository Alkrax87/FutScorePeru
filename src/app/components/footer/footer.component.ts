import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Facebook, Instagram, LandPlot, LucideAngularModule, Twitter } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  readonly Facebook = Facebook;
  readonly Instagram = Instagram;
  readonly Twitter = Twitter;
  readonly LandPlot = LandPlot;
}
