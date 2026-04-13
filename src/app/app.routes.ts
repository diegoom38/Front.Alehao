import { Routes } from '@angular/router';
import { ReportComponent } from './features/report/components/report-component/report-component';
import { DashboardComponent } from './features/institutional/dashboard/dashboard';
import { LandingPage } from './features/landing-page/landing-page';
import { Auth } from './features/auth/auth';

export const routes: Routes = [
  {
    title: 'Alehao',
    path: '',
    loadComponent: () => LandingPage,
  },
  {
    title: 'Autenticar',
    path: 'autenticar', 
    loadComponent: () => Auth,
  },
  {
    title: 'Denuncie aqui',
    path: 'denuncie-aqui',
    loadComponent: () => ReportComponent,
  },
  {
    title: 'Institucional',
    path: 'institucional',
    loadChildren: () => import('./features/institutional/institutional.routes').then(m => m.routes),
  },
];
