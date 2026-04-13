import { Component, signal, WritableSignal } from '@angular/core';
import { SelectComponent, SelectOption } from '../../../../shared/components/select/select.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from "../../../../shared/components/base-card/base-card";

@Component({
  selector: 'app-details',
  imports: [SelectComponent, InputComponent, ButtonComponent, BaseCard],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  public statusOptions: WritableSignal<SelectOption[]> = signal<SelectOption[]>([
    { label: 'Pendente', value: 'PENDENTE' },
    { label: 'Em andamento', value: 'EM_ANDAMENTO' },
    { label: 'Concluído', value: 'CONCLUIDO' },
  ]);
}
