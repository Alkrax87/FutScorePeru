import { Routes } from '@angular/router';
import { IndexComponent } from './pages/main/index.component';
import { HomeComponent } from './pages/main/home/home.component';
import { AboutComponent } from './pages/main/about/about.component';
import { SocialComponent } from './pages/main/social/social.component';
import { L1MainComponent } from './pages/liga1/l1-main.component';
import { L1HomeComponent } from './pages/liga1/l1-home/l1-home.component';
import { L1TeamsComponent } from './pages/liga1/l1-teams/l1-teams.component';
import { L1FixtureComponent } from './pages/liga1/l1-fixture/l1-fixture.component';
import { L1TableComponent } from './pages/liga1/l1-table/l1-table.component';
import { L1ManagersComponent } from './pages/liga1/l1-managers/l1-managers.component';
import { L1StatisticsComponent } from './pages/liga1/l1-statistics/l1-statistics.component';
import { L2MainComponent } from './pages/liga2/l2-main.component';
import { L2HomeComponent } from './pages/liga2/l2-home/l2-home.component';
import { L2TeamsComponent } from './pages/liga2/l2-teams/l2-teams.component';
import { L2FixtureComponent } from './pages/liga2/l2-fixture/l2-fixture.component';
import { L2TableComponent } from './pages/liga2/l2-table/l2-table.component';
import { L2ManagersComponent } from './pages/liga2/l2-managers/l2-managers.component';
import { L2StatisticsComponent } from './pages/liga2/l2-statistics/l2-statistics.component';
import { L3MainComponent } from './pages/liga3/l3-main.component';
import { L3HomeComponent } from './pages/liga3/l3-home/l3-home.component';
import { L3TeamsComponent } from './pages/liga3/l3-teams/l3-teams.component';
import { L3FixtureComponent } from './pages/liga3/l3-fixture/l3-fixture.component';
import { L3TableComponent } from './pages/liga3/l3-table/l3-table.component';
import { L3StatisticsComponent } from './pages/liga3/l3-statistics/l3-statistics.component';
import { CpMainComponent } from './pages/copa-peru/cp-main.component';
import { CpHomeComponent } from './pages/copa-peru/cp-home/cp-home.component';
import { CpLeaguesComponent } from './pages/copa-peru/cp-leagues/cp-leagues.component';
import { CpBracketsComponent } from './pages/copa-peru/cp-brackets/cp-brackets.component';
import { NotFoundComponent } from './pages/main/not-found/not-found.component';
import { TestComponent } from './pages/main/test/test.component';
import { TeamPageComponent } from './pages/shared/team-page/team-page.component';
import { OverviewComponent } from './pages/shared/team-page/overview/overview.component';
import { ResultsComponent } from './pages/shared/team-page/results/results.component';
import { StadiumComponent } from './pages/shared/team-page/stadium/stadium.component';
import { ClubComponent } from './pages/shared/team-page/club/club.component';
import { LeaguePageComponent } from './pages/shared/league-page/league-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'social', component: SocialComponent },
      { path: 'test', component: TestComponent },
    ],
  },
  {
    path: 'liga1',
    component: L1MainComponent,
    title: 'Liga 1',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: L1HomeComponent },
      { path: 'clubes', component: L1TeamsComponent, title: 'Liga 1 | Clubes' },
      { path: 'fixture', component: L1FixtureComponent, title: 'Liga 1 | Fixture' },
      { path: 'tabla', component: L1TableComponent, title: 'Liga 1 | Tabla' },
      { path: 'tecnicos', component: L1ManagersComponent, title: 'Liga 1 | Técnicos' },
      { path: 'estadisticas', component: L1StatisticsComponent, title: 'Liga 1 | Estadísticas' },
      {
        path: 'club/:category/:teamId',
        component: TeamPageComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: OverviewComponent },
          { path: 'resultados', component: ResultsComponent },
          { path: 'estadio', component: StadiumComponent },
          { path: 'club', component: ClubComponent },
        ],
      },
    ],
  },
  {
    path: 'liga2',
    component: L2MainComponent,
    title: 'Liga 2',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: L2HomeComponent },
      { path: 'clubes', component: L2TeamsComponent, title: 'Liga 2 | Clubes' },
      { path: 'fixture', component: L2FixtureComponent, title: 'Liga 2 | Fixture' },
      { path: 'tabla', component: L2TableComponent, title: 'Liga 2 | Tabla' },
      { path: 'tecnicos', component: L2ManagersComponent, title: 'Liga 2 | Técnicos' },
      { path: 'estadisticas', component: L2StatisticsComponent, title: 'Liga 2 | Estadísticas' },
      {
        path: 'club/:category/:teamId',
        component: TeamPageComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: OverviewComponent },
          { path: 'resultados', component: ResultsComponent },
          { path: 'estadio', component: StadiumComponent },
          { path: 'club', component: ClubComponent },
        ],
      },
    ],
  },
  {
    path: 'liga3',
    component: L3MainComponent,
    title: 'Liga 3',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: L3HomeComponent },
      { path: 'clubes', component: L3TeamsComponent, title: 'Liga 3 | Clubes' },
      { path: 'fixture', component: L3FixtureComponent, title: 'Liga 3 | Fixture' },
      { path: 'tabla', component: L3TableComponent, title: 'Liga 3 | Tabla' },
      { path: 'estadisticas', component: L3StatisticsComponent, title: 'Liga 3 | Estadísticas' },
      {
        path: 'club/:category/:teamId',
        component: TeamPageComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: OverviewComponent },
          { path: 'resultados', component: ResultsComponent },
          { path: 'estadio', component: StadiumComponent },
          { path: 'club', component: ClubComponent },
        ],
      },
    ],
  },
  {
    path: 'copa-peru',
    component: CpMainComponent,
    title: 'Copa Perú',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CpHomeComponent },
      { path: 'ligas', component: CpLeaguesComponent, title: 'Copa Perú | Ligas' },
      { path: 'brackets', component: CpBracketsComponent, title: 'Copa Perú | Brackets' },
      { path: 'liga/:category/:leagueId', component: LeaguePageComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];