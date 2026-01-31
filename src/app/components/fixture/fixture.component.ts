import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FixtureByDate } from '../../interfaces/ui-models/fixture-models';

@Component({
  selector: 'app-fixture',
  imports: [FontAwesomeModule, RouterLink, DatePipe],
  template: `
    <div class="bg-night select-none flex flex-col gap-8">
      @for (item of data; track $index) {
        <div>
          <!-- Date -->
          <div class="flex justify-center items-center mb-3">
            @if (item.date) {
              <span class="bg-crimson text-white px-5 font-semibold py-1">{{ item.date | date:'EEEE d MMMM' }}</span>
            } @else {
              <span class="bg-crimson text-white px-5 font-semibold py-1">Por Definir</span>
            }
          </div>
          <!-- Matches -->
          <div class="flex flex-col gap-1.5">
            @for (match of item.matches; track $index) {
              <div>
                <!-- Group -->
                @if (match.group) {
                  <div class="flex justify-center">
                    <div class="relative flex-none border-r-[16px] border-t-[16px] border-r-transparent border-t-night bg-white"></div>
                    <div class="bg-white w-fit text-xs px-4 font-semibold text-center">Grupo {{ match.group.toUpperCase() }}</div>
                    <div class="relative flex-none border-l-[16px] border-t-[16px] border-l-transparent border-t-night bg-white"></div>
                  </div>
                }
                <!-- Match -->
                <div class="bg-nightfall text-white flex justify-center gap-1 p-1">
                  <!-- Left Team-->
                  <div class="w-full flex justify-end">
                    <div class="cursor-pointer flex items-center" [routerLink]="['../', 'club', match.category, match.homeTeamId]">
                      <p class="text-sm font-semibold">
                        <span class="hidden sm:block">{{ match.homeTeamName }}</span>
                        <span class="block sm:hidden font-bold">{{ match.homeTeamAbbreviation }}</span>
                      </p>
                      <img [src]="match.homeTeamImageThumbnail" [alt]="match.homeTeamAlt" class="w-10 mx-1"/>
                    </div>
                  </div>
                  <!-- Match Results -->
                  <div class="flex min-w-24 gap-1">
                    @if (match.homeTeamResult !== null && match.awayTeamResult !== null) {
                      <div class="bg-brightnight flex justify-center items-center font-bold -my-1 text-3xl w-full">
                        <p>{{ match.homeTeamResult }}</p>
                      </div>
                      <div class="bg-brightnight flex justify-center items-center font-bold -my-1 text-3xl w-full">
                        <p>{{ match.awayTeamResult }}</p>
                      </div>
                    } @else {
                      <div class="w-full text-center my-auto font-bold">{{ match.date ? (match.date | date:'H:mm') : '-' }}</div>
                    }
                  </div>
                  <!-- Right Team-->
                  <div class="w-full flex justify-start">
                    <div class="cursor-pointer flex items-center" [routerLink]="['../', 'club', match.category, match.awayTeamId]">
                      <img [src]="match.awayTeamImageThumbnail" [alt]="match.awayTeamAlt" class="w-10 mx-1"/>
                      <p class="text-sm font-semibold">
                        <span class="block sm:hidden font-bold">{{ match.awayTeamAbbreviation }}</span>
                        <span class="hidden sm:block">{{ match.awayTeamName }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class FixtureComponent {
  @Input() data!: FixtureByDate[];
  Location = faLocationDot;
}