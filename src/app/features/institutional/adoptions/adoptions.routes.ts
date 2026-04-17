import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: 'Adoções',
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista',
  },
  {
    title: 'Lista de suas adoções',
    path: 'lista',
    loadComponent: () =>
      import('./list/list').then(m => m.List)
  },
  {
    title: 'Detalhes da Adoção',
    path: 'detalhes/:id',
    loadComponent: () =>
      import('./details/details').then(m => m.Details)
  }
];
