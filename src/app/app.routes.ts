import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { AboutComponent } from './pages/main/about/about.component';
import { SocialComponent } from './pages/main/social/social.component';
import { L1MainComponent } from './pages/liga1/l1-main/l1-main.component';
import { L1TeamsComponent } from './pages/liga1/l1-teams/l1-teams.component';
import { L1FixtureComponent } from './pages/liga1/l1-fixture/l1-fixture.component';
import { L1TableComponent } from './pages/liga1/l1-table/l1-table.component';
import { L1ManagersComponent } from './pages/liga1/l1-managers/l1-managers.component';
import { L2MainComponent } from './pages/liga2/l2-main/l2-main.component';
import { L2TeamsComponent } from './pages/liga2/l2-teams/l2-teams.component';
import { L2FixtureComponent } from './pages/liga2/l2-fixture/l2-fixture.component';
import { L2TableComponent } from './pages/liga2/l2-table/l2-table.component';
import { L2ManagersComponent } from './pages/liga2/l2-managers/l2-managers.component';
import { L3MainComponent } from './pages/liga3/l3-main/l3-main.component';
import { L3TeamsComponent } from './pages/liga3/l3-teams/l3-teams.component';
import { L3FixtureComponent } from './pages/liga3/l3-fixture/l3-fixture.component';
import { L3TableComponent } from './pages/liga3/l3-table/l3-table.component';
import { L3ManagersComponent } from './pages/liga3/l3-managers/l3-managers.component';
import { CpMainComponent } from './pages/copa-peru/cp-main/cp-main.component';
import { CpTeamsComponent } from './pages/copa-peru/cp-teams/cp-teams.component';
import { CpFixtureComponent } from './pages/copa-peru/cp-fixture/cp-fixture.component';
import { CpTableComponent } from './pages/copa-peru/cp-table/cp-table.component';
import { NotFoundComponent } from './pages/main/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'social', component: SocialComponent },
  {
    path: 'liga1',
    component: L1MainComponent,
    children: [
      { path: 'equipos', component: L1TeamsComponent },
      { path: 'fixture', component: L1FixtureComponent },
      { path: 'tabla', component: L1TableComponent },
      { path: 'tecnicos', component: L1ManagersComponent },
    ],
  },
  {
    path: 'liga2',
    component: L2MainComponent,
    children: [
      { path: 'equipos', component: L2TeamsComponent },
      { path: 'fixture', component: L2FixtureComponent },
      { path: 'tabla', component: L2TableComponent },
      { path: 'tecnicos', component: L2ManagersComponent },
    ],
  },
  {
    path: 'liga3',
    component: L3MainComponent,
    children: [
      { path: 'equipos', component: L3TeamsComponent },
      { path: 'fixture', component: L3FixtureComponent },
      { path: 'tabla', component: L3TableComponent },
      { path: 'tecnicos', component: L3ManagersComponent },
    ],
  },
  {
    path: 'copa-peru',
    component: CpMainComponent,
    children: [
      { path: 'equipos', component: CpTeamsComponent },
      { path: 'fixture', component: CpFixtureComponent },
      { path: 'tabla', component: CpTableComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
