import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatchCard } from '../../interfaces/ui-models/match-card';
import { faAnglesRight, faBullseye, faSoccerBall, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bracket-card',
  imports: [FaIconComponent],
  template: `
    <div class="bg-nightfall text-light w-full p-2 sm:p-4 duration-500 select-none">
      <!-- Top -->
      <div class="flex justify-between">
        <!-- Key -->
        <p class="text-base font-bold duration-500">{{ bracket.matchKey }}</p>
        <!-- Next Key -->
        @if (bracket.nextKey) {
          <div class="bg-main text-light flex gap-1 font-semibold text-xs px-2 py-1 duration-500">
            <fa-icon [icon]="Arrow"></fa-icon>
            <p>{{ bracket.nextKey }}</p>
          </div>
        }
      </div>
      <!-- Content -->
      <div class="overflow-x-auto font-semibold mt-2">
        <table class="w-full">
          <thead class="text-neutral-300 border-b-2 text-xxs border-neutral-600">
            <tr class="">
              <th class="text-start w-full">Equipos</th>
              @if (dualMatch) {
                <th class="min-w-10 lg:min-w-12">Ida</th>
                <th class="min-w-10 lg:min-w-12">Vuelta</th>
              }
              <th class="bg-brightnight min-w-16 pt-1">{{ dualMatch ? 'Global' : 'Resultado' }}</th>
            </tr>
          </thead>
          <tbody class="text-light text-sm md:text-base duration-500">
            @for (team of bracket.teams; track $index) {
              <tr>
                <td class="flex items-center h-12 gap-2">
                  <img [src]="team.image ? team.image : 'assets/images/pages/no-team.webp'" [alt]="'Team' + $index + 'Bracket-Logo'" class="w-8 h-8">
                  <div class="truncate">
                    <p class="truncate">{{ team.name ? team.name : 'Por Definir' }}</p>
                    @if (team.location) {
                      <p class="text-neutral-400 text-xs">{{ team.location }}</p>
                    }
                  </div>
                </td>
                @if (dualMatch) {
                  <td class="text-center">{{ team.results.firstLegScore }}</td>
                  <td class="text-center">{{ team.results.secondLegScore }}</td>
                }
                <td class="bg-brightnight text-center font-bold">
                  <div class="flex justify-center gap-1">
                    @if (dualMatch) {
                      @if (team.results.firstLegScore !== null && team.results.secondLegScore !== null) {
                        <p>{{ team.results.firstLegScore + team.results.secondLegScore }}</p>
                      }
                      @if (team.results.penalties !== null) {
                        <div class="bg-light flex items-center gap-1 px-1 text-dark">
                          <fa-icon class="text-xxs" [icon]="Ball"></fa-icon>
                          <span>{{ team.results.penalties }}</span>
                        </div>
                      }
                    } @else {
                      <p>{{ team.results.firstLegScore }}</p>
                      @if (team.results.penalties !== null) {
                        <div class="bg-light flex items-center gap-1 px-1 text-dark">
                          <fa-icon class="text-xxs" [icon]="Ball"></fa-icon>
                          <span>{{ team.results.penalties }}</span>
                        </div>
                      }
                    }
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      @if (classified) {
        <div class="flex items-center justify-center py-1 gap-1 bg-gold text-sm mt-2">
          <fa-icon [icon]="Trophy"></fa-icon><span class="font-semibold">{{ classified }}</span>{{ lastMatch ? lastMatch : 'clasificado.' }}
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class BracketCardComponent {
  @Input() bracket!: MatchCard;
  @Input() dualMatch: boolean = false;
  @Input() lastMatch?: string;
  classified: string | null = null;

  Arrow = faAnglesRight;
  Ball = faSoccerBall;
  Trophy = faTrophy;

  ngOnInit() {
    if (this.dualMatch) {
      if (
        this.bracket.teams[0].results.firstLegScore !== null &&
        this.bracket.teams[0].results.secondLegScore !== null &&
        this.bracket.teams[1].results.firstLegScore !== null &&
        this.bracket.teams[1].results.secondLegScore !== null
      ) {
        this.calculateScores(
          this.bracket.teams[0].results.firstLegScore + this.bracket.teams[0].results.secondLegScore,
          this.bracket.teams[0].results.penalties,
          this.bracket.teams[1].results.firstLegScore + this.bracket.teams[1].results.secondLegScore,
          this.bracket.teams[1].results.penalties
        )
      }
    } else {
      if (this.bracket.teams[0].results.firstLegScore !== null && this.bracket.teams[1].results.firstLegScore !== null) {
        this.calculateScores(
          this.bracket.teams[0].results.firstLegScore,
          this.bracket.teams[0].results.penalties,
          this.bracket.teams[1].results.firstLegScore,
          this.bracket.teams[1].results.penalties
        )
      }
    }
  }

  calculateScores(teamA: number, penaltiesA: number | null, teamB: number, penaltiesB: number | null) {
    if (teamA > teamB) {
      this.classified = this.bracket.teams[0].name;
    } else if (teamB > teamA) {
      this.classified = this.bracket.teams[1].name;
    } else if (penaltiesA !== null && penaltiesB !== null) {
      if (penaltiesA > penaltiesB) {
        this.classified = this.bracket.teams[0].name;
      } else if (penaltiesB > penaltiesA) {
        this.classified = this.bracket.teams[1].name;
      }
    }
  }
}