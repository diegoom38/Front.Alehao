import { Component, input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full space-y-1.5">
      <div class="flex justify-between items-end px-1">
        <label 
          [for]="selectId"
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          {{ label() }}
        </label>
        
        <ng-content select="[label-action]"></ng-content>
      </div>
      
      <div class="relative group">
        <select 
          [id]="selectId"
          [value]="value"
          [disabled]="disabled"
          (change)="handleChange($event)"
          (blur)="onTouched()"
          class="w-full max-h-[48px] px-4 mr-6 py-3 bg-slate-50 border border-[var(--color-primary)]/30 rounded-2xl 
                 text-slate-900 font-medium appearance-none
                 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5
                 transition-all outline-none 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 cursor-pointer">
          
          @if (placeholder()) {
            <option value="" disabled selected hidden>{{ placeholder() }}</option>
          }

          @for (option of options(); track option.value) {
            <option [value]="option.value">{{ option.label }}</option>
          }
        </select>
        
        <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      @if (hint()) {
        <p class="text-[10px] text-slate-400 px-1">{{ hint() }}</p>
      }
    </div>
  `
})
export class SelectComponent implements ControlValueAccessor {
  label = input<string>();
  placeholder = input<string>('');
  options = input.required<SelectOption[]>();
  hint = input<string>();

  protected selectId = `alehao-select-${Math.random().toString(36).slice(2, 9)}`;

  value: any = '';
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  handleChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: any): void { this.value = val || ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}