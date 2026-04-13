import { Routes } from "@angular/router";
import { List } from "./list/list";
import { Details } from "./details/details";

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
    loadComponent: () => List
  },
  {
    title: 'Detalhes do Caso',
    path: 'detalhes/:id',
    loadComponent: () => Details
  }
];
