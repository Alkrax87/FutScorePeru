import { Component, Input } from '@angular/core';
import { NgxMarqueeComponent } from "@omnedia/ngx-marquee";
import { TeamCarousel } from '../../interfaces/ui-models/team-carousel';

@Component({
  selector: 'app-teams-carousel',
  imports: [NgxMarqueeComponent],
  template: `
    <div class="w-full select-none">
      <om-marquee [animationDuration]="duration" [pauseOnHover]="false" marqueeGap="1.25rem" [reverse]="reverse">
        <div class="flex gap-5" #OmMarqueeContent>
          @for (item of data; track $index) {
            <div class="bg-nightfall w-20 text-center p-4 transition-transform duration-300">
              <div class="flex justify-center items-center w-full">
                <img [src]="item.image" [alt]="item.alt">
              </div>
              <p class="font-semibold text-sm pt-5">{{ item.abbreviation }}</p>
            </div>
          }
        </div>
      </om-marquee>
    </div>
  `,
  styles: ``,
})
export class TeamsCarouselComponent {
  @Input() data!: TeamCarousel[];
  @Input() reverse!: boolean;
  @Input() duration!: string;
}