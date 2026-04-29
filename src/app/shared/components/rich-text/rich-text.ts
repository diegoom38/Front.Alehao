import {
  Component,
  ElementRef,
  ViewChild,
  forwardRef,
  HostListener,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rich-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden shadow-lg w-full">

      <div class="flex flex-wrap gap-1 p-3 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">

        <div class="flex gap-1">
          <button type="button" (mousedown)="$event.preventDefault(); exec('bold')" 
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">format_bold</span>
          </button>
          <button type="button" (mousedown)="$event.preventDefault(); exec('italic')" 
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">format_italic</span>
          </button>
          <button type="button" (mousedown)="$event.preventDefault(); exec('underline')" 
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">format_underlined</span>
          </button>
        </div>

        <div class="w-px h-6 bg-[var(--border-primary)] self-center mx-1"></div>

        <div class="flex gap-1">
          <button type="button" (mousedown)="$event.preventDefault(); exec('insertUnorderedList')" 
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">format_list_bulleted</span>
          </button>
          <button type="button" (mousedown)="$event.preventDefault(); exec('insertOrderedList')" 
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">format_list_numbered</span>
          </button>
        </div>

        <div class="w-px h-6 bg-[var(--border-primary)] self-center mx-1"></div>

        <div class="flex gap-1">
          <button type="button" (click)="toggleLinkPanel()" 
            [class.bg-blue-100]="isLinkPanelVisible"
            [class.text-blue-600]="isLinkPanelVisible"
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">link</span>
          </button>
          <button type="button" (mousedown)="$event.preventDefault(); exec('unlink')" 
            class="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all active:scale-95">
            <span class="material-symbols-outlined !text-[20px]">link_off</span>
          </button>
        </div>
      </div>

      @if (isLinkPanelVisible) {
        <div class="absolute left-4 right-4 top-16 z-50 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Adicionar Link</span>
            <div class="flex gap-2">
              <input #linkInput type="text" placeholder="Cole a URL aqui..." 
                (keyup.enter)="insertLink(linkInput.value)"
                class="flex-grow p-2 px-4 text-sm rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 outline-none">
              <button (click)="insertLink(linkInput.value)" 
                class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      }

      <div
        #editor
        contenteditable="true"
        (input)="onInput()"
        (blur)="onTouched()"
        class="p-5 min-h-[250px] max-h-[500px] overflow-y-auto outline-none text-[var(--text-primary)] 
               [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 
               [&_a]:text-blue-600 [&_a]:underline [&_p]:mb-2 [&_p:last-child]:mb-0">
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichText),
      multi: true
    }
  ]
})
export class RichText implements ControlValueAccessor {
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;
  @ViewChild('linkInput') linkInput?: ElementRef<HTMLInputElement>;

  isLinkPanelVisible = false;
  private savedSelection: Range | null = null;

  private onChange = (value: string) => {};
  public onTouched = () => {};

  constructor(private renderer: Renderer2) {}

  // ControlValueAccessor
  public writeValue(value: string): void {
    const content = value || '<p><br></p>';
    this.renderer.setProperty(this.editor.nativeElement, 'innerHTML', content);
  }

  public registerOnChange(fn: any): void { this.onChange = fn; }
  public registerOnTouched(fn: any): void { this.onTouched = fn; }

  // Comandos
  public exec(command: string): void {
    document.execCommand(command, false);
    this.editor.nativeElement.focus();
    this.onInput();
  }

  // Lógica do Link
  public toggleLinkPanel(): void {
    if (!this.isLinkPanelVisible) {
      this.savedSelection = this.saveSelection();
      this.isLinkPanelVisible = true;
      setTimeout(() => this.linkInput?.nativeElement.focus(), 50);
    } else {
      this.closeLinkPanel();
    }
  }

  public insertLink(url: string): void {
    if (url && this.savedSelection) {
      this.restoreSelection(this.savedSelection);
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      document.execCommand('createLink', false, fullUrl);
      this.onInput();
    }
    this.closeLinkPanel();
  }

  private closeLinkPanel(): void {
    this.isLinkPanelVisible = false;
    this.savedSelection = null;
    this.editor.nativeElement.focus();
  }

  private saveSelection(): Range | null {
    const sel = window.getSelection();
    return sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
  }

  private restoreSelection(range: Range): void {
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  public onInput(): void {
    this.onChange(this.editor.nativeElement.innerHTML);
  }

  @HostListener('document:mousedown', ['$event'])
  public onClickOutside(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('app-rich-text');
    if (!clickedInside && this.isLinkPanelVisible) {
      this.closeLinkPanel();
    }
  }
}