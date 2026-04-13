import { Routes } from "@angular/router";
import { List } from "./list/list";
import { Details } from "./details/details";

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
    loadComponent: () => List
  },
  {
    title: 'Detalhes do Voluntário',
    path: 'detalhes/:id',
    loadComponent: () => Details
  }
];
