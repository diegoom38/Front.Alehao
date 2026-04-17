import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: 'Voluntários',
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista',
  },
  {
    title: 'Lista de Voluntário',
    path: 'lista',
    loadComponent: () =>
      import('./list/list').then(m => m.List)
  },
  {
    title: 'Detalhes do Voluntário',
    path: 'detalhes/:id',
    loadComponent: () =>
      import('./details/details').then(m => m.Details)
  }
];