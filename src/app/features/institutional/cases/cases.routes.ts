import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: 'Casos',
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista',
  },
  {
    title: 'Lista de Casos',
    path: 'lista',
    loadComponent: () =>
      import('./list/list').then(m => m.List)
  },
  {
    title: 'Detalhes do Caso',
    path: 'detalhes/:id',
    loadComponent: () =>
      import('./details/details').then(m => m.Details)
  }
];
