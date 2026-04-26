import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: 'Eventos',
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista',
  },
  {
    title: 'Lista de Eventos',
    path: 'lista',
    loadComponent: () =>
      import('./list/list').then(m => m.List)
  },
  {
    title: 'Detalhes do Evento',
    path: 'detalhes/:id',
    loadComponent: () =>
      import('./details/details').then(m => m.Details)
  }
];