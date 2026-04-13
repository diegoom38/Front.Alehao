import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './base-card.html'
})
export class BaseCard {
  @Input() hover = true;
  @Input() padding = true;
  @Input() borderColor: string = 'border-gray-200';
}