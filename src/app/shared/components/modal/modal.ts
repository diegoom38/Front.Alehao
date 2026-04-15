import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        <div class="px-6 pt-8 pb-4 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
            <span class="material-symbols-outlined text-4xl font-light">{{ icon() }}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-900">{{ title() }}</h3>
          <p class="text-sm text-slate-500 mt-2 leading-relaxed px-4">
            {{ description() }}
          </p>
        </div>

        <div class="flex gap-3 px-6 pb-8 pt-4 justify-center">
          <app-button 
            (click)="onCancel.emit()"
            label="Cancelar"
            type="secondary">
          </app-button>
          <app-button 
            (click)="onConfirm.emit()"
            label="Confirmar"
            type="primary"
          >
          </app-button>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  title = input.required<string>();
  description = input.required<string>();
  icon = input<string>('help_outline');

  onConfirm = output<void>();
  onCancel = output<void>();
}