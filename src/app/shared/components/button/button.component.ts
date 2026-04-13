import { Component, input, InputSignal } from '@angular/core';

export type ButtonType = 'primary' | 'secondary' | 'success';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  public label: InputSignal<string> = input('');
  public type: InputSignal<ButtonType> = input<ButtonType>('primary');
  public fullWidth: InputSignal<boolean> = input(false);

  get classes(): string {
    const base = 'py-3 px-6 font-bold rounded-xl transition shadow-lg';
    const typeClasses = {
      primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
      secondary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-blue-50',
      success: 'bg-[var(--color-secondary)] text-gray-800 hover:bg-[var(--color-secondary-hover)]'
    };
    return `${base} ${typeClasses[this.type()]} ${this.fullWidth() ? 'w-full' : ''} transition-all hover:scale-[1.02] active:scale-95vida`;
  }
}