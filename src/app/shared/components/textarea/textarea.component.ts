import { Component, input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full space-y-1.5">
      
      <!-- Label -->
      <div class="flex justify-between items-end px-1">
        <label 
          [for]="textareaId"
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
          {{ label() }}
        </label>
        
        <ng-content select="[label-action]"></ng-content>
      </div>
      
      <!-- Textarea -->
      <div class="relative group">
        <textarea 
          #textarea
          [id]="textareaId"
          [placeholder]="placeholder()" 
          [value]="value"
          [disabled]="disabled"
          [rows]="rows()"
          (input)="handleInput($event, textarea)"
          (blur)="onTouched()"
          class="w-full px-4 py-3 border rounded-2xl 
                 font-medium resize-none overflow-hidden
                 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5
                 transition-all outline-none 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 selection:bg-[var(--color-primary)]/10"
          style="background-color: var(--input-bg); border-color: var(--input-border); color: var(--input-text);"
        ></textarea>
        
        <!-- Ícone -->
        <div class="absolute right-4 bottom-4 opacity-20 pointer-events-none group-focus-within:text-[var(--color-primary)] group-focus-within:opacity-100 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21 15-6 6"/><path d="m21 9-12 12"/>
          </svg>
        </div>
      </div>

      <!-- Hint -->
      @if (hint()) {
        <p class="text-[10px] text-slate-400 px-1">{{ hint() }}</p>
      }
      
    </div>
  `
})
export class TextareaComponent implements ControlValueAccessor {
  label = input.required<string>();
  placeholder = input<string>('');
  rows = input<number>(4);
  hint = input<string>();

  protected textareaId = `alehao-textarea-${Math.random().toString(36).slice(2, 9)}`;

  value: string = '';
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  handleInput(event: Event, textarea: HTMLTextAreaElement) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.onChange(val);

    this.autoResize(textarea);
  }

  autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  writeValue(val: any): void {
    this.value = val || '';
    
    // pequeno delay pra garantir render antes de medir
    setTimeout(() => {
      const el = document.getElementById(this.textareaId) as HTMLTextAreaElement;
      if (el) this.autoResize(el);
    });
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}