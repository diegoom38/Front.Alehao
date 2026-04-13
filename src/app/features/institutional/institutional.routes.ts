import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./institutional').then((m) => m.Institutional),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'casos',
        title: 'Casos',
        loadChildren: () => import('./cases/cases.routes').then((m) => m.routes),
      },
      {
        path: 'voluntarios',
        title: 'Voluntários',
        loadChildren: () => import('./operators/operators.routes').then((m) => m.routes),
      },
    ],
  },
];
