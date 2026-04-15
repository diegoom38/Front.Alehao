import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/components/select/select.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from '../../../../shared/components/base-card/base-card';
import { ModalService } from '../../../../shared/services/modal';

@Component({
  selector: 'app-details',
  imports: [SelectComponent, InputComponent, ButtonComponent, BaseCard],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private readonly modalService: ModalService = inject(ModalService);
  public statusOptions: WritableSignal<SelectOption[]> = signal<SelectOption[]>([
    { label: 'Pendente', value: 'PENDENTE' },
    { label: 'Em andamento', value: 'EM_ANDAMENTO' },
    { label: 'Concluído', value: 'CONCLUIDO' },
  ]);

  public async concluirCaso(): Promise<void> {
    // 1º Passo: Confirmação de Encerramento
    const confirmarConclusao = await this.modalService.openConfirm({
      title: 'Concluir Caso',
      description: 'Deseja encerrar este chamado? O animal será marcado como resgatado no sistema.',
      icon: 'task_alt',
    });

    if (confirmarConclusao) {
      // Aqui você faria a chamada para sua API para encerrar o caso
      console.log('Caso AHL-2031 encerrado.');

      // 2º Passo: O "Upsell" Social (Pergunta sobre adoção)
      // Pequeno delay para a animação do primeiro modal fechar suavemente
      setTimeout(async () => {
        const querAdotar = await this.modalService.openConfirm({
          title: 'Caso Encerrado!',
          description:
            'Ficamos felizes que o resgate foi um sucesso. Gostaria de disponibilizar este animal para adoção no Portal do Anjo agora?',
          icon: 'pets', // Ícone de patinha do Material Symbols
        });

        if (querAdotar) {
          // Redireciona para a tela de cadastro de adoção ou abre um form
          console.log('Redirecionando para cadastro de adoção...');
          // this.router.navigate(['/adocao/cadastrar', { casoId: 'AHL-2031' }]);
        }
      }, 300);
    }
  }
}
