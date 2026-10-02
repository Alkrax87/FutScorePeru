import { Routes } from '@angular/router';

const teamDetailChildren = (): Routes => [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', loadComponent: () => import('./pages/shared/team-page/overview/overview.component').then((m) => m.OverviewComponent) },
  { path: 'fixture', loadComponent: () => import('./pages/shared/team-page/fixture/fixture.component').then((m) => m.FixtureComponent) },
  { path: 'stadium', loadComponent: () => import('./pages/shared/team-page/stadium/stadium.component').then((m) => m.StadiumComponent) },
  { path: 'honours', loadComponent: () => import('./pages/shared/team-page/honours/honours.component').then((m) => m.HonoursComponent) },
  { path: 'identity', loadComponent: () => import('./pages/shared/team-page/identity/identity.component').then((m) => m.IdentityComponent) },
];

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Inicio',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    title: 'Acerca de',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'social',
    title: 'Social',
    loadComponent: () => import('./pages/social/social.component').then((m) => m.SocialComponent),
  },
  {
    path: 'test',
    title: 'Test',
    loadComponent: () => import('./pages/test/test.component').then((m) => m.TestComponent),
  },
  {
    path: 'liga1',
    title: 'Liga 1',
    loadComponent: () => import('./pages/liga1/l1-main.component').then((m) => m.L1MainComponent),
    children: [
      {
        path: '',
        title: 'Liga 1 | Inicio',
        loadComponent: () => import('./pages/liga1/l1-home/l1-home.component').then((m) => m.L1HomeComponent),
      },
      {
        path: 'clubes',
        title: 'Liga 1 | Clubes',
        loadComponent: () => import('./pages/liga1/l1-teams/l1-teams.component').then((m) => m.L1TeamsComponent),
      },
      {
        path: 'fixture',
        title: 'Liga 1 | Fixture',
        loadComponent: () => import('./pages/liga1/l1-fixture/l1-fixture.component').then((m) => m.L1FixtureComponent),
      },
      {
        path: 'tabla',
        title: 'Liga 1 | Tabla',
        loadComponent: () => import('./pages/liga1/l1-table/l1-table.component').then((m) => m.L1TableComponent),
      },
      {
        path: 'playoffs',
        title: 'Liga 1 | Play-Offs',
        loadComponent: () => import('./pages/liga1/l1-play-offs/l1-play-offs.component').then((m) => m.L1PlayOffsComponent),
      },
      {
        path: 'tecnicos',
        title: 'Liga 1 | Técnicos',
        loadComponent: () => import('./pages/liga1/l1-managers/l1-managers.component').then((m) => m.L1ManagersComponent),
      },
      {
        path: 'estadisticas',
        title: 'Liga 1 | Estadísticas',
        loadComponent: () => import('./pages/liga1/l1-statistics/l1-statistics.component').then((m) => m.L1StatisticsComponent),
      },
      {
        path: 'club/:category/:teamId',
        loadComponent: () => import('./pages/shared/team-page/team-page.component').then((m) => m.TeamPageComponent),
        children: teamDetailChildren(),
      },
    ],
  },
  {
    path: 'liga2',
    title: 'Liga 2',
    loadComponent: () => import('./pages/liga2/l2-main.component').then((m) => m.L2MainComponent),
    children: [
      {
        path: '',
        title: 'Liga 2 | Inicio',
        loadComponent: () => import('./pages/liga2/l2-home/l2-home.component').then((m) => m.L2HomeComponent),
      },
      {
        path: 'clubes',
        title: 'Liga 2 | Clubes',
        loadComponent: () => import('./pages/liga2/l2-teams/l2-teams.component').then((m) => m.L2TeamsComponent),
      },
      {
        path: 'fixture',
        title: 'Liga 2 | Fixture',
        loadComponent: () => import('./pages/liga2/l2-fixture/l2-fixture.component').then((m) => m.L2FixtureComponent),
      },
      {
        path: 'tabla',
        title: 'Liga 2 | Tabla',
        loadComponent: () => import('./pages/liga2/l2-table/l2-table.component').then((m) => m.L2TableComponent),
      },
      {
        path: 'playoffs',
        title: 'Liga 2 | Play-Offs',
        loadComponent: () => import('./pages/liga2/l2-play-offs/l2-play-offs.component').then((m) => m.L2PlayOffsComponent),
      },
      {
        path: 'tecnicos',
        title: 'Liga 2 | Técnicos',
        loadComponent: () => import('./pages/liga2/l2-managers/l2-managers.component').then((m) => m.L2ManagersComponent),
      },
      {
        path: 'estadisticas',
        title: 'Liga 2 | Estadísticas',
        loadComponent: () => import('./pages/liga2/l2-statistics/l2-statistics.component').then((m) => m.L2StatisticsComponent),
      },
      {
        path: 'club/:category/:teamId',
        loadComponent: () => import('./pages/shared/team-page/team-page.component').then((m) => m.TeamPageComponent),
        children: teamDetailChildren(),
      },
    ],
  },
  {
    path: 'liga3',
    title: 'Liga 3',
    loadComponent: () => import('./pages/liga3/l3-main.component').then((m) => m.L3MainComponent),
    children: [
      {
        path: '',
        title: 'Liga 3 | Inicio',
        loadComponent: () => import('./pages/liga3/l3-home/l3-home.component').then((m) => m.L3HomeComponent),
      },
      {
        path: 'clubes',
        title: 'Liga 3 | Clubes',
        loadComponent: () => import('./pages/liga3/l3-teams/l3-teams.component').then((m) => m.L3TeamsComponent),
      },
      {
        path: 'fixture',
        title: 'Liga 3 | Fixture',
        loadComponent: () => import('./pages/liga3/l3-fixture/l3-fixture.component').then((m) => m.L3FixtureComponent),
      },
      {
        path: 'tabla',
        title: 'Liga 3 | Tabla',
        loadComponent: () => import('./pages/liga3/l3-table/l3-table.component').then((m) => m.L3TableComponent),
      },
      {
        path: 'playoffs',
        title: 'Liga 3 | Play-Offs',
        loadComponent: () => import('./pages/liga3/l3-play-offs/l3-play-offs.component').then((m) => m.L3PlayOffsComponent),
      },
      {
        path: 'estadisticas',
        title: 'Liga 3 | Estadísticas',
        loadComponent: () => import('./pages/liga3/l3-statistics/l3-statistics.component').then((m) => m.L3StatisticsComponent),
      },
      {
        path: 'club/:category/:teamId',
        loadComponent: () => import('./pages/shared/team-page/team-page.component').then((m) => m.TeamPageComponent),
        children: teamDetailChildren(),
      },
    ],
  },
  {
    path: 'copa-peru',
    title: 'Copa Perú',
    loadComponent: () => import('./pages/copa-peru/cp-main.component').then((m) => m.CpMainComponent),
    children: [
      {
        path: '',
        title: 'Copa Perú | Inicio',
        loadComponent: () => import('./pages/copa-peru/cp-home/cp-home.component').then((m) => m.CpHomeComponent),
      },
      {
        path: 'ligas',
        title: 'Copa Perú | Ligas',
        loadComponent: () => import('./pages/copa-peru/cp-leagues/cp-leagues.component').then((m) => m.CpLeaguesComponent),
      },
      {
        path: 'fixture',
        title: 'Copa Perú | Fixture',
        loadComponent: () => import('./pages/copa-peru/cp-fixture/cp-fixture.component').then((m) => m.CpFixtureComponent),
      },
      {
        path: 'tabla',
        title: 'Copa Perú | Tabla',
        loadComponent: () => import('./pages/copa-peru/cp-table/cp-table.component').then((m) => m.CpTableComponent),
      },
      {
        path: 'playoffs',
        title: 'Copa Perú | Play-Offs',
        loadComponent: () => import('./pages/copa-peru/cp-play-offs/cp-play-offs.component').then((m) => m.CpPlayOffsComponent),
      },
      {
        path: 'liga/:leagueId',
        loadComponent: () => import('./pages/shared/league-page/league-page.component').then((m) => m.LeaguePageComponent),
      },
    ],
  },
  {
    path: 'not-found',
    title: 'Página no encontrada',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];