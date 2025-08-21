import { Routes } from '@angular/router';

import { MainLayout } from '@layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tip',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'tip',
        loadComponent: () =>
          import('./features/tip-calculator/components/form/form').then((m) => m.Form),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
