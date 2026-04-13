import { Component, signal, WritableSignal } from '@angular/core';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/components/select/select.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { RouterLink } from "@angular/router";
import { BaseCard } from "../../../../shared/components/base-card/base-card";

@Component({
  selector: 'app-list',
  imports: [SelectComponent, InputComponent, RouterLink, BaseCard],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public statusOptions: WritableSignal<SelectOption[]> = signal<SelectOption[]>([
    { label: 'Todos', value: 'TODOS' },
    { label: 'Pendente', value: 'PENDENTE' },
    { label: 'Em andamento', value: 'EM_ANDAMENTO' },
    { label: 'Concluído', value: 'CONCLUIDO' },
  ]);
}
