import { Component, signal, WritableSignal } from '@angular/core';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/components/select/select.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { RouterLink } from "@angular/router";
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from "../../../../shared/components/base-card/base-card";

@Component({
  selector: 'app-list',
  imports: [SelectComponent, InputComponent, RouterLink, ButtonComponent, BaseCard],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public statusOptions: WritableSignal<SelectOption[]> = signal<SelectOption[]>([
    { label: 'Todos', value: 'TODOS' },
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' }
  ]);
}
