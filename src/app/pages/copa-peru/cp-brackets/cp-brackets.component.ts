import { Component } from '@angular/core';
import { TitleComponent } from "../../../components/title/title.component";
import { BtnComponent } from "../../../components/btn/btn.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cp-brackets',
  imports: [TitleComponent, BtnComponent, RouterLink],
  template: `
    <app-title [title]="'Brackets'"></app-title>
    <div class="bg-night p-5">
      <div class="bg-nightfall p-5 text-center">
        <p class="text-crimson font-semibold text-2xl">Copa Perú Etapa Nacional</p>
        <p class="text-white">LLaves de clasificación por definir.</p>
        <div class="w-full md:w-64 mx-auto mt-3 px-5">
          <app-btn routerLink="/copa-peru" [active]="false">Ir a Home</app-btn>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CpBracketsComponent {}