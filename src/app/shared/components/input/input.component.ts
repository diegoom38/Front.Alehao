import { Component, input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full space-y-1.5">
      <div class="flex justify-between items-end px-1">
        <label 
          [for]="inputId"
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          {{ label() }}
        </label>
        
        <ng-content select="[label-action]"></ng-content>
      </div>
      
      <div class="relative group">
        <input 
          [id]="inputId"
          [type]="type()" 
          [placeholder]="placeholder()" 
          [value]="value"
          [disabled]="disabled"
          [name]="name()"
          [autocomplete]="autocomplete()"
          (input)="handleInput($event)"
          (blur)="onTouched()"
          class="w-full max-h-[48px] px-4 py-3 bg-slate-50 border border-[var(--color-primary)]/30 rounded-2xl 
                 text-slate-900 font-medium placeholder:text-slate-300
                 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5
                 transition-all outline-none 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 selection:bg-[var(--color-primary)]/10"
        >
        
        <div class="absolute right-4 top-1/2 -translate-y-1/2">
          <ng-content select="[suffix]"></ng-content>
        </div>
      </div>

      @if (hint()) {
        <p class="text-[10px] text-slate-400 px-1">{{ hint() }}</p>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  // Configurações básicas
  label = input<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  name = input<string>('');
  autocomplete = input<string>('off');
  hint = input<string>();

  // ID único para acessibilidade
  protected inputId = `alehao-input-${Math.random().toString(36).slice(2, 9)}`;

  // --- Lógica de Valor ---
  value: string = '';
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: any): void { this.value = val || ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}