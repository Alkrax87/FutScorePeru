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
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: L1HomeComponent },
      { path: 'equipos', component: L1TeamsComponent },
      { path: 'fixture', component: L1FixtureComponent },
      { path: 'tabla', component: L1TableComponent },
      { path: 'tecnicos', component: L1ManagersComponent },
      { path: 'estadisticas', component: L1StatisticsComponent },
      { path: 'club/:category/:teamId', component: TeamPageComponent },
    ],
  },
  {
    path: 'liga2',
    component: L2MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: L2HomeComponent },
      { path: 'equipos', component: L2TeamsComponent },
      { path: 'fixture', component: L2FixtureComponent },
      { path: 'tabla', component: L2TableComponent },
      { path: 'tecnicos', component: L2ManagersComponent },
      { path: 'estadisticas', component: L2StatisticsComponent },
      { path: 'club/:category/:teamId', component: TeamPageComponent },
    ],
  },
  {
    path: 'liga3',
    component: L3MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: L3HomeComponent },
      { path: 'equipos', component: L3TeamsComponent },
      { path: 'fixture', component: L3FixtureComponent },
      { path: 'tabla', component: L3TableComponent },
      { path: 'estadisticas', component: L3StatisticsComponent },
      { path: 'club/:category/:teamId', component: TeamPageComponent },
    ],
  },
  {
    path: 'copa-peru',
    component: CpMainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CpHomeComponent },
      { path: 'ligas', component: CpLeaguesComponent },
      { path: 'brackets', component: CpBracketsComponent },
      { path: 'liga/:category/:leagueId', component: LeaguePageComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];