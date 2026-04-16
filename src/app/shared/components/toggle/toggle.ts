import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
  templateUrl: './toggle.html',
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  // Estado interno usando Signals (Performance e reatividade moderna)
  checked = signal(false);
  disabled = signal(false);

  // Funções de callback do ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  toggle() {
    if (!this.disabled()) {
      this.checked.update((v) => !v);
      this.onChange(this.checked());
      this.onTouched();
    }
  }

  // Métodos obrigatórios da interface
  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}