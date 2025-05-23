import { Component } from '@angular/core';
import { TitleComponent } from '../../../components/title/title.component';
import { TeamCardCp } from '../../../interfaces/ui-models/team-card-cp';
import { TeamCardCpComponent } from '../../../components/team-card-cp/team-card-cp.component';

@Component({
  selector: 'app-cp-teams',
  imports: [TitleComponent, TeamCardCpComponent],
  template: `
    <app-title [title]="'Ligas'"></app-title>
    <div class="bg-night p-5">
      <div class="w-full">
        <div class="flex justify-center">
          <div class="w-full lg:w-11/12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            @for (item of dataTeams; track $index) {
              <app-team-card-cp [data]="dataTeams[$index]"></app-team-card-cp>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CpTeamsComponent {
  dataTeams: TeamCardCp[] = [];
}