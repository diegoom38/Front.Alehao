import { Component, signal, WritableSignal } from '@angular/core';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/components/select/select.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { RouterLink } from "@angular/router";
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from "../../../../shared/components/base-card/base-card";
import { Tag } from "../../../../shared/components/tag/tag";
import { Paginator } from "../../../../shared/components/paginator/paginator";

@Component({
  selector: 'app-list',
  imports: [SelectComponent, InputComponent, RouterLink, ButtonComponent, BaseCard, Tag, Paginator],
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
