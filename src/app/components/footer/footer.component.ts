import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeather } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule , RouterLink, RouterLinkActive],
  template: `
    <footer class="relative bg-neutral-100 flex flex-col gap-10 select-none py-20 border-t-main border-t-8 overflow-hidden">
      <!-- Background -->
      <svg class="absolute w-full h-full -my-20 z-0 object-cover" id="visual"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g stroke-width="1" stroke-linejoin="bevel"><path d="M838.3 521L632 379L645 516Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M838.3 521L818.3 321L632 379Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M818.3 321L626 185L632 379Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M626 185L468.7 382L632 379Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M632 379L468.7 382L645 516Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M1071.7 376L886.3 193L818.3 321Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M818.3 321L886.3 193L626 185Z" fill="#ededed" stroke="#ededed"></path><path d="M414.7 575L600 714L645 516Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M645 516L600 714L838.3 521Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M1080.7 497L1071.7 376L838.3 521Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M838.3 521L1071.7 376L818.3 321Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M600 714L867.3 756L838.3 521Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M1089.7 698L1080.7 497L838.3 521Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M468.7 382L414.7 575L645 516Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M626 185L413.7 203L468.7 382Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M468.7 382L176.3 384L414.7 575Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M867.3 756L1089.7 698L838.3 521Z" fill="#efefef" stroke="#efefef"></path><path d="M414.7 575L454.7 763L600 714Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M600 714L629 877L867.3 756Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M886.3 193L670 0L626 185Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M626 185L381.7 0L413.7 203Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M1071.7 376L1088.7 148L886.3 193Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M886.3 193L893.3 0L670 0Z" fill="#ededed" stroke="#ededed"></path><path d="M1269 335L1088.7 148L1071.7 376Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M1237 507L1071.7 376L1080.7 497Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M454.7 763L629 877L600 714Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M867.3 756L1039.7 891L1089.7 698Z" fill="#ededed" stroke="#ededed"></path><path d="M1026.7 0L893.3 0L886.3 193Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M629 877L891.3 885L867.3 756Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M1089.7 698L1237 507L1080.7 497Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M1088.7 148L1026.7 0L886.3 193Z" fill="#ededed" stroke="#ededed"></path><path d="M1237 507L1269 335L1071.7 376Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M1088.7 148L1250 0L1026.7 0Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M891.3 885L1039.7 891L867.3 756Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M1089.7 698L1323 756L1237 507Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M823.3 1080L1039.7 891L891.3 885Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M670 0L381.7 0L626 185Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M413.7 203L176.3 384L468.7 382Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M199.3 219L176.3 384L413.7 203Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M414.7 575L196.3 695L454.7 763Z" fill="#eaeaea" stroke="#eaeaea"></path><path d="M176.3 384L171.3 504L414.7 575Z" fill="#ececec" stroke="#ececec"></path><path d="M381.7 0L199.3 219L413.7 203Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M454.7 763L380.7 918L629 877Z" fill="#ededed" stroke="#ededed"></path><path d="M629 877L823.3 1080L891.3 885Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M221.3 891L380.7 918L454.7 763Z" fill="#ececec" stroke="#ececec"></path><path d="M171.3 504L196.3 695L414.7 575Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M1269 335L1284 164L1088.7 148Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M652 1080L823.3 1080L629 877Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M470.7 1080L652 1080L629 877Z" fill="#ededed" stroke="#ededed"></path><path d="M1326 876L1089.7 698L1039.7 891Z" fill="#ececec" stroke="#ececec"></path><path d="M1326 876L1323 756L1089.7 698Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M1491.3 374L1459.3 217L1269 335Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M1269 335L1459.3 217L1284 164Z" fill="#ececec" stroke="#ececec"></path><path d="M1284 164L1250 0L1088.7 148Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M196.3 695L221.3 891L454.7 763Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M380.7 918L470.7 1080L629 877Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M0 721L221.3 891L196.3 695Z" fill="#eaeaea" stroke="#eaeaea"></path><path d="M197.3 1080L470.7 1080L380.7 918Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M381.7 0L198.3 0L199.3 219Z" fill="#ededed" stroke="#ededed"></path><path d="M199.3 219L0 386L176.3 384Z" fill="#efefef" stroke="#efefef"></path><path d="M1258 1080L1326 876L1039.7 891Z" fill="#ededed" stroke="#ededed"></path><path d="M823.3 1080L1106.7 1080L1039.7 891Z" fill="#efefef" stroke="#efefef"></path><path d="M0 174L0 386L199.3 219Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M176.3 384L0 386L171.3 504Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M171.3 504L0 721L196.3 695Z" fill="#ededed" stroke="#ededed"></path><path d="M0 386L0 497L171.3 504Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M1491.3 374L1269 335L1237 507Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M1284 164L1475.3 0L1250 0Z" fill="#ededed" stroke="#ededed"></path><path d="M1491.3 374L1237 507L1516.3 520Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M1482.3 673L1237 507L1323 756Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M1463.3 908L1482.3 673L1323 756Z" fill="#ededed" stroke="#ededed"></path><path d="M1482.3 673L1516.3 520L1237 507Z" fill="#ececec" stroke="#ececec"></path><path d="M198.3 0L0 174L199.3 219Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M0 497L0 721L171.3 504Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M1326 876L1463.3 908L1323 756Z" fill="#ececec" stroke="#ececec"></path><path d="M1106.7 1080L1258 1080L1039.7 891Z" fill="#efefef" stroke="#efefef"></path><path d="M0 942L197.3 1080L221.3 891Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M221.3 891L197.3 1080L380.7 918Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M1670.7 0L1475.3 0L1459.3 217Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M1459.3 217L1475.3 0L1284 164Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M1682.7 337L1459.3 217L1491.3 374Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M1258 1080L1463.3 908L1326 876Z" fill="#eaeaea" stroke="#eaeaea"></path><path d="M1482.3 673L1659.7 535L1516.3 520Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M198.3 0L0 0L0 174Z" fill="#ececec" stroke="#ececec"></path><path d="M0 721L0 942L221.3 891Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M1726.7 694L1659.7 535L1482.3 673Z" fill="#eaeaea" stroke="#eaeaea"></path><path d="M1516.3 520L1659.7 535L1491.3 374Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M1659.7 535L1682.7 337L1491.3 374Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M0 942L0 1080L197.3 1080Z" fill="#eaeaea" stroke="#eaeaea"></path><path d="M1258 1080L1493.3 1080L1463.3 908Z" fill="#efefef" stroke="#efefef"></path><path d="M1463.3 908L1726.7 694L1482.3 673Z" fill="#ececec" stroke="#ececec"></path><path d="M1742.7 912L1726.7 694L1463.3 908Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M1659.7 535L1920 523L1682.7 337Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M1727.7 139L1670.7 0L1459.3 217Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M1727.7 139L1459.3 217L1682.7 337Z" fill="#ededed" stroke="#ededed"></path><path d="M1920 327L1727.7 139L1682.7 337Z" fill="#f4f4f4" stroke="#f4f4f4"></path><path d="M1493.3 1080L1742.7 912L1463.3 908Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M1726.7 694L1920 523L1659.7 535Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M1920 752L1920 523L1726.7 694Z" fill="#f1f1f1" stroke="#f1f1f1"></path><path d="M1727.7 139L1920 0L1670.7 0Z" fill="#efefef" stroke="#efefef"></path><path d="M1920 523L1920 327L1682.7 337Z" fill="#f5f5f5" stroke="#f5f5f5"></path><path d="M1493.3 1080L1748.7 1080L1742.7 912Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M1742.7 912L1920 752L1726.7 694Z" fill="#ededed" stroke="#ededed"></path><path d="M1920 327L1920 137L1727.7 139Z" fill="#e8e8e8" stroke="#e8e8e8"></path><path d="M1920 881L1920 752L1742.7 912Z" fill="#eeeeee" stroke="#eeeeee"></path><path d="M1920 137L1920 0L1727.7 139Z" fill="#f2f2f2" stroke="#f2f2f2"></path><path d="M1920 1080L1920 881L1742.7 912Z" fill="#e9e9e9" stroke="#e9e9e9"></path><path d="M1748.7 1080L1920 1080L1742.7 912Z" fill="#eeeeee" stroke="#eeeeee"></path></g></svg>
      <!-- Content Section -->
      <div class="relative max-w-screen-xl mx-auto grid grid-cols-3 gap-20">
        <div>
          <h2 class="font-bold text-lg">FutScorePerú</h2>
          <p class="text-neutral-700 text-sm mt-2">La pasión del fútbol peruano en un solo lugar. Noticias, resultados y estadísticas de la Liga 1, Liga 2, Liga 3 y Copa Perú.</p>
          <p class="text-neutral-700 text-sm mt-2">Desde la pasión de la Liga 1 hasta la emoción de la Copa Perú, seguimos cada gol que hace vibrar a los hinchas de todo el país, llevando la alegría del fútbol a cada rincón.</p>
        </div>
        <div class="col-span-2 grid grid-cols-3 gap-10">
          <div>
            <h2 class="font-bold">Torneos</h2>
            <div class="flex flex-col gap-2 text-neutral-700 mt-2">
              @for (item of routesLigas; track $index) {
                <a [routerLink]="item.path" routerLinkActive="text-main" class="hover:text-main">{{ item.name }}</a>
              }
            </div>
          </div>
          <div>
            <h2 class="font-bold">Web</h2>
            <div class="flex flex-col gap-2 text-neutral-700 mt-2">
              @for (item of routesWeb; track $index) {
                <a [routerLink]="item.path" routerLinkActive="text-main" class="hover:text-main">{{ item.name }}</a>
              }
            </div>
          </div>
          <div>
            <h2 class="font-bold">Redes Sociales</h2>
            <div class="flex flex-col gap-2 text-neutral-700 mt-2">
              <a href="https://www.facebook.com/mavpprojects" target="_blank" class="hover:text-main">Facebook</a>
              <a href="https://www.instagram.com/mavp_projects/" target="_blank" class="hover:text-main">Instagram</a>
              <a href="https://www.linkedin.com/company/mavp-projects/" target="_blank" class="hover:text-main">LinkedIn</a>
              <a href="https://twitter.com/mavp_projects" target="_blank" class="hover:text-main">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </footer>
    <div class="w-full bg-dark">
      <div class="max-w-screen-xl mx-auto text-white text-sm flex justify-between items-center py-3">
        <a class="font-semibold" href="https://www.mavp_projects.com">&copy; {{ year }} MAVP Projects</a>
        <div class="flex gap-8">
          <p class="cursor-pointer text-neutral-300 hover:text-main duration-300" [routerLink]="'/terms'">Términos y Condiciones</p>
          <p class="cursor-pointer text-neutral-300 hover:text-main duration-300" [routerLink]="'/privacy'">Política de Privacidad</p>
          <p class="cursor-pointer text-neutral-300 hover:text-main duration-300" [routerLink]="'/cookies'">Política de Cookies</p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class FooterComponent {
  Feather = faFeather;

  year = new Date().getFullYear();

  routesWeb = [
    { path: 'main/home', name: 'Home' },
    { path: 'main/about', name: 'Acerca de' },
    { path: 'main/social', name: 'Social' },
  ];

  routesLigas = [
    { path: 'liga1', name: 'Liga 1' },
    { path: 'liga2', name: 'Liga 2' },
    { path: 'liga3', name: 'Liga 3' },
    { path: 'copa-peru', name: 'Copa Perú' },
  ];
}