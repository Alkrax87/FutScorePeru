import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMarqueeComponent } from "@omnedia/ngx-marquee";

@Component({
  selector: 'app-teams-carousel',
  imports: [NgxMarqueeComponent, RouterModule],
  template: `
    <div class="w-full select-none">
      <om-marquee [animationDuration]="duration" marqueeGap="0rem" [reverse]="reverse">
        <div class="flex gap-5 pr-5" #OmMarqueeContent>
          @for (item of data; track $index) {
            <a [routerLink]="item.url">
              <div class="bg-nightfall hover:bg-crimson w-20 text-center p-4 hover:scale-110 transition-transform duration-300">
                <div class="flex justify-center items-center w-full">
                  <img [src]="item.image" [alt]="item.alt">
                </div>
                <p class="font-semibold text-sm pt-5">{{ item.abbreviation }}</p>
              </div>
            </a>
          }
        </div>
      </om-marquee>
    </div>
  `,
  styles: ``,
})
export class TeamsCarouselComponent {
  @Input() data!:{ abbreviation: string, image: string, alt: string, url: string, color: { c1: string, c2?:string } }[];
  @Input() reverse!: boolean;
  @Input() duration!: string;
}