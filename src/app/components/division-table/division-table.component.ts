import { Component, Input } from '@angular/core';
import { TeamCompactTable } from '../../interfaces/ui-models/team-compact-table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-division-table',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-nightfall font-semibold p-5 rounded-3xl">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="text-neutral-300 border-b-2 text-xxs border-neutral-600">
            <tr class="h-6">
              <th class="w-1 min-w-1 max-w-1"></th>
              <th class="w-8 min-w-8 max-w-8">Pos</th>
              <th class="min-w-20 sm:min-w-52 text-start duration-500">Club</th>
              <th class="bg-brightnight rounded-t-lg min-w-14 max-w-14 pt-1">PTS</th>
            </tr>
          </thead>
          <tbody>
            @for (item of data; track $index) {
              <tr [routerLink]="['../club', item.category, item.teamId]" class="group text-sm h-8 cursor-pointer text-center text-gray-200 hover:bg-gray-200 hover:text-night">
                @if ($index >= 0 && $index < config[0].quantity) {
                  <td [ngClass]="config[0].class"></td>
                } @else if ($index >= config[0].quantity && $index < (config[0].quantity + config[1].quantity)) {
                  <td [ngClass]="config[1].class"></td>
                } @else if ($index >= (data.length - config[2].quantity)) {
                  <td [ngClass]="config[2].class"></td>
                } @else {
                  <td></td>
                }
                <td class="text-xs">{{ $index + 1 }}</td>
                <td>
                  <div class="flex items-center">
                    <img loading="lazy" [src]="item.imageThumbnail" [alt]="item.alt" class="w-6 h-6"/>
                    <span class="ml-2 truncate my-auto">{{ item.name }}</span>
                  </div>
                </td>
                <td class="bg-brightnight group-hover:bg-white group-hover:text-night group-hover:duration-0 font-bold w-14 max-w-14">{{ item.performance.points }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class DivisionTableComponent {
  @Input() data: TeamCompactTable[] = [];
  @Input() config!: { class: string; quantity: number }[];
}