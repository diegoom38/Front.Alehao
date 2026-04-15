import { Routes } from "@angular/router";
import { List } from "./list/list";
import { Details } from "./details/details";

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
    loadComponent: () => List
  },
  {
    title: 'Detalhes da Adoção',
    path: 'detalhes/:id',
    loadComponent: () => Details
  }
];
