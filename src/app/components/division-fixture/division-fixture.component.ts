import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { NgxMarqueeComponent } from "@omnedia/ngx-marquee";
import { FixtureCompactCard } from '../../interfaces/ui-models/fixture-compact-card';

@Component({
  selector: 'app-division-fixture',
  imports: [RouterLink, FontAwesomeModule, NgxMarqueeComponent],
  template: `
    @if (stageData && fixture && duration) {
      <div class="bg-night select-none w-full px-3 sm:px-5 py-2 duration-500">
        <div class="flex text-neutral-300 font-bold text-xs gap-2">
          <div class="flex gap-1">
            <p>{{ stageData.name }}</p>
            <p>F{{ stageData.inGame }}</p>
          </div>
          <div class="bg-neutral-300 my-auto h-0.5 w-full rounded-full"></div>
        </div>
        <om-marquee [animationDuration]="duration" [pauseOnHover]="false" class="[mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]">
          <div class="flex justify-center gap-4" #OmMarqueeContent>
            @for (match of fixture; track $index) {
              <div class="bg-nightfall h-14 flex">
                <div class="w-14 p-2">
                  <img [src]="match.homeTeamImageThumbnail" [alt]="match.homeTeamAlt" class="h-full"/>
                </div>
                <div class="flex gap-1">
                  <div class="bg-brightnight text-white flex flex-col justify-center items-center font-bold min-w-11 max-w-11">
                    <p class="text-xs">{{ match.homeTeamAbbreviation }}</p>
                    <p class="text-3xl h-9">{{ match.homeTeamResult }}</p>
                  </div>
                  <div class="bg-brightnight text-white flex flex-col justify-center items-center font-bold min-w-11 max-w-11">
                    <p class="text-xs">{{ match.awayTeamAbbreviation }}</p>
                    <p class="text-3xl h-9">{{ match.awayTeamResult }}</p>
                  </div>
                </div>
                <div class="w-14 p-2">
                  <img [src]="match.awayTeamImageThumbnail" [alt]="match.awayTeamAlt" class="h-full"/>
                </div>
              </div>
            }
          </div>
        </om-marquee>
        <div class="font-bold text-sm flex justify-end">
          <span [routerLink]="'../fixture'" class="text-crimson hover:text-crimson-hover cursor-pointer">
            FIXTURE COMPLETO <fa-icon [icon]="Arrow"></fa-icon>
          </span>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class DivisionFixtureComponent {
  @Input() stageData!: { name: string, inGame: number };
  @Input() fixture!: FixtureCompactCard[];
  @Input() duration!: string;

  Arrow = faAngleDoubleRight;
}