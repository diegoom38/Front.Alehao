import { Component, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from "../../../../shared/components/base-card/base-card";
import { SelectOption } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-details',
  imports: [ButtonComponent, BaseCard],
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
