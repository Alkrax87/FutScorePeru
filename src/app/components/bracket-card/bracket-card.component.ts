import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatchCard } from '../../interfaces/ui-models/match-card';
import { faAnglesRight, faBullseye, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bracket-card',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-nightfall text-white w-full py-3 px-4 select-none">
      <div class="flex items-center justify-between">
        <div class="w-fit">
          <p class="text-base sm:text-xl font-semibold">{{ bracket.matchKey }}</p>
          <div class="bg-crimson h-1 w-full skew-x-50"></div>
        </div>
        @if (bracket.nextKey) {
          <div>
            <div class="flex gap-1 text-xxs sm:text-xs rounded-full border border-gold px-2 text-gold">
              <fa-icon [icon]="Arrow"></fa-icon>
              <p>{{ bracket.nextKey }}</p>
            </div>
          </div>
        }
      </div>
      <div class="overflow-x-auto mt-2">
        <table class="w-full">
          <thead class="text-gray-300 border-b-2 text-xxs md:text-xs border-[#585858]">
            <tr>
              <th class="text-start w-full">Equipos</th>
              @if (dualMatch) {
                <th class="min-w-8 sm:min-w-12">Ida</th>
                <th class="min-w-10 sm:min-w-12">Vuelta</th>
              }
              <th class="bg-brightnight pt-2 rounded-t-lg min-w-16 sm:min-w-20">{{ dualMatch ? 'Global' : 'Resultado' }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-200 font-semibold text-xs sm:text-base duration-500">
            @for (team of bracket.teams; track $index) {
              <tr>
                <td class="flex text-start items-center gap-1">
                  <img [src]="team.image ? team.image : 'assets/images/pages/no-team.webp'" alt="Team{{$index}}Bracket-Logo" class="w-8 sm:w-10 duration-500">
                  <div class="truncate">
                    <p class="truncate">{{ team.name ? team.name : 'Por Definir' }}</p>
                    <p class="text-neutral-400 text-tiny sm:text-xs -mt-1 duration-500">{{ team.location ? '(' + team.location + ')' : '' }}</p>
                  </div>
                </td>
                @if (dualMatch) {
                  <td class="text-center">{{ team.results.firstLegScore }}</td>
                  <td class="text-center">{{ team.results.secondLegScore }}</td>
                }
                <td class="bg-brightnight text-center font-bold">
                  <div class="flex justify-center gap-2">
                    @if (dualMatch) {
                      @if (team.results.firstLegScore !== null && team.results.secondLegScore !== null) {
                        <p>{{ team.results.firstLegScore + team.results.secondLegScore }}</p>
                      }
                      @if (team.results.penalties !== null) {
                        <div class="bg-crimson flex items-center gap-1 rounded-lg px-1 text-white">
                          <fa-icon class="text-xxs sm:text-xs" [icon]="Penalty"></fa-icon>
                          <span>{{ team.results.penalties }}</span>
                        </div>
                      }
                    } @else {
                      <p>{{ team.results.firstLegScore }}</p>
                      @if (team.results.penalties !== null) {
                        <div class="bg-crimson flex items-center gap-1 rounded-lg px-1 text-white">
                          <fa-icon class="text-xxs sm:text-xs" [icon]="Penalty"></fa-icon>
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
        <div class="flex items-center justify-center py-1 gap-1 bg-gold text-xs sm:text-sm mt-1">
          <fa-icon [icon]="Trophy"></fa-icon><span class="font-semibold">{{ classified }}</span>clasificado.
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class BracketCardComponent {
  @Input() bracket!: MatchCard;
  @Input() dualMatch: boolean = false;
  classified: string | null = null;

  Arrow = faAnglesRight;
  Penalty = faBullseye;
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