import { NgClass } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';

export type TagVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.html',
  imports: [NgClass]
})
export class Tag {
  @Input({ required: true }) label!: string;
  @Input() variant: TagVariant = 'default';
  @Input() id?: string;
  @Input() icon?: string;
  @Input() ariaLabel?: string;
  @Input() clickable = false;
  @Input() fullWidth = false;

  @HostBinding('attr.role') get role() {
    return this.clickable ? 'button' : 'status';
  }

  @HostBinding('attr.tabindex') get tabindex() {
    return this.clickable ? 0 : -1;
  }

  @HostBinding('attr.aria-label') get aria() {
    return this.ariaLabel || this.label;
  }

  get classes(): string {
    const base =
      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition';

    const variants: Record<TagVariant, string> = {
      default: 'bg-gray-200 text-gray-700',
      primary: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
      info: 'bg-cyan-100 text-cyan-700',
    };

    const clickable = this.clickable
      ? 'cursor-pointer hover:brightness-95 active:scale-95'
      : '';

    const fullWidth = this.fullWidth ? 'w-full justify-center'
      : '';

    return `${base} ${variants[this.variant]} ${clickable} ${fullWidth}`;
  }
}